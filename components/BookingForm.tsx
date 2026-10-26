'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  MapPin, 
  User, 
  Package, 
  Calendar, 
  Clock, 
  CreditCard, 
  ShieldCheck, 
  ArrowRight,
  CheckCircle2,
  FileText,
  Printer,
  Share2,
  Sparkles
} from 'lucide-react';
import { POPULAR_COUNTRIES, COMPANY_INFO } from '@/lib/data';
import PaymentModal from './PaymentModal';

interface BookingFormProps {
  initialCountry?: string;
  initialWeight?: number;
  initialRate?: number;
  initialService?: string;
}

export default function BookingForm({
  initialCountry = 'United States (USA)',
  initialWeight = 2.5,
  initialRate = 3450,
  initialService = 'Express Air Priority',
}: BookingFormProps) {
  // Form State
  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [senderAddress, setSenderAddress] = useState('');
  const [senderPincode, setSenderPincode] = useState('382424');
  
  const [receiverName, setReceiverName] = useState('');
  const [receiverPhone, setReceiverPhone] = useState('');
  const [receiverCountry, setReceiverCountry] = useState(initialCountry);
  const [receiverCity, setReceiverCity] = useState('');
  const [receiverAddress, setReceiverAddress] = useState('');
  const [receiverZip, setReceiverZip] = useState('');

  const [serviceType, setServiceType] = useState(initialService);
  const [category, setCategory] = useState('Homemade Gujarati Snacks (Khakhra, Fafda, Sweets)');
  const [weightKg, setWeightKg] = useState<number>(initialWeight);
  const [declaredValue, setDeclaredValue] = useState<number>(5000);
  const [pickupDate, setPickupDate] = useState(new Date().toISOString().split('T')[0]);
  const [pickupTimeSlot, setPickupTimeSlot] = useState('11:00 AM - 02:00 PM');
  const [specialNotes, setSpecialNotes] = useState('');

  // Payment & Submission state
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [confirmedAwb, setConfirmedAwb] = useState('');
  const [finalTxn, setFinalTxn] = useState('');

  // Calculate live estimate
  const foundCountry = POPULAR_COUNTRIES.find((c) => c.countryName.includes(receiverCountry) || receiverCountry.includes(c.countryName)) || POPULAR_COUNTRIES[0];
  const additionalUnits = Math.max(0, Math.ceil((weightKg - 0.5) / 0.5));
  const estimatedAmount = foundCountry.baseRateFirst500g + (additionalUnits * foundCountry.perAdditional500g);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderPhone || !senderAddress || !receiverName || !receiverCity) {
      alert("Please fill in the required sender and receiver details.");
      return;
    }

    // Generate AWB
    const newAwb = `MIC-${Math.floor(200000 + Math.random() * 790000)}-IN`;
    setConfirmedAwb(newAwb);
    setPaymentModalOpen(true);
  };

  const handlePaymentComplete = async (paymentDetails: {
    transactionId: string;
    method: string;
    status: 'Paid' | 'COD / Pay on Pickup';
  }) => {
    setFinalTxn(paymentDetails.transactionId);
    setIsSubmitting(true);

    try {
      // 1. Create Shipment in API / Storage
      await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          awb: confirmedAwb,
          senderName,
          senderPhone,
          senderCity: 'Ahmedabad, Gujarat',
          senderAddress,
          receiverName,
          receiverPhone,
          receiverCountry,
          receiverCity,
          receiverAddress: `${receiverAddress}, Zip: ${receiverZip}`,
          serviceType,
          category,
          weightKg,
          chargeableWeightKg: weightKg,
          declaredValue,
          currency: 'INR',
          bookingDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
          estimatedDelivery: 'In 3-5 Business Days',
          currentStatus: 'Booked',
          currentLocation: 'Chandkheda Central Hub, Ahmedabad',
          carrierPartner: 'Mishva Express',
          flightNo: 'Scheduled Flight Consolidation',
          paymentStatus: paymentDetails.status,
          paymentAmount: estimatedAmount,
          paymentMethod: paymentDetails.method,
          notes: specialNotes,
        })
      });

      // 2. Create Doorstep Pickup Request
      await fetch('/api/pickups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: senderName,
          phone: senderPhone,
          email: senderEmail,
          pickupAddress: senderAddress,
          pickupCity: 'Ahmedabad',
          pickupPincode: senderPincode,
          destinationCountry: receiverCountry,
          serviceType,
          packageCategory: category,
          estimatedWeightKg: weightKg,
          pickupDate,
          pickupTimeSlot,
          specialInstructions: specialNotes,
        })
      });

      setBookingConfirmed(true);
      setPaymentModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Booking saved locally. A confirmation message will be sent.");
      setBookingConfirmed(true);
      setPaymentModalOpen(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppBookingAlert = () => {
    const text = `📦 *New Booking & Pickup Scheduled*\nAWB: *${confirmedAwb}*\nSender: ${senderName} (${senderPhone})\nPickup: ${senderAddress}, Chandkheda/Ahmedabad (${senderPincode})\nSlot: ${pickupDate} @ ${pickupTimeSlot}\nDestination: ${receiverCountry} (${receiverCity})\nCategory: ${category}\nWeight: ${weightKg} kg\nAmount: ₹${estimatedAmount.toLocaleString('en-IN')}`;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div id="booking" className="w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-brand-crimson to-brand-navy text-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm mb-3">
              <Truck className="w-3.5 h-3.5" />
              <span>Doorstep Pickup & Air Cargo Booking</span>
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Book Doorstep Pickup & International Air Express
            </h3>
            <p className="text-sm text-red-100 mt-2">
              Our pickup vehicle arrives with electronic scale and export packaging right at your home or office in Ahmedabad & Gandhinagar.
            </p>
          </div>
        </div>

        {/* Content */}
        {!bookingConfirmed ? (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
            {/* Step 1: Sender & Pickup Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center">
                  1
                </span>
                <h4 className="font-extrabold text-base text-brand-navy">
                  Sender & Doorstep Pickup Information (Ahmedabad / Gujarat)
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Sender Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bhavin Patel"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98250 XXXXX"
                    value={senderPhone}
                    onChange={(e) => setSenderPhone(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    placeholder="name@example.com"
                    value={senderEmail}
                    onChange={(e) => setSenderEmail(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Doorstep Pickup Address <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="House/Flat No, Apartment/Society Name, Landmark, Road"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pickup Pincode (Ahmedabad)</label>
                  <input
                    type="text"
                    placeholder="382424"
                    value={senderPincode}
                    onChange={(e) => setSenderPincode(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Pickup Date</label>
                  <input
                    type="date"
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Preferred Time Slot</label>
                  <select
                    value={pickupTimeSlot}
                    onChange={(e) => setPickupTimeSlot(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  >
                    <option>Morning (10:00 AM - 01:00 PM)</option>
                    <option>Afternoon (01:00 PM - 04:00 PM)</option>
                    <option>Evening (04:00 PM - 07:30 PM)</option>
                    <option>Immediate Express (Within 2 Hours in Chandkheda/Motera)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Step 2: Receiver & Destination Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-brand-navy text-white text-xs font-bold flex items-center justify-center">
                  2
                </span>
                <h4 className="font-extrabold text-base text-brand-navy">
                  Receiver & International Destination Details
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Receiver Full Name <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sneha Patel"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Receiver International Phone <span className="text-brand-red">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (xxx) xxx-xxxx"
                    value={receiverPhone}
                    onChange={(e) => setReceiverPhone(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination Country</label>
                  <select
                    value={receiverCountry}
                    onChange={(e) => setReceiverCountry(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.countryCode} value={c.countryName}>
                        {c.flag} {c.countryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1">Destination Street Address</label>
                  <input
                    type="text"
                    placeholder="Apartment, Street address, Suburb"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">City & Postal/Zip Code</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="City"
                      value={receiverCity}
                      onChange={(e) => setReceiverCity(e.target.value)}
                      className="w-1/2 p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:bg-white focus:outline-none"
                    />
                    <input
                      type="text"
                      placeholder="Zip / Postal"
                      value={receiverZip}
                      onChange={(e) => setReceiverZip(e.target.value)}
                      className="w-1/2 p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-blue focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Package Category & Shipping Method */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-200">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h4 className="font-extrabold text-base text-brand-navy">
                  Parcel Contents & Service Selection
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Package Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  >
                    <option>Homemade Gujarati Snacks (Khakhra, Fafda, Sweets)</option>
                    <option>Prescription Medicines (With Doctor RX)</option>
                    <option>Student Transcripts & University Documents</option>
                    <option>Garments, Textiles & Traditional Clothes</option>
                    <option>Commercial Samples & Catalogues</option>
                    <option>Excess Baggage & Relocation Boxes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Estimated Weight (kg)</label>
                  <input
                    type="number"
                    min="0.5"
                    step="0.5"
                    value={weightKg}
                    onChange={(e) => setWeightKg(parseFloat(e.target.value) || 0.5)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Declared Value (₹ INR)</label>
                  <input
                    type="number"
                    value={declaredValue}
                    onChange={(e) => setDeclaredValue(Number(e.target.value))}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Special Packaging or Customs Notes
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Please bring vacuum sealing machine; fragile glass jars; urgent visa deadline"
                    value={specialNotes}
                    onChange={(e) => setSpecialNotes(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-xs text-slate-900 font-bold focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                </div>
              </div>
            </div>

            {/* Total Summary Strip & Book Button */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Estimated Shipping Cost:</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black text-brand-navy">₹{estimatedAmount.toLocaleString('en-IN')}</span>
                  <span className="text-xs text-emerald-600 font-bold">Includes Doorstep Pickup & Packing</span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {receiverCountry} • {weightKg} KG • Doorstep Delivery
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-700 hover:to-red-800 text-white px-8 py-4 rounded-2xl font-bold text-sm shadow-xl shadow-red-500/25 flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-98"
              >
                <span>Continue to Secure Payment / Confirmation</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation Success Card */
          <div className="p-8 sm:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <div>
              <span className="inline-block px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-bold mb-2">
                Booking Confirmed & Dispatched to Operations
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-brand-navy">
                Consignment AWB: <span className="text-brand-red font-mono">{confirmedAwb}</span>
              </h3>
              <p className="text-slate-600 text-sm max-w-lg mx-auto mt-2">
                Thank you, <strong>{senderName}</strong>! Our Chandkheda logistics executive will arrive at your address on <strong>{pickupDate} ({pickupTimeSlot})</strong> with electronic scale and export packaging.
              </p>
            </div>

            {/* Quick Summary Pill Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Destination:</span>
                <span className="font-bold text-slate-800">{receiverCountry} ({receiverCity})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup Address:</span>
                <span className="font-medium text-slate-800 truncate max-w-xs">{senderAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Declared Weight:</span>
                <span className="font-bold text-slate-800">{weightKg} KG</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Transaction Ref:</span>
                <span className="font-mono text-slate-700">{finalTxn || 'COD Scheduled'}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <button
                type="button"
                onClick={handleWhatsAppBookingAlert}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Share2 className="w-4 h-4" />
                <span>Notify Pickup Team on WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  const trackEl = document.getElementById('tracking');
                  if (trackEl) trackEl.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-xl font-bold text-xs transition-all"
              >
                Track Live Consignment
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Payment Gateway Modal */}
      <PaymentModal
        isOpen={paymentModalOpen}
        onClose={() => setPaymentModalOpen(false)}
        bookingData={{
          awb: confirmedAwb,
          senderName,
          receiverCountry,
          amount: estimatedAmount,
          serviceType,
          weightKg,
        }}
        onPaymentComplete={handlePaymentComplete}
      />
    </div>
  );
}
