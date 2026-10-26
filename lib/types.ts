export type ShipmentStatus = 
  | 'Booked'
  | 'Picked Up'
  | 'At Origin Hub'
  | 'Customs Cleared (Origin)'
  | 'In Transit'
  | 'Arrived at Destination Country'
  | 'Customs Cleared (Destination)'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Exception / On Hold';

export interface TrackingCheckpoint {
  id: string;
  status: ShipmentStatus;
  location: string;
  timestamp: string;
  description: string;
  completed: boolean;
}

export interface Shipment {
  awb: string;
  senderName: string;
  senderPhone: string;
  senderCity: string;
  senderAddress: string;
  receiverName: string;
  receiverPhone: string;
  receiverCountry: string;
  receiverCity: string;
  receiverAddress: string;
  serviceType: string;
  category: string;
  weightKg: number;
  chargeableWeightKg: number;
  declaredValue: number;
  currency: string;
  bookingDate: string;
  estimatedDelivery: string;
  currentStatus: ShipmentStatus;
  currentLocation: string;
  carrierPartner: string;
  flightNo?: string;
  checkpoints: TrackingCheckpoint[];
  paymentStatus: 'Paid' | 'Pending' | 'COD / Pay on Pickup';
  paymentAmount: number;
  paymentMethod?: string;
  notes?: string;
}

export interface PickupRequest {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  pickupAddress: string;
  pickupCity: string;
  pickupPincode: string;
  destinationCountry: string;
  serviceType: string;
  packageCategory: string;
  estimatedWeightKg: number;
  pickupDate: string;
  pickupTimeSlot: string;
  status: 'Pending' | 'Driver Assigned' | 'Picked Up' | 'Cancelled';
  assignedDriver?: string;
  createdAt: string;
  specialInstructions?: string;
}

export interface CountryRate {
  countryCode: string;
  countryName: string;
  region: string;
  flag: string;
  baseRateFirst500g: number;
  perAdditional500g: number;
  deliveryDaysExpress: string;
  deliveryDaysEconomy: string;
  foodCourierAllowed: boolean;
  medicineAllowed: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  badge: string;
  description: string;
  features: string[];
}

export interface SiteContent {
  company: {
    name: string;
    tagline: string;
    phone: string;
    phoneRaw: string;
    email: string;
    address: string;
    whatsappNumber: string;
    workingHours: string;
    noticeBarText: string;
    noticeBarEnabled: boolean;
  };
  hero: {
    badgeText: string;
    headingMain: string;
    headingHighlight: string;
    subheading: string;
    stat1: string;
    stat2: string;
    stat3: string;
  };
  rates: CountryRate[];
  services: ServiceItem[];
}

export interface CustomerUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
}
