'use client';

import React from 'react';
import Image from 'next/image';
import { Globe, Plane, ShieldCheck, Award, Users, CheckCircle, Navigation } from 'lucide-react';
import { POPULAR_COUNTRIES } from '@/lib/data';

export default function NetworkSection() {
  const stats = [
    { value: '220+', label: 'Countries & Territories', sub: 'Worldwide Door-to-Door Reach' },
    { value: '50,000+', label: 'Shipments Delivered', sub: 'From Ahmedabad & Gujarat' },
    { value: '99.8%', label: 'On-Time Arrival Rate', sub: 'Express Tier-1 Cargo' },
    { value: '15+', label: 'Global Airline Partners', sub: 'Emirates, Air India, Qatar, British Airways' },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-brand-blue border border-blue-200 mb-3">
            <Globe className="w-3.5 h-3.5 text-brand-red" />
            <span>Ahmedabad Hub to the Entire Globe</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Our Global Air & Express Logistics Network
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Operating daily scheduled export cargo flights and bonded customs corridors to North America, the United Kingdom, Europe, the Middle East, and Asia Pacific.
          </p>
        </div>

        {/* Global Visualization Image & Key Hubs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 relative">
            <div className="relative h-80 sm:h-96 w-full rounded-3xl overflow-hidden shadow-2xl border border-slate-200 group">
              <Image
                src="/images/global-network.jpg"
                alt="Global Logistics Network - Mishva International Courier"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex flex-col justify-end p-6 sm:p-8 text-white">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                  Direct Flights & International Hubs
                </span>
                <h4 className="text-xl sm:text-2xl font-black mt-1">
                  Daily Air Cargo Departures from SVPI Airport (AMD) & BOM
                </h4>
                <p className="text-xs text-slate-200 mt-1 max-w-lg">
                  Consolidated at Chandkheda Hub, Ahmedabad and flown directly via Emirates, Qatar Airways, Air India, and Lufthansa for rapid customs clearance.
                </p>
              </div>
            </div>
          </div>

          {/* Popular International Corridors */}
          <div className="lg:col-span-5 space-y-3">
            <h4 className="text-base font-extrabold text-brand-navy uppercase tracking-wider mb-2">
              Top Destination Corridors
            </h4>

            {POPULAR_COUNTRIES.slice(0, 5).map((country) => (
              <div 
                key={country.countryCode}
                className="p-3.5 bg-slate-50 hover:bg-blue-50/70 border border-slate-200/90 rounded-2xl flex items-center justify-between transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <h5 className="font-bold text-xs sm:text-sm text-brand-navy">{country.countryName}</h5>
                    <p className="text-[11px] text-slate-500">Transit: {country.deliveryDaysExpress}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold text-brand-navy">Starting ₹{country.baseRateFirst500g}</span>
                  <p className="text-[10px] text-emerald-600 font-medium">Daily Direct Flight</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dynamic Numerical Stats Banner */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((s, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center shadow-xs hover:border-brand-red transition-colors"
            >
              <p className="text-3xl sm:text-4xl font-black text-brand-red font-mono">{s.value}</p>
              <h5 className="text-sm font-bold text-brand-navy mt-1.5">{s.label}</h5>
              <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
