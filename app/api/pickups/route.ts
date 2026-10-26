import { NextResponse } from 'next/server';
import { getPickupRequests, savePickupRequest } from '@/lib/db';
import { PickupRequest } from '@/lib/types';

export async function GET() {
  try {
    const pickups = await getPickupRequests();
    return NextResponse.json({ success: true, pickups });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch pickup requests' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newPickup: PickupRequest = {
      id: `PKP-${Date.now().toString().slice(-6)}`,
      customerName: body.customerName || 'Customer',
      phone: body.phone || '',
      email: body.email || '',
      pickupAddress: body.pickupAddress || '',
      pickupCity: body.pickupCity || 'Ahmedabad',
      pickupPincode: body.pickupPincode || '',
      destinationCountry: body.destinationCountry || '',
      serviceType: body.serviceType || 'Express International',
      packageCategory: body.packageCategory || 'General Parcel',
      estimatedWeightKg: Number(body.estimatedWeightKg) || 1.0,
      pickupDate: body.pickupDate || new Date().toISOString().split('T')[0],
      pickupTimeSlot: body.pickupTimeSlot || '10:00 AM - 01:00 PM',
      status: 'Pending',
      createdAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      specialInstructions: body.specialInstructions || '',
    };

    await savePickupRequest(newPickup);
    return NextResponse.json({ success: true, pickup: newPickup });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to create pickup request' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    if (!body.id) {
      return NextResponse.json({ success: false, error: 'Pickup ID is required' }, { status: 400 });
    }

    await savePickupRequest(body);
    return NextResponse.json({ success: true, pickup: body });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update pickup request' }, { status: 500 });
  }
}
