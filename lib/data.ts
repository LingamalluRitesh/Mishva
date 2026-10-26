import { Shipment, PickupRequest, CountryRate, SiteContent, CustomerUser } from './types';

export const COMPANY_INFO = {
  name: "Mishva International Courier Service",
  shortName: "Mishva Express",
  tagline: "Worldwide Express Parcel & Cargo Logistics",
  phone: "+91 7623909477",
  phoneRaw: "917623909477",
  email: "mishvainternationalcourier@gmail.com",
  address: "FF, Satyamev Arcade, Nr Satyamev Hospital, Chandkheda, Ahmedabad, Gujarat - 382424",
  googleMapsUrl: "https://maps.google.com/?q=Satyamev+Arcade+Chandkheda+Ahmedabad",
  workingHours: "Monday - Saturday: 9:30 AM - 8:30 PM | Sunday: 10:00 AM - 4:00 PM",
  whatsappNumber: "917623909477",
  whatsappDefaultMsg: "Hello Mishva International Courier, I would like to inquire about international courier booking / rate quotation.",
};

export const POPULAR_COUNTRIES: CountryRate[] = [
  {
    countryCode: "US",
    countryName: "United States (USA)",
    region: "North America",
    flag: "🇺🇸",
    baseRateFirst500g: 1650,
    perAdditional500g: 450,
    deliveryDaysExpress: "3-5 Business Days",
    deliveryDaysEconomy: "7-10 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
  {
    countryCode: "GB",
    countryName: "United Kingdom (UK)",
    region: "Europe",
    flag: "🇬🇧",
    baseRateFirst500g: 1450,
    perAdditional500g: 380,
    deliveryDaysExpress: "2-4 Business Days",
    deliveryDaysEconomy: "6-8 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
  {
    countryCode: "CA",
    countryName: "Canada",
    region: "North America",
    flag: "🇨🇦",
    baseRateFirst500g: 1750,
    perAdditional500g: 480,
    deliveryDaysExpress: "4-6 Business Days",
    deliveryDaysEconomy: "8-12 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
  {
    countryCode: "AE",
    countryName: "United Arab Emirates (Dubai / UAE)",
    region: "Middle East",
    flag: "🇦🇪",
    baseRateFirst500g: 950,
    perAdditional500g: 260,
    deliveryDaysExpress: "1-3 Business Days",
    deliveryDaysEconomy: "4-6 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
  {
    countryCode: "AU",
    countryName: "Australia",
    region: "Oceania",
    flag: "🇦🇺",
    baseRateFirst500g: 1850,
    perAdditional500g: 520,
    deliveryDaysExpress: "4-7 Business Days",
    deliveryDaysEconomy: "9-14 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
  {
    countryCode: "DE",
    countryName: "Germany",
    region: "Europe",
    flag: "🇩🇪",
    baseRateFirst500g: 1550,
    perAdditional500g: 420,
    deliveryDaysExpress: "3-5 Business Days",
    deliveryDaysEconomy: "7-9 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
  {
    countryCode: "SG",
    countryName: "Singapore",
    region: "Asia Pacific",
    flag: "🇸🇬",
    baseRateFirst500g: 1150,
    perAdditional500g: 310,
    deliveryDaysExpress: "2-4 Business Days",
    deliveryDaysEconomy: "5-7 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: false,
  },
  {
    countryCode: "NZ",
    countryName: "New Zealand",
    region: "Oceania",
    flag: "🇳🇿",
    baseRateFirst500g: 1950,
    perAdditional500g: 560,
    deliveryDaysExpress: "5-8 Business Days",
    deliveryDaysEconomy: "10-14 Business Days",
    foodCourierAllowed: true,
    medicineAllowed: true,
  },
];

export const DEFAULT_SITE_CONTENT: SiteContent = {
  company: {
    name: "Mishva International Courier Service",
    tagline: "Worldwide Express Parcel & Cargo Logistics",
    phone: "+91 7623909477",
    phoneRaw: "917623909477",
    email: "mishvainternationalcourier@gmail.com",
    address: "FF, Satyamev Arcade, Nr Satyamev Hospital, Chandkheda, Ahmedabad, Gujarat - 382424",
    whatsappNumber: "917623909477",
    workingHours: "Monday - Saturday: 9:30 AM - 8:30 PM | Sunday: 10:00 AM - 4:00 PM",
    noticeBarText: "✈️ International Express Delivery across 220+ Countries | Special NRI Food & Medicine Courier Services | 📞 Helpline: +91 7623909477",
    noticeBarEnabled: true,
  },
  hero: {
    badgeText: "Ahmedabad Hub • Daily Direct Flight Cargo Departures",
    headingMain: "Fastest Global Delivery from Gujarat to",
    headingHighlight: "220+ Countries",
    subheading: "Door-to-door express international courier specializing in NRI homemade food & snacks packets, urgent prescription medicines, university admissions documents, and commercial air cargo with real-time GPS tracking.",
    stat1: "220+ Countries",
    stat2: "50,000+ Delivered",
    stat3: "99.8% On-Time Arrival",
  },
  rates: POPULAR_COUNTRIES,
  services: [
    {
      id: "food",
      title: "NRI Homemade Food & Snacks Courier",
      badge: "Most Popular in Gujarat",
      description: "Specialized international delivery for homemade Gujarati snacks, Khakhra, Fafda, Sweets, Pickles, Thepla, and ground spices with commercial vacuum sealing.",
      features: [
        "Commercial multi-layer vacuum heat seal packing",
        "US FDA & UK customs compliant food clearances",
        "Special rates for 10kg, 15kg & 20kg festive family boxes",
        "Delivery to USA, UK, Canada, Australia, NZ, UAE"
      ]
    },
    {
      id: "express",
      title: "Worldwide Express Air Parcel",
      badge: "2-4 Day Delivery",
      description: "Lightning-fast door-to-door international express courier connecting Ahmedabad to over 220+ countries with Tier-1 airline space guarantees.",
      features: [
        "Guaranteed next-flight departure scheduling",
        "Real-time flight checkpoint GPS tracking",
        "Complete doorstep delivery with signature proof",
        "Partnership with DHL, FedEx, and UPS networks"
      ]
    },
    {
      id: "medicine",
      title: "Prescription Medicine Express",
      badge: "Doctor RX Support",
      description: "Safe and certified international shipping of vital medicines, Ayurvedic formulations, and chronic healthcare supplies with complete customs clearance assistance.",
      features: [
        "Assistance with doctor prescription verification",
        "Original pharmacy tax invoice certification",
        "Temperature-stable protective shockproof packaging",
        "Express clearance through international health customs"
      ]
    },
    {
      id: "student",
      title: "University & Student Express",
      badge: "Special Student Rates",
      description: "Priority courier services for international students sending academic transcripts, WES evaluations, I-20 documents, and excess study luggage.",
      features: [
        "Flat student discount rates for USA/UK/Canada",
        "Tamper-proof waterproof heavy security envelopes",
        "Special student luggage baggage allowance (up to 40kg)",
        "Delivery directly to University Admissions offices"
      ]
    },
    {
      id: "cargo",
      title: "Commercial Air Cargo & B2B Samples",
      badge: "Business Export",
      description: "Comprehensive commercial air freight for Gujarat exporters, textile merchants, brassware manufacturers, and chemical testing samples.",
      features: [
        "Commercial Invoice & Packing List generation",
        "IEC Code and GST export documentation aid",
        "Palletized cargo and heavy machinery parts transit",
        "Air Waybill (AWB) generation with priority customs gate"
      ]
    },
    {
      id: "excess",
      title: "Excess Baggage & Relocation Cargo",
      badge: "Heavy Cargo Saver",
      description: "Economical excess baggage and household relocation services for students, families, and professionals moving overseas without airline excess fees.",
      features: [
        "Saves up to 65% compared to airline excess baggage charges",
        "Free door-to-door collection from your residence",
        "Heavy-duty 7-ply cardboard cartons provided free",
        "Air cargo and ocean container options"
      ]
    }
  ]
};

export const INITIAL_SHIPMENTS: Shipment[] = [
  {
    awb: "MIC-892341-IN",
    senderName: "Bhavin Patel",
    senderPhone: "+91 98250 11422",
    senderCity: "Ahmedabad, Gujarat",
    senderAddress: "Satellite Road, Ahmedabad",
    receiverName: "Sneha Patel",
    receiverPhone: "+44 7700 900142",
    receiverCountry: "United Kingdom (UK)",
    receiverCity: "London",
    receiverAddress: "42 Wembley Park Drive, London HA9 8HP",
    serviceType: "Food & Snacks Express",
    category: "Homemade Gujarati Snacks (Khakhra, Fafda, Sweets)",
    weightKg: 8.5,
    chargeableWeightKg: 8.5,
    declaredValue: 7500,
    currency: "INR",
    bookingDate: "2026-10-21 11:30 AM",
    estimatedDelivery: "2026-10-25 04:00 PM",
    currentStatus: "Delivered",
    currentLocation: "Delivered at London Residence (Signed by S. Patel)",
    carrierPartner: "Mishva Express",
    flightNo: "AI-171 / BA-198",
    paymentStatus: "Paid",
    paymentAmount: 7600,
    paymentMethod: "UPI (Google Pay)",
    notes: "Fragile packaging with commercial vacuum seal",
    checkpoints: [
      {
        id: "cp-1",
        status: "Booked",
        location: "Chandkheda Office, Ahmedabad",
        timestamp: "2026-10-21 11:30 AM",
        description: "Shipment manifest generated and barcode labeled",
        completed: true
      },
      {
        id: "cp-2",
        status: "Picked Up",
        location: "Ahmedabad City Hub",
        timestamp: "2026-10-21 02:45 PM",
        description: "Package collected, weight and customs verified",
        completed: true
      },
      {
        id: "cp-3",
        status: "At Origin Hub",
        location: "Sardar Vallabhbhai Patel International Airport (AMD)",
        timestamp: "2026-10-21 09:15 PM",
        description: "Transferred to air cargo export consolidation terminal",
        completed: true
      },
      {
        id: "cp-4",
        status: "Customs Cleared (Origin)",
        location: "AMD Customs Air Cargo Complex",
        timestamp: "2026-10-22 03:30 AM",
        description: "Indian export customs clearance completed & security scan passed",
        completed: true
      },
      {
        id: "cp-5",
        status: "In Transit",
        location: "En route (Flight AI-171 AMD -> LHR)",
        timestamp: "2026-10-22 07:45 AM",
        description: "International flight departed on schedule",
        completed: true
      },
      {
        id: "cp-6",
        status: "Arrived at Destination Country",
        location: "London Heathrow Airport (LHR)",
        timestamp: "2026-10-23 04:20 PM GMT",
        description: "Arrived at UK international gateway",
        completed: true
      },
      {
        id: "cp-7",
        status: "Customs Cleared (Destination)",
        location: "HMRC Customs Gateway, Heathrow",
        timestamp: "2026-10-24 10:15 AM GMT",
        description: "UK import customs duty inspection cleared",
        completed: true
      },
      {
        id: "cp-8",
        status: "Out for Delivery",
        location: "Wembley Express Delivery Depot",
        timestamp: "2026-10-25 09:00 AM GMT",
        description: "Courier executive out for final doorstep delivery",
        completed: true
      },
      {
        id: "cp-9",
        status: "Delivered",
        location: "London, UK",
        timestamp: "2026-10-25 01:45 PM GMT",
        description: "Delivered to consignee directly. Signature: Sneha Patel",
        completed: true
      }
    ]
  },
  {
    awb: "MIC-772189-US",
    senderName: "Dr. Rajesh Shah",
    senderPhone: "+91 94260 88219",
    senderCity: "Gandhinagar, Gujarat",
    senderAddress: "Sector 7, Gandhinagar",
    receiverName: "Kunal Shah",
    receiverPhone: "+1 (917) 555-0198",
    receiverCountry: "United States (USA)",
    receiverCity: "Jersey City, NJ",
    receiverAddress: "78 Montgomery St, Apt 14B, Jersey City, NJ 07302",
    serviceType: "Medicine Express",
    category: "Prescription Medications & Doctor Note",
    weightKg: 2.2,
    chargeableWeightKg: 2.5,
    declaredValue: 4200,
    currency: "INR",
    bookingDate: "2026-10-23 03:00 PM",
    estimatedDelivery: "2026-10-27 05:00 PM",
    currentStatus: "In Transit",
    currentLocation: "Transit Hub - JFK International Airport, New York",
    carrierPartner: "DHL Network",
    flightNo: "EK-501 / EK-201",
    paymentStatus: "Paid",
    paymentAmount: 3450,
    paymentMethod: "Credit Card",
    notes: "US FDA Rx certificate enclosed with packing slip",
    checkpoints: [
      {
        id: "cp-1",
        status: "Booked",
        location: "Chandkheda Office, Ahmedabad",
        timestamp: "2026-10-23 03:00 PM",
        description: "Medical consignment booked with verified prescription",
        completed: true
      },
      {
        id: "cp-2",
        status: "Picked Up",
        location: "Gandhinagar Residence",
        timestamp: "2026-10-23 05:30 PM",
        description: "Picked up by Mishva logistics executive",
        completed: true
      },
      {
        id: "cp-3",
        status: "Customs Cleared (Origin)",
        location: "Mumbai Sahar Air Cargo Terminal (BOM)",
        timestamp: "2026-10-24 06:10 AM",
        description: "Origin medical documentation verified by customs",
        completed: true
      },
      {
        id: "cp-4",
        status: "In Transit",
        location: "JFK International Airport Cargo Terminal, NY",
        timestamp: "2026-10-25 04:30 AM EST",
        description: "International flight arrived at US entry port. Processing customs scan.",
        completed: true
      },
      {
        id: "cp-5",
        status: "Customs Cleared (Destination)",
        location: "US Customs & Border Protection (CBP) JFK",
        timestamp: "Pending",
        description: "Scheduled for US FDA import release",
        completed: false
      },
      {
        id: "cp-6",
        status: "Out for Delivery",
        location: "Jersey City Local Courier Facility",
        timestamp: "Expected Oct 27",
        description: "Final mile courier dispatch",
        completed: false
      },
      {
        id: "cp-7",
        status: "Delivered",
        location: "Jersey City, NJ",
        timestamp: "Expected Oct 27",
        description: "Scheduled doorstep delivery",
        completed: false
      }
    ]
  },
  {
    awb: "MIC-554201-AE",
    senderName: "Mehul Jani",
    senderPhone: "+91 97129 33011",
    senderCity: "Ahmedabad, Gujarat",
    senderAddress: "Navrangpura, Ahmedabad",
    receiverName: "Tariq Al-Mansoor",
    receiverPhone: "+971 50 123 4567",
    receiverCountry: "United Arab Emirates (Dubai / UAE)",
    receiverCity: "Dubai",
    receiverAddress: "Business Bay, Tower 3, Suite 1204, Dubai, UAE",
    serviceType: "Express International",
    category: "Commercial Textile Swatches & Catalogues",
    weightKg: 4.0,
    chargeableWeightKg: 4.0,
    declaredValue: 12000,
    currency: "INR",
    bookingDate: "2026-10-24 10:00 AM",
    estimatedDelivery: "2026-10-26 02:00 PM",
    currentStatus: "Customs Cleared (Destination)",
    currentLocation: "Dubai Cargo Village, DXB Airport",
    carrierPartner: "Aramex",
    flightNo: "6E-1453",
    paymentStatus: "Paid",
    paymentAmount: 2750,
    paymentMethod: "UPI (PhonePe)",
    notes: "Next-day business delivery request",
    checkpoints: [
      {
        id: "cp-1",
        status: "Booked",
        location: "Chandkheda Office, Ahmedabad",
        timestamp: "2026-10-24 10:00 AM",
        description: "Commercial sample parcel registered with commercial invoice",
        completed: true
      },
      {
        id: "cp-2",
        status: "In Transit",
        location: "Flight AMD -> DXB",
        timestamp: "2026-10-24 07:15 PM",
        description: "Air cargo flight in transit to Dubai International",
        completed: true
      },
      {
        id: "cp-3",
        status: "Customs Cleared (Destination)",
        location: "Dubai Customs Airport Terminal",
        timestamp: "2026-10-25 08:30 AM GST",
        description: "Commercial import clearance successful with zero hold",
        completed: true
      },
      {
        id: "cp-4",
        status: "Out for Delivery",
        location: "Business Bay Delivery Hub, Dubai",
        timestamp: "Scheduled for Today 12:30 PM GST",
        description: "Assigned to courier van for business delivery",
        completed: false
      },
      {
        id: "cp-5",
        status: "Delivered",
        location: "Dubai, UAE",
        timestamp: "Expected 2026-10-25 02:00 PM",
        description: "Delivery completion pending",
        completed: false
      }
    ]
  },
  {
    awb: "MIC-419203-CA",
    senderName: "Pooja Vora",
    senderPhone: "+91 99042 55199",
    senderCity: "Ahmedabad, Gujarat",
    senderAddress: "Chandkheda, Ahmedabad",
    receiverName: "Aryan Vora",
    receiverPhone: "+1 (647) 555-8321",
    receiverCountry: "Canada",
    receiverCity: "Toronto, ON",
    receiverAddress: "250 University Ave, Toronto, ON M5H 3E5",
    serviceType: "Student Document",
    category: "Original University Transcripts & Degree Certificate",
    weightKg: 0.5,
    chargeableWeightKg: 0.5,
    declaredValue: 2000,
    currency: "INR",
    bookingDate: "2026-10-22 04:30 PM",
    estimatedDelivery: "2026-10-26 11:00 AM",
    currentStatus: "Out for Delivery",
    currentLocation: "Toronto Downtown Sorting Centre",
    carrierPartner: "FedEx Global",
    flightNo: "AC-043",
    paymentStatus: "Paid",
    paymentAmount: 1750,
    paymentMethod: "Net Banking",
    notes: "Tamper-proof waterproof document sleeve",
    checkpoints: [
      {
        id: "cp-1",
        status: "Booked",
        location: "Chandkheda Office, Ahmedabad",
        timestamp: "2026-10-22 04:30 PM",
        description: "Urgent Student Document Enclosed",
        completed: true
      },
      {
        id: "cp-2",
        status: "Customs Cleared (Origin)",
        location: "AMD Airport Hub",
        timestamp: "2026-10-23 01:00 AM",
        description: "Export release authorized",
        completed: true
      },
      {
        id: "cp-3",
        status: "In Transit",
        location: "Pearson International Airport (YYZ), Toronto",
        timestamp: "2026-10-24 11:20 PM EST",
        description: "Cleared Canada CBSA border customs scan",
        completed: true
      },
      {
        id: "cp-4",
        status: "Out for Delivery",
        location: "Toronto Downtown Delivery Route #12",
        timestamp: "2026-10-25 08:15 AM EST",
        description: "Courier driver on way to consignee",
        completed: true
      },
      {
        id: "cp-5",
        status: "Delivered",
        location: "Toronto, ON",
        timestamp: "Pending",
        description: "Signature collection upon arrival",
        completed: false
      }
    ]
  }
];

export const INITIAL_PICKUPS: PickupRequest[] = [
  {
    id: "PKP-2026-101",
    customerName: "Gaurav Dave",
    phone: "+91 98980 44123",
    email: "gaurav.dave@gmail.com",
    pickupAddress: "B-402, Radhe Residency, Near Satyamev Arcade, Chandkheda",
    pickupCity: "Ahmedabad",
    pickupPincode: "382424",
    destinationCountry: "United States (USA)",
    serviceType: "Food & Snacks Express",
    packageCategory: "Khakhra, Sweets, and Spices (15 kg box)",
    estimatedWeightKg: 15.0,
    pickupDate: "2026-10-25",
    pickupTimeSlot: "11:00 AM - 01:00 PM",
    status: "Driver Assigned",
    assignedDriver: "Ramesh Bhai (Van GJ-01-XX-9477)",
    createdAt: "2026-10-25 09:15 AM",
    specialInstructions: "Please bring 5-ply export carton and vacuum sealing machine if possible."
  },
  {
    id: "PKP-2026-102",
    customerName: "Anjali Trivedi",
    phone: "+91 97240 66890",
    email: "anjali.t@yahoo.co.in",
    pickupAddress: "401, Shivalik Highstreet, Keshavbaug, Vastrapur",
    pickupCity: "Ahmedabad",
    pickupPincode: "380015",
    destinationCountry: "Australia",
    serviceType: "Student Document",
    packageCategory: "University Application Portfolio",
    estimatedWeightKg: 1.0,
    pickupDate: "2026-10-25",
    pickupTimeSlot: "02:00 PM - 04:00 PM",
    status: "Pending",
    createdAt: "2026-10-25 10:05 AM",
    specialInstructions: "Urgent shipment for University of Melbourne deadline."
  }
];

export const INITIAL_CUSTOMERS: CustomerUser[] = [
  {
    id: "CUST-001",
    name: "Bhavin Patel",
    email: "bhavin.patel@gmail.com",
    phone: "+91 98250 11422",
    address: "Satellite Road",
    city: "Ahmedabad",
    pincode: "380015",
  },
  {
    id: "CUST-002",
    name: "Dr. Rajesh Shah",
    email: "rajesh.shah@gmail.com",
    phone: "+91 94260 88219",
    address: "Sector 7",
    city: "Gandhinagar",
    pincode: "382007",
  }
];
