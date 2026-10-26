'use client';

import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Package, 
  Truck, 
  Plane, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ArrowRight, 
  AlertCircle,
  Share2,
  Printer,
  Calendar,
  User,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Shipment } from '@/lib/types';
import { INITIAL_SHIPMENTS, COMPANY_INFO } from '@/lib/data';

interface TrackingWidgetProps {
  initialAwb?: string;
}

export default function TrackingWidget({ initialAwb = '' }: TrackingWidgetProps) {
  const [awbInput, setAwbInput] = useState(initialAwb);
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState<Shipment | null>(null);
  const [error, setError] = useState<string | null>(null);

  const SAMPLE_AWBS = [
    { code: "MIC-892341-IN", destination: "London, UK", status: "Delivered", tag: "Food & Sweets" },
    { code: "MIC-772189-US", destination: "New York, USA", status: "In Transit", tag: "Medicines" },
    { code: "MIC-554201-AE", destination: "Dubai, UAE", status: "Customs Cleared", tag: "Textiles" },
    { code: "MIC-419203-CA", destination: "Toronto, Canada", status: "Out for Delivery", tag: "University" },
  ];

  const handleTrack = async (targetAwb?: string) => {
    const rawQuery = (targetAwb || awbInput).trim().toUpperCase();
    if (!rawQuery) {
      setError("Please enter your Air Waybill (AWB) or Consignment Number.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/track/${encodeURIComponent(rawQuery)}`);
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.shipment) {
          setShipment(data.shipment);
          setAwbInput(data.shipment.awb);
          setLoading(false);
          return;
        }
      }

      // Instant in-memory fallback
      const fallback = INITIAL_SHIPMENTS.find(
        (s) => s.awb.toUpperCase() === rawQuery || s.awb.toUpperCase().includes(rawQuery)
      );

      if (fallback) {
        setShipment(fallback);
        setAwbInput(fallback.awb);
      } else {
        setShipment(null);
        setError(`No active consignment found for "${rawQuery}". Please check your tracking number.`);
      }
    } catch (err) {
      const fallback = INITIAL_SHIPMENTS.find(
        (s) => s.awb.toUpperCase() === rawQuery || s.awb.toUpperCase().includes(rawQuery)
      );
      if (fallback) {
        setShipment(fallback);
        setAwbInput(fallback.awb);
      } else {
        setError(`No active consignment found for "${rawQuery}". Please check your tracking number.`);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialAwb) {
      handleTrack(initialAwb);
    }
  }, [initialAwb]);

  const handleWhatsAppShare = () => {
    if (!shipment) return;
    const msg = `📦 *Mishva International Courier Update*\nAWB: *${shipment.awb}*\nStatus: *${shipment.currentStatus}*\nLocation: ${shipment.currentLocation}\nDestination: ${shipment.receiverCountry}\nEstimated Delivery: ${shipment.estimatedDelivery}\n\nTrack online at: ${typeof window !== 'undefined' ? window.location.origin : ''}/#tracking`;
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div id="tracking" className="w-full">
      {/* Human-Designed Glass Tracking Panel */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 transition-all">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#DC2626] flex items-center justify-center text-white shadow-md">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Track Your Consignment
              </h3>
              <p className="text-xs text-slate-300">
                Live flight checkpoint & customs status
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Live GPS Telemetry
          </span>
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={(e) => { e.preventDefault(); handleTrack(); }}
          className="flex flex-col sm:flex-row items-stretch gap-2"
        >
          <div className="relative flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Enter AWB (e.g. MIC-892341-IN)"
              value={awbInput}
              onChange={(e) => {
                setAwbInput(e.target.value.toUpperCase());
                if (error) setError(null);
              }}
              className="w-full pl-12 pr-4 py-3.5 rounded-xl glass-input text-white font-mono text-sm uppercase tracking-wider font-semibold placeholder:font-sans placeholder:normal-case placeholder:font-normal placeholder:text-slate-400 transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary text-white px-7 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {loading ? (
              <span>Tracking...</span>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Track</span>
              </>
            )}
          </button>
        </form>

        {/* Human-crafted Demo Chips */}
        <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Sample AWBs:</span>
          {SAMPLE_AWBS.map((sample) => (
            <button
              key={sample.code}
              type="button"
              onClick={() => {
                setAwbInput(sample.code);
                handleTrack(sample.code);
              }}
              className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-[11px] font-mono cursor-pointer"
            >
              <span>{sample.code}</span>
              <span className="font-sans text-[10px] text-amber-300">({sample.destination})</span>
            </button>
          ))}
        </div>

        {/* Error Notification */}
        {error && (
          <div className="mt-4 p-3.5 rounded-xl bg-red-950/70 border border-red-500/40 text-red-200 text-xs flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-medium">{error}</p>
            </div>
          </div>
        )}
      </div>

      {/* Shipment Results Modal / Card */}
      {shipment && (
        <div className="mt-6 glass-panel rounded-3xl overflow-hidden shadow-2xl border border-white/15 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* Header Summary */}
          <div className="p-6 bg-gradient-to-r from-slate-900 to-[#0A1E3F] border-b border-white/10 text-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2.5 flex-wrap">
                  <span className="font-mono text-2xl font-black text-amber-300">
                    {shipment.awb}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {shipment.currentStatus}
                  </span>
                  <span className="text-xs text-slate-300 bg-white/10 px-2 py-0.5 rounded-md">
                    Carrier: {shipment.carrierPartner}
                  </span>
                </div>
                <p className="text-xs text-slate-300 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-red-400 shrink-0" />
                  <span>Current Hub: <strong className="text-white">{shipment.currentLocation}</strong></span>
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWhatsAppShare}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share Status</span>
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn-secondary text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </div>

            {/* Route Strip */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10 text-xs">
              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-mono">ORIGIN</span>
                <p className="font-bold text-white text-sm">{shipment.senderCity}</p>
                <p className="text-slate-400 text-[11px] truncate">{shipment.senderName}</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10 flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-1 text-xs text-blue-300">
                  <Plane className="w-3.5 h-3.5 text-amber-300" />
                  <span>{shipment.flightNo || 'Daily Express'}</span>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-amber-400 to-emerald-400 h-full rounded-full" 
                    style={{ 
                      width: shipment.currentStatus === 'Delivered' ? '100%' : 
                             shipment.currentStatus === 'Out for Delivery' ? '85%' :
                             shipment.currentStatus.includes('Customs') ? '65%' : '45%' 
                    }}
                  ></div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1">Est. Arrival: {shipment.estimatedDelivery}</p>
              </div>

              <div className="bg-slate-900/80 p-3 rounded-xl border border-white/10">
                <span className="text-[10px] text-slate-400 uppercase font-mono">DESTINATION</span>
                <p className="font-bold text-white text-sm">{shipment.receiverCountry}</p>
                <p className="text-slate-400 text-[11px] truncate">{shipment.receiverCity} • {shipment.receiverName}</p>
              </div>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-6">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-300 mb-4 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-red-500" />
              Consignment Tracking History ({shipment.checkpoints.length} Checkpoints)
            </h4>

            <div className="relative pl-6 space-y-4 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              {shipment.checkpoints.map((cp, idx) => (
                <div key={cp.id || idx} className="relative">
                  <div 
                    className={`absolute -left-6 top-1 w-5 h-5 rounded-full flex items-center justify-center border-2 ${
                      cp.completed 
                        ? 'bg-emerald-500 border-white text-white' 
                        : 'bg-slate-900 border-slate-700 text-slate-500'
                    }`}
                  >
                    {cp.completed ? (
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>
                    )}
                  </div>

                  <div className="bg-slate-900/80 p-3.5 rounded-xl border border-white/10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                      <span className="font-bold text-xs text-white">
                        {cp.status}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {cp.timestamp}
                      </span>
                    </div>

                    <div className="mt-1 flex items-center gap-1 text-[11px] text-blue-300 font-medium">
                      <MapPin className="w-3 h-3 text-red-400 shrink-0" />
                      <span>{cp.location}</span>
                    </div>

                    <p className="mt-1 text-[11px] text-slate-400">
                      {cp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
