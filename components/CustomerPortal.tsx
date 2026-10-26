'use client';

import React, { useState } from 'react';
import { 
  User, 
  Package, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  RotateCcw, 
  Printer, 
  Share2, 
  Search,
  Phone,
  ShieldCheck,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Shipment } from '@/lib/types';
import { COMPANY_INFO } from '@/lib/data';

interface CustomerPortalProps {
  onRebook?: (shipment: Shipment) => void;
}

export default function CustomerPortal({ onRebook }: CustomerPortalProps) {
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98250 11422');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerShipments, setCustomerShipments] = useState<Shipment[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<Shipment | null>(null);

  const handleLookupOrders = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/shipments');
      const data = await res.json();
      if (data.success && data.shipments) {
        // Filter shipments matching the customer's phone or name or default to user shipments
        const filtered = data.shipments.filter(
          (s: Shipment) =>
            s.senderPhone.includes('98250') ||
            s.senderName.toLowerCase().includes('patel') ||
            phoneOrEmail.includes('98250') ||
            phoneOrEmail.toLowerCase().includes('patel')
        );
        setCustomerShipments(filtered.length > 0 ? filtered : data.shipments.slice(0, 3));
        setIsLoggedIn(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleRebook = (shipment: Shipment) => {
    if (onRebook) {
      onRebook(shipment);
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="customer-portal" className="w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-navy via-brand-deep to-brand-navy text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 mb-2">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Customer Self-Service Hub</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                My Previous Orders & Shipment History
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 mt-1">
                Lookup all your past international deliveries, download tax invoices, track active consignments, or re-order a doorstep pickup with 1 click.
              </p>
            </div>

            {isLoggedIn && (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="text-xs text-blue-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-xl transition-colors"
              >
                Sign Out / Switch Account
              </button>
            )}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8">
          {!isLoggedIn ? (
            /* Login / Lookup Form */
            <div className="max-w-md mx-auto py-6 space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-brand-blue flex items-center justify-center mx-auto shadow-sm">
                <User className="w-8 h-8 text-brand-navy" />
              </div>

              <div>
                <h4 className="text-lg font-extrabold text-brand-navy">Instant Order History Access</h4>
                <p className="text-xs text-slate-500 mt-1">
                  Enter your registered sender mobile number or email to view all your past shipments.
                </p>
              </div>

              <form onSubmit={handleLookupOrders} className="space-y-3">
                <div className="relative text-left">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Mobile Number / Email
                  </label>
                  <input
                    type="text"
                    required
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+91 98250 XXXXX"
                    className="w-full p-3.5 bg-white border-2 border-slate-300 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Demo account pre-filled: <strong>+91 98250 11422</strong> (Bhavin Patel)
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-brand-red hover:bg-brand-crimson text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/25 transition-all flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span>Looking up records...</span>
                  ) : (
                    <>
                      <span>View My Previous Orders</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            /* Logged in orders view */
            <div className="space-y-6 animate-in fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
                <div>
                  <h4 className="font-extrabold text-lg text-brand-navy">
                    Welcome back, Bhavin Patel! 👋
                  </h4>
                  <p className="text-xs text-slate-500">
                    Found {customerShipments.length} past international shipments linked to your phone (+91 98250 11422).
                  </p>
                </div>

                <a
                  href="#booking"
                  className="bg-brand-red hover:bg-brand-crimson text-white px-4 py-2 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                >
                  <Package className="w-3.5 h-3.5" />
                  <span>Book New Consignment</span>
                </a>
              </div>

              {/* Shipments List Cards */}
              <div className="space-y-4">
                {customerShipments.map((order) => (
                  <div
                    key={order.awb}
                    className="bg-slate-50 hover:bg-blue-50/40 border border-slate-200/90 rounded-2xl p-5 transition-all shadow-2xs space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-200">
                      <div className="flex items-center gap-3">
                        <span className="font-mono font-black text-sm text-brand-navy bg-white px-3 py-1 rounded-lg border border-slate-200">
                          {order.awb}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                            order.currentStatus === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-blue-100 text-blue-800 border-blue-300'
                          }`}
                        >
                          {order.currentStatus}
                        </span>
                        <span className="text-xs text-slate-500 hidden sm:inline">
                          Booked on: {order.bookingDate}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="text-sm font-black text-brand-navy">
                          ₹{order.paymentAmount.toLocaleString('en-IN')}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold block">
                          {order.paymentStatus} ({order.paymentMethod || 'Online'})
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 font-medium">Consignee (Receiver):</span>
                        <p className="font-bold text-slate-800 text-sm">{order.receiverName}</p>
                        <p className="text-slate-600">{order.receiverCity}, {order.receiverCountry}</p>
                        <p className="text-slate-500 text-[11px]">{order.receiverAddress}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-medium">Package Contents:</span>
                        <p className="font-semibold text-slate-800">{order.category}</p>
                        <p className="text-slate-600 text-[11px]">
                          Weight: <strong>{order.weightKg} KG</strong> • Partner: {order.carrierPartner}
                        </p>
                        <p className="text-slate-500 text-[11px]">
                          Est. Delivery: {order.estimatedDelivery}
                        </p>
                      </div>

                      <div className="flex flex-col justify-between sm:items-end gap-2 pt-2 sm:pt-0">
                        <a
                          href={`/#tracking`}
                          className="text-xs font-bold text-brand-blue hover:text-brand-navy flex items-center gap-1"
                        >
                          <span>Track Live Status</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </a>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReceipt(order)}
                            className="bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors"
                          >
                            <FileText className="w-3.5 h-3.5 text-slate-500" />
                            <span>Invoice</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => handleRebook(order)}
                            className="bg-brand-red hover:bg-brand-crimson text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs transition-colors"
                            title="Send another parcel to the same receiver"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Send Again</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Invoice Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full border border-slate-200 overflow-hidden flex flex-col">
            <div className="bg-brand-navy text-white p-4 flex items-center justify-between no-print">
              <span className="font-bold text-sm">Tax Invoice & Payment Receipt</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-brand-red text-white px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={() => setSelectedReceipt(null)}
                  className="text-white/80 hover:text-white p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 text-xs space-y-4">
              <div className="flex justify-between items-start border-b border-slate-200 pb-3">
                <div>
                  <h4 className="font-black text-base text-brand-navy">MISHVA INTERNATIONAL COURIER</h4>
                  <p className="text-[10px] text-slate-500">FF, Satyamev Arcade, Chandkheda, Ahmedabad - 382424</p>
                  <p className="text-[10px] text-slate-500">GSTIN: 24AAECM9477M1Z4</p>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-brand-navy">AWB: {selectedReceipt.awb}</span>
                  <p className="text-[10px] text-slate-500">Date: {selectedReceipt.bookingDate}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3 rounded-xl">
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">CONSIGNOR:</span>
                  <strong className="text-slate-800">{selectedReceipt.senderName}</strong>
                  <p className="text-slate-600">{selectedReceipt.senderAddress}</p>
                </div>
                <div>
                  <span className="text-slate-400 font-bold block text-[10px]">CONSIGNEE:</span>
                  <strong className="text-slate-800">{selectedReceipt.receiverName}</strong>
                  <p className="text-slate-600">{selectedReceipt.receiverCity}, {selectedReceipt.receiverCountry}</p>
                </div>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-100 font-bold text-[10px] text-slate-700">
                    <tr>
                      <th className="p-2">Description</th>
                      <th className="p-2">Weight</th>
                      <th className="p-2 text-right">Amount (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2">{selectedReceipt.serviceType} ({selectedReceipt.category})</td>
                      <td className="p-2">{selectedReceipt.weightKg} KG</td>
                      <td className="p-2 text-right font-mono">₹{selectedReceipt.paymentAmount}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-between items-center bg-emerald-50 p-3 rounded-xl border border-emerald-200 text-emerald-900 font-bold">
                <span>Total Amount Paid (Tax Incl.):</span>
                <span className="text-base font-black">₹{selectedReceipt.paymentAmount.toLocaleString('en-IN')}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
