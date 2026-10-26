import { NextResponse } from 'next/server';
import { getShipments, saveShipment } from '@/lib/db';
import { Shipment } from '@/lib/types';

export async function GET() {
  try {
    const shipments = await getShipments();
    return NextResponse.json({ success: true, shipments });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch shipments' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Auto-generate AWB if not provided
    const awb = body.awb || `MIC-${Math.floor(100000 + Math.random() * 900000)}-IN`;
    
    const newShipment: Shipment = {
      awb,
      senderName: body.senderName || '',
      senderPhone: body.senderPhone || '',
      senderCity: body.senderCity || 'Ahmedabad, Gujarat',
      senderAddress: body.senderAddress || '',
      receiverName: body.receiverName || '',
      receiverPhone: body.receiverPhone || '',
      receiverCountry: body.receiverCountry || '',
      receiverCity: body.receiverCity || '',
      receiverAddress: body.receiverAddress || '',
      serviceType: body.serviceType || 'Express International',
      category: body.category || 'General Parcel',
      weightKg: Number(body.weightKg) || 1.0,
      chargeableWeightKg: Number(body.chargeableWeightKg) || Number(body.weightKg) || 1.0,
      declaredValue: Number(body.declaredValue) || 1000,
      currency: body.currency || 'INR',
      bookingDate: body.bookingDate || new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      estimatedDelivery: body.estimatedDelivery || 'In 4-6 Business Days',
      currentStatus: body.currentStatus || 'Booked',
      currentLocation: body.currentLocation || 'Chandkheda Operations Hub, Ahmedabad',
      carrierPartner: body.carrierPartner || 'Mishva Express',
      flightNo: body.flightNo || 'Pending Scheduling',
      paymentStatus: body.paymentStatus || 'Pending',
      paymentAmount: Number(body.paymentAmount) || 0,
      paymentMethod: body.paymentMethod || 'Pay on Pickup',
      notes: body.notes || '',
      checkpoints: body.checkpoints || [
        {
          id: `cp-${Date.now()}`,
          status: 'Booked',
          location: 'Chandkheda Central Hub, Ahmedabad',
          timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          description: 'Shipment manifest registered and AWB label printed',
          completed: true,
        }
      ]
    };

    await saveShipment(newShipment);
    return NextResponse.json({ success: true, shipment: newShipment });
  } catch (error) {
    console.error('Error creating shipment:', error);
    return NextResponse.json({ success: false, error: 'Failed to create shipment' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.awb) {
      return NextResponse.json({ success: false, error: 'AWB is required' }, { status: 400 });
    }

    await saveShipment(body);
    return NextResponse.json({ success: true, shipment: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update shipment' }, { status: 500 });
  }
}
