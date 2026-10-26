'use client';

import React, { useState } from 'react';
import { 
  X, 
  CreditCard, 
  QrCode, 
  CheckCircle2, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Building2, 
  Truck,
  ArrowRight,
  Share2,
  Printer
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { COMPANY_INFO } from '@/lib/data';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    awb: string;
    senderName: string;
    receiverCountry: string;
    amount: number;
    serviceType: string;
    weightKg: number;
  };
  onPaymentComplete: (paymentDetails: {
    transactionId: string;
    method: string;
    status: 'Paid' | 'COD / Pay on Pickup';
  }) => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  bookingData,
  onPaymentComplete,
}: PaymentModalProps) {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'pickup'>('upi');
  const [upiId, setUpiId] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnId, setTxnId] = useState('');

  if (!isOpen) return null;

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback
    }
  };

  const handleFillTestCard = () => {
    setCardNumber('4532 •••• •••• 8821');
    setCardExpiry('08/29');
    setCardCvv('782');
    setCardName(bookingData.senderName || 'Bhavin Patel');
  };

  const handleProcessPayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const generatedTxn = `TXN-MIC-${Date.now().toString().slice(-8)}`;
      setTxnId(generatedTxn);
      setIsProcessing(false);
      setIsSuccess(true);
      triggerConfetti();

      onPaymentComplete({
        transactionId: generatedTxn,
        method: paymentMethod === 'upi' ? 'UPI / QR Code' : 
                paymentMethod === 'card' ? 'Credit/Debit Card' :
                paymentMethod === 'netbanking' ? `Net Banking (${selectedBank})` : 'Pay on Doorstep Pickup',
        status: paymentMethod === 'pickup' ? 'COD / Pay on Pickup' : 'Paid',
      });
    }, 1800);
  };

  const handleWhatsAppShare = () => {
    const msg = `🧾 *Mishva International Courier - Payment & Booking Confirmed*\nAWB: *${bookingData.awb}*\nTxn ID: *${txnId}*\nAmount Paid: ₹${bookingData.amount.toLocaleString('en-IN')}\nDestination: ${bookingData.receiverCountry}\nService: ${bookingData.serviceType}\n\nTrack your shipment live at: ${window.location.origin}/#tracking`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden relative max-h-[92vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-deep to-brand-navy text-white p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <Lock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg">Mishva Secure Payment Gateway</h3>
              <p className="text-xs text-blue-200 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> 256-Bit SSL Encrypted & RBI / PCI-DSS Compliant
              </p>
            </div>
          </div>
          {!isProcessing && (
            <button
              onClick={onClose}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Order Summary Strip */}
        <div className="bg-blue-50/80 px-6 py-3 border-b border-blue-100 flex items-center justify-between text-xs">
          <div>
            <span className="text-slate-500">AWB Reference: </span>
            <strong className="font-mono text-brand-navy">{bookingData.awb}</strong>
            <span className="text-slate-400 mx-2">|</span>
            <span className="text-slate-600">{bookingData.receiverCountry} ({bookingData.weightKg} kg)</span>
          </div>
          <div className="text-right">
            <span className="text-slate-500">Total Payable: </span>
            <strong className="text-base font-black text-brand-navy">₹{bookingData.amount.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 overflow-y-auto flex-1">
          {!isSuccess ? (
            <div className="space-y-5">
              {/* Payment Method Selector */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'upi', label: 'UPI / QR', icon: QrCode, badge: 'Instant' },
                  { id: 'card', label: 'Card', icon: CreditCard, badge: 'All Cards' },
                  { id: 'netbanking', label: 'NetBanking', icon: Building2, badge: '50+ Banks' },
                  { id: 'pickup', label: 'Pay at Pickup', icon: Truck, badge: 'Ahmedabad' },
                ].map((m) => {
                  const Icon = m.icon;
                  return (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => setPaymentMethod(m.id as any)}
                      className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1 relative ${
                        paymentMethod === m.id
                          ? 'border-brand-red bg-red-50/60 ring-2 ring-brand-red/20 shadow-xs'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${paymentMethod === m.id ? 'text-brand-red' : 'text-slate-500'}`} />
                      <span className="font-bold text-xs">{m.label}</span>
                      <span className="text-[9px] text-slate-500 font-medium">{m.badge}</span>
                    </button>
                  );
                })}
              </div>

              {/* View 1: UPI / QR Code */}
              {paymentMethod === 'upi' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center space-y-4 animate-in fade-in">
                  <div className="flex flex-col items-center">
                    {/* Simulated Dynamic QR Code */}
                    <div className="p-3 bg-white rounded-2xl shadow-md border border-slate-200 inline-block">
                      <div className="w-44 h-44 bg-slate-900 rounded-xl p-2 relative flex flex-col items-center justify-center text-white">
                        {/* QR pattern visual simulation */}
                        <div className="w-full h-full border-4 border-dashed border-white/60 rounded-lg flex flex-col items-center justify-center p-2 text-center">
                          <QrCode className="w-16 h-16 text-white mb-1" />
                          <span className="text-[10px] font-mono tracking-widest uppercase">SCAN TO PAY</span>
                          <span className="text-[11px] font-black text-amber-300">₹{bookingData.amount.toLocaleString('en-IN')}</span>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                          <span className="bg-brand-red text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                            MISHVA
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-xs font-semibold text-slate-700 mt-2">
                      Scan using Google Pay, PhonePe, Paytm, BHIM, or any Banking App
                    </p>
                    <p className="text-[11px] font-mono text-slate-500">
                      VPA: mishvainternationalcourier@okhdfcbank
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Or enter your UPI ID (e.g. yourname@okhdfcbank)"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="flex-1 p-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:outline-none focus:ring-1 focus:ring-brand-blue"
                    />
                    <button
                      type="button"
                      onClick={() => setUpiId('customer@okaxis')}
                      className="text-[10px] text-brand-blue hover:underline whitespace-nowrap"
                    >
                      Demo ID
                    </button>
                  </div>
                </div>
              )}

              {/* View 2: Credit / Debit Card */}
              {paymentMethod === 'card' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase text-slate-600">Card Credentials</span>
                    <button
                      type="button"
                      onClick={handleFillTestCard}
                      className="text-xs font-bold text-brand-blue hover:text-brand-navy underline"
                    >
                      Fill Demo Test Card
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Card Number</label>
                      <input
                        type="text"
                        placeholder="4532 •••• •••• 8821"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold focus:ring-1 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:ring-1 focus:ring-brand-blue focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-semibold text-slate-600 mb-1">CVV / CVC</label>
                        <input
                          type="password"
                          maxLength={4}
                          placeholder="•••"
                          value={cardCvv}
                          onChange={(e) => setCardCvv(e.target.value)}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono focus:ring-1 focus:ring-brand-blue focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">Cardholder Name</label>
                      <input
                        type="text"
                        placeholder="Name on card"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs focus:ring-1 focus:ring-brand-blue focus:outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* View 3: Net Banking */}
              {paymentMethod === 'netbanking' && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-3 animate-in fade-in">
                  <p className="text-xs font-bold text-slate-700">Select Your Bank:</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {['HDFC Bank', 'ICICI Bank', 'State Bank of India (SBI)', 'Axis Bank', 'Kotak Mahindra', 'Bank of Baroda'].map((bank) => (
                      <button
                        key={bank}
                        type="button"
                        onClick={() => setSelectedBank(bank)}
                        className={`p-3 rounded-xl border text-left font-semibold transition-all ${
                          selectedBank === bank
                            ? 'bg-blue-50 border-brand-blue text-brand-navy ring-1 ring-brand-blue'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {bank}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* View 4: Pay on Pickup */}
              {paymentMethod === 'pickup' && (
                <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-5 space-y-2 text-xs text-amber-900 animate-in fade-in">
                  <h4 className="font-bold text-sm text-amber-950 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-600" />
                    Pay Upon Doorstep Pickup in Ahmedabad
                  </h4>
                  <p className="text-slate-700">
                    You can pay the full amount of <strong>₹{bookingData.amount.toLocaleString('en-IN')}</strong> directly to our field logistics executive via UPI QR code scan or Cash when they arrive at your address to weigh and pack your consignment.
                  </p>
                  <div className="p-2.5 bg-white rounded-xl border border-amber-200/80 text-[11px] text-slate-600">
                    📍 Applicable for all pickups across Ahmedabad, Gandhinagar, Chandkheda, Motera, Sabarmati, and surrounding zones.
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleProcessPayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-700 hover:to-red-800 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 transition-all transform active:scale-98 disabled:opacity-70"
              >
                {isProcessing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Authorizing & Contacting Gateway...</span>
                  </>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>
                      {paymentMethod === 'pickup'
                        ? 'Confirm Doorstep Pickup Order'
                        : `Pay ₹${bookingData.amount.toLocaleString('en-IN')} Securely`}
                    </span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          ) : (
            /* Success Screen */
            <div className="text-center py-6 space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h4 className="text-xl font-extrabold text-brand-navy">
                  {paymentMethod === 'pickup' ? 'Booking Confirmed!' : 'Payment & Booking Successful!'}
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Air Waybill generation complete. Our Ahmedabad operations hub has received your request.
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-left text-xs space-y-2 max-w-sm mx-auto">
                <div className="flex justify-between">
                  <span className="text-slate-500">Air Waybill (AWB):</span>
                  <span className="font-mono font-bold text-brand-navy">{bookingData.awb}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Transaction ID:</span>
                  <span className="font-mono font-bold text-slate-700">{txnId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Amount:</span>
                  <span className="font-bold text-emerald-700">₹{bookingData.amount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Mode:</span>
                  <span className="font-semibold text-slate-700">
                    {paymentMethod === 'pickup' ? 'Cash/UPI on Pickup' : 'Online Authorized'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-700">{bookingData.receiverCountry}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2 max-w-sm mx-auto">
                <button
                  type="button"
                  onClick={handleWhatsAppShare}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Send Receipt to WhatsApp</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white py-2.5 rounded-xl font-bold text-xs transition-all"
                >
                  Track Consignment
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
