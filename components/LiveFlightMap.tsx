'use client';

import React, { useState } from 'react';
import { 
  Plane, 
  Navigation, 
  Clock, 
  MapPin, 
  ShieldCheck, 
  Wind, 
  Compass, 
  Activity,
  ArrowRight,
  Radio,
  Sparkles
} from 'lucide-react';

export default function LiveFlightMap() {
  const corridors = [
    {
      id: 'uk',
      flightNumber: 'AI-171 / BA-198',
      route: 'Ahmedabad (AMD) → London Heathrow (LHR)',
      aircraft: 'Boeing 777-300ER Freighter',
      status: 'In Flight (Cruising)',
      altitude: '36,500 FT',
      groundSpeed: '895 KM/H',
      remainingTime: '2h 15m remaining',
      progressPercent: 78,
      originCity: 'Ahmedabad, India',
      destinationCity: 'London, UK',
      tempDest: '14°C, Clear',
      cargoConsignments: '142 Parcels Onboard',
      awbExample: 'MIC-892341-IN',
    },
    {
      id: 'us',
      flightNumber: 'EK-501 / EK-201',
      route: 'Ahmedabad (AMD) → New York (JFK)',
      aircraft: 'Boeing 777F Air Cargo',
      status: 'Customs Gate Processing',
      altitude: '38,000 FT',
      groundSpeed: '915 KM/H',
      remainingTime: 'Processing JFK Hub',
      progressPercent: 88,
      originCity: 'Ahmedabad, India',
      destinationCity: 'New York, USA',
      tempDest: '17°C, Light Wind',
      cargoConsignments: '210 Parcels Onboard',
      awbExample: 'MIC-772189-US',
    },
    {
      id: 'uae',
      flightNumber: '6E-1453 Express',
      route: 'Ahmedabad (AMD) → Dubai (DXB)',
      aircraft: 'Airbus A321F Cargo',
      status: 'Landed & Export Cleared',
      altitude: '0 FT (Touchdown)',
      groundSpeed: '0 KM/H',
      remainingTime: 'Out for Delivery DXB',
      progressPercent: 100,
      originCity: 'Ahmedabad, India',
      destinationCity: 'Dubai, UAE',
      tempDest: '31°C, Sunny',
      cargoConsignments: '95 Parcels Onboard',
      awbExample: 'MIC-554201-AE',
    },
    {
      id: 'ca',
      flightNumber: 'AC-043 Priority',
      route: 'Ahmedabad (AMD) → Toronto Pearson (YYZ)',
      aircraft: 'Boeing 787-9 Dreamliner',
      status: 'Border Security Inspection',
      altitude: '35,000 FT',
      groundSpeed: '880 KM/H',
      remainingTime: 'Delivery Depot',
      progressPercent: 92,
      originCity: 'Ahmedabad, India',
      destinationCity: 'Toronto, Canada',
      tempDest: '9°C, Overcast',
      cargoConsignments: '168 Parcels Onboard',
      awbExample: 'MIC-419203-CA',
    },
  ];

  const [activeFlight, setActiveFlight] = useState(corridors[0]);

  return (
    <section className="py-16 sm:py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-15 pointer-events-none" 
        style={{ 
          backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)', 
          backgroundSize: '32px 32px' 
        }}
      ></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/10 text-blue-400 border border-blue-500/30 mb-2">
              <Radio className="w-3.5 h-3.5 text-red-500 animate-pulse" />
              <span>LIVE IATA AIR CARGO RADAR • SVPI AIRPORT (AMD)</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              Real-Time Global Flight Telemetry & Air Routes
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Track active cargo flights carrying Mishva International Courier consignments from Ahmedabad to major global transit hubs in real time.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs bg-slate-900 border border-slate-800 p-2 rounded-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="font-mono text-emerald-400 font-bold">4 CARGO FLIGHTS AIRBORNE</span>
          </div>
        </div>

        {/* Radar & Visualizer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Flight Selector List */}
          <div className="lg:col-span-5 space-y-3">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Active International Corridors:
            </p>

            {corridors.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveFlight(c)}
                className={`w-full p-4 rounded-2xl border text-left transition-all flex flex-col justify-between gap-2 ${
                  activeFlight.id === c.id
                    ? 'bg-blue-950/70 border-blue-500 ring-2 ring-blue-500/30 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900 text-slate-300'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="font-mono font-bold text-sm text-white flex items-center gap-2">
                    <Plane className={`w-4 h-4 ${activeFlight.id === c.id ? 'text-amber-400' : 'text-slate-400'}`} />
                    {c.flightNumber}
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {c.status}
                  </span>
                </div>

                <p className="text-xs font-semibold text-slate-300">{c.route}</p>

                {/* Progress Mini Bar */}
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
                  <div
                    className="bg-gradient-to-r from-blue-500 via-amber-400 to-emerald-400 h-full rounded-full transition-all"
                    style={{ width: `${c.progressPercent}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                  <span>{c.aircraft}</span>
                  <span className="font-mono text-amber-300">{c.remainingTime}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Radar Telemetry Screen */}
          <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
            {/* Background Radar concentric rings */}
            <div className="absolute right-0 bottom-0 w-96 h-96 border border-blue-500/10 rounded-full -mr-20 -mb-20 pointer-events-none"></div>
            <div className="absolute right-0 bottom-0 w-64 h-64 border border-blue-500/10 rounded-full -mr-4 -mb-4 pointer-events-none"></div>

            <div>
              {/* Telemetry Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                    SELECTED AIR CARGO FLIGHT
                  </span>
                  <h4 className="text-xl sm:text-2xl font-black text-white font-mono flex items-center gap-2 mt-0.5">
                    {activeFlight.flightNumber}
                    <span className="text-xs font-sans text-amber-400 bg-amber-400/10 border border-amber-400/30 px-2 py-0.5 rounded-md">
                      {activeFlight.aircraft}
                    </span>
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-slate-400 block">DESTINATION WEATHER</span>
                  <span className="text-xs font-bold text-blue-300">{activeFlight.tempDest}</span>
                </div>
              </div>

              {/* Graphical Route Arc Simulation */}
              <div className="my-8 relative py-4">
                <div className="flex items-center justify-between text-xs font-bold mb-2">
                  <div className="flex items-center gap-1.5 text-white">
                    <span className="w-3 h-3 rounded-full bg-brand-red animate-ping"></span>
                    <span>{activeFlight.originCity}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-400">
                    <MapPin className="w-4 h-4" />
                    <span>{activeFlight.destinationCity}</span>
                  </div>
                </div>

                {/* Animated Flight Path Bar */}
                <div className="relative w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div 
                    className="h-full bg-gradient-to-r from-brand-red via-amber-400 to-emerald-400 rounded-full transition-all duration-700"
                    style={{ width: `${activeFlight.progressPercent}%` }}
                  ></div>
                </div>

                {/* Flying Plane Icon Indicator */}
                <div 
                  className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 pointer-events-none"
                  style={{ left: `calc(${activeFlight.progressPercent}% - 14px)` }}
                >
                  <div className="p-1.5 rounded-full bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/50">
                    <Plane className="w-4 h-4 transform rotate-90" />
                  </div>
                </div>

                <div className="flex justify-between text-[11px] font-mono text-slate-400 mt-2">
                  <span>Departure: SVPI Cargo Terminal (AMD)</span>
                  <span className="text-amber-300 font-bold">{activeFlight.progressPercent}% Completed</span>
                  <span>Arrival: {activeFlight.destinationCity}</span>
                </div>
              </div>

              {/* Telemetry Sensor Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Activity className="w-3 h-3 text-blue-400" /> Cruising Altitude
                  </span>
                  <p className="text-base font-black font-mono text-white mt-1">{activeFlight.altitude}</p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Wind className="w-3 h-3 text-amber-400" /> Ground Speed
                  </span>
                  <p className="text-base font-black font-mono text-white mt-1">{activeFlight.groundSpeed}</p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-400" /> Remaining Time
                  </span>
                  <p className="text-base font-black font-mono text-emerald-300 mt-1">{activeFlight.remainingTime}</p>
                </div>

                <div className="bg-slate-950/60 p-3.5 rounded-2xl border border-slate-800">
                  <span className="text-[10px] font-mono text-slate-500 uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-purple-400" /> Flight Manifest
                  </span>
                  <p className="text-base font-black font-mono text-purple-300 mt-1">{activeFlight.cargoConsignments}</p>
                </div>
              </div>
            </div>

            {/* Bottom Quick Test Link */}
            <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400">
                Track consignment carried on this flight:{' '}
                <strong className="text-amber-400 font-mono">{activeFlight.awbExample}</strong>
              </span>

              <a
                href="#tracking"
                className="bg-brand-red hover:bg-brand-crimson text-white px-3.5 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1"
              >
                <span>Track This Parcel</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
