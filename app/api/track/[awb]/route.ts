import { NextResponse } from 'next/server';
import { getShipmentByAwb } from '@/lib/db';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ awb: string }> }
) {
  try {
    const { awb } = await params;
    if (!awb) {
      return NextResponse.json({ success: false, error: 'AWB number is required' }, { status: 400 });
    }

    const shipment = await getShipmentByAwb(awb);
    if (!shipment) {
      return NextResponse.json({ 
        success: false, 
        error: `No shipment found for Air Waybill number "${awb}". Please check your tracking number and try again.` 
      }, { status: 404 });
    }

    return NextResponse.json({ success: true, shipment });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to look up shipment' }, { status: 500 });
  }
}
