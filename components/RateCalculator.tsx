'use client';

import React, { useState } from 'react';
import { 
  Calculator, 
  ArrowRight, 
  Package, 
  Plane, 
  Clock, 
  ShieldCheck, 
  Sparkles,
  Info,
  Check,
  Percent,
  FileCheck2
} from 'lucide-react';
import { POPULAR_COUNTRIES } from '@/lib/data';

interface RateCalculatorProps {
  onSelectRate?: (details: { country: string; weight: number; rate: number; service: string }) => void;
}

export default function RateCalculator({ onSelectRate }: RateCalculatorProps) {
  const [selectedCountryCode, setSelectedCountryCode] = useState('US');
  const [actualWeight, setActualWeight] = useState<number>(2.5);
  const [lengthCm, setLengthCm] = useState<number>(25);
  const [widthCm, setWidthCm] = useState<number>(20);
  const [heightCm, setHeightCm] = useState<number>(15);
  const [packageType, setPackageType] = useState<string>('snacks');

  // Calculate volumetric weight: (L x W x H) / 5000
  const volumetricWeight = Number(((lengthCm * widthCm * heightCm) / 5000).toFixed(2));
  const chargeableWeight = Math.max(actualWeight || 0.5, volumetricWeight);

  const country = POPULAR_COUNTRIES.find((c) => c.countryCode === selectedCountryCode) || POPULAR_COUNTRIES[0];

  // Rate calculation formula:
  // Base rate (first 500g) + (remaining weight / 0.5kg) * perAdditional500g
  const additional500gUnits = Math.max(0, Math.ceil((chargeableWeight - 0.5) / 0.5));
  const basePriceExpress = country.baseRateFirst500g + (additional500gUnits * country.perAdditional500g);
  
  // Economy rate is ~22% lower
  const basePriceEconomy = Math.round(basePriceExpress * 0.78);

  // NRI Food specialty packaging/handling
  const foodRate = Math.round(basePriceExpress * 1.05);

  const handleBookWithQuote = (serviceName: string, estimatedPrice: number) => {
    if (onSelectRate) {
      onSelectRate({
        country: country.countryName,
        weight: chargeableWeight,
        rate: estimatedPrice,
        service: serviceName,
      });
    }
    const bookingEl = document.getElementById('booking');
    if (bookingEl) {
      bookingEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="calculator" className="w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header Bar */}
        <div className="bg-gradient-to-r from-brand-navy to-brand-blue text-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-200 border border-red-500/30 mb-3">
              <Calculator className="w-3.5 h-3.5" />
              <span>Transparent All-Inclusive Pricing</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              International Shipping Rate & Volumetric Calculator
            </h3>
            <p className="text-sm text-blue-100/90 mt-2">
              Calculate instant doorstep-to-doorstep shipping charges from Ahmedabad & Gujarat to 220+ international destinations. Free packaging & doorstep pickup included.
            </p>
          </div>
        </div>

        {/* Form Body */}
        <div className="p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Controls */}
            <div className="lg:col-span-7 space-y-6">
              {/* Origin & Destination */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Origin (From)
                  </label>
                  <div className="w-full p-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-700 font-semibold text-sm flex items-center justify-between">
                    <span>🇮🇳 Ahmedabad, Gujarat (India)</span>
                    <span className="text-[11px] text-brand-red font-bold">Free Pickup</span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Destination Country (To)
                  </label>
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="w-full p-3 bg-white border-2 border-slate-300 rounded-xl text-slate-900 font-bold text-sm focus:ring-2 focus:ring-brand-blue focus:border-brand-blue focus:outline-none shadow-xs"
                  >
                    {POPULAR_COUNTRIES.map((c) => (
                      <option key={c.countryCode} value={c.countryCode}>
                        {c.flag} {c.countryName}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Package Category */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Shipment Category
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'snacks', label: 'Gujarati Snacks', sub: 'Khakhra/Farsan' },
                    { id: 'docs', label: 'Documents', sub: 'University/Legal' },
                    { id: 'medicine', label: 'Medicines', sub: 'With Prescription' },
                    { id: 'general', label: 'General / Parcel', sub: 'Clothes/Gifts' },
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setPackageType(cat.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all ${
                        packageType === cat.id
                          ? 'border-brand-red bg-red-50/60 ring-2 ring-brand-red/20'
                          : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      <p className="font-bold text-xs text-brand-navy">{cat.label}</p>
                      <p className="text-[10px] text-slate-500">{cat.sub}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Weight & Dimensions */}
              <div className="border border-slate-200 rounded-2xl p-4 sm:p-5 bg-slate-50/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                    <Package className="w-4 h-4 text-brand-red" />
                    Weight & Parcel Dimensions
                  </span>
                  <span className="text-[11px] text-slate-500">IATA Standard Calculation</span>
                </div>

                <div>
                  <div className="flex justify-between items-center text-xs mb-1">
                    <span className="font-semibold text-slate-700">Actual Scale Weight (kg):</span>
                    <span className="font-mono font-bold text-brand-navy text-sm">{actualWeight} KG</span>
                  </div>
                  <input
                    type="range"
                    min="0.5"
                    max="50"
                    step="0.5"
                    value={actualWeight}
                    onChange={(e) => setActualWeight(parseFloat(e.target.value))}
                    className="w-full accent-brand-red cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                    <span>0.5 kg (Min)</span>
                    <span>10 kg</span>
                    <span>25 kg</span>
                    <span>50 kg (Commercial)</span>
                  </div>
                </div>

                {/* Dimensions inputs */}
                <div>
                  <p className="text-xs font-semibold text-slate-700 mb-2">
                    Box Dimensions in Centimeters (L x W x H):
                  </p>
                  <div className="grid grid-cols-3 gap-2 sm:gap-3">
                    <div>
                      <span className="text-[10px] text-slate-700 font-bold uppercase">Length (cm)</span>
                      <input
                        type="number"
                        min="5"
                        max="200"
                        value={lengthCm}
                        onChange={(e) => setLengthCm(Number(e.target.value))}
                        className="w-full p-2.5 bg-white border-2 border-slate-300 rounded-lg text-xs font-mono font-black text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-700 font-bold uppercase">Width (cm)</span>
                      <input
                        type="number"
                        min="5"
                        max="200"
                        value={widthCm}
                        onChange={(e) => setWidthCm(Number(e.target.value))}
                        className="w-full p-2.5 bg-white border-2 border-slate-300 rounded-lg text-xs font-mono font-black text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-700 font-bold uppercase">Height (cm)</span>
                      <input
                        type="number"
                        min="5"
                        max="200"
                        value={heightCm}
                        onChange={(e) => setHeightCm(Number(e.target.value))}
                        className="w-full p-2.5 bg-white border-2 border-slate-300 rounded-lg text-xs font-mono font-black text-slate-900 focus:outline-none focus:border-brand-blue"
                      />
                    </div>
                  </div>
                </div>

                {/* Volumetric Weight vs Scale Weight comparison card */}
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-slate-500">Volumetric Weight ({lengthCm}×{widthCm}×{heightCm} / 5000): </span>
                    <strong className="text-slate-800 font-mono">{volumetricWeight} KG</strong>
                  </div>
                  <div className="bg-blue-50 text-brand-blue font-bold px-2.5 py-1 rounded-lg border border-blue-200 flex items-center gap-1">
                    <Info className="w-3.5 h-3.5 text-brand-blue" />
                    <span>Chargeable: {chargeableWeight} KG</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Output Cards */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{country.flag}</span>
                    <div>
                      <h4 className="font-extrabold text-sm text-brand-navy">{country.countryName}</h4>
                      <p className="text-[11px] text-slate-500">For {chargeableWeight} kg chargeable weight</p>
                    </div>
                  </div>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Doorstep Delivery
                  </span>
                </div>

                {/* Plan 1: Express Air Courier */}
                <div className="bg-white border-2 border-brand-red rounded-xl p-4 shadow-sm relative group hover:shadow-md transition-shadow">
                  <div className="absolute -top-2.5 right-3 bg-brand-red text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full">
                    Most Popular
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                        <Plane className="w-4 h-4 text-brand-red" />
                        Express Air Priority
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Transit: {country.deliveryDaysExpress}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-brand-navy">₹{basePriceExpress.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-emerald-600 font-semibold">All Taxes & Fuel Incl.</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookWithQuote('Express Air Priority', basePriceExpress)}
                    className="mt-3 w-full bg-brand-red hover:bg-brand-crimson text-white py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Book This Delivery</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Plan 2: Economy Cargo */}
                <div className="bg-white border border-slate-200 rounded-xl p-4 hover:border-blue-400 transition-colors">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-slate-800 flex items-center gap-1.5">
                        <Package className="w-4 h-4 text-brand-blue" />
                        Standard Economy Air
                      </p>
                      <p className="text-[11px] text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3 text-slate-400" />
                        Transit: {country.deliveryDaysEconomy}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-black text-slate-800">₹{basePriceEconomy.toLocaleString('en-IN')}</p>
                      <p className="text-[10px] text-slate-500 font-medium">Budget Saver</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleBookWithQuote('Standard Economy Air', basePriceEconomy)}
                    className="mt-3 w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Select Economy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Included Benefits */}
                <div className="pt-2 border-t border-slate-200/80 space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free doorstep pickup anywhere in Ahmedabad & Gandhinagar</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Free export-grade 5-ply carton box packaging</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Real-time flight GPS & WhatsApp milestone alerts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>Customs clearance assistance & commercial documentation</span>
                  </div>
                </div>
              </div>

              {/* Bottom Note */}
              <p className="text-[11px] text-slate-400 text-center italic">
                * Rates are indicative and based on standard carrier fuel surcharges. Remote area zip codes may incur minor carrier surcharges.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
