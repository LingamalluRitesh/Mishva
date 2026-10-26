'use client';

import React, { useState } from 'react';
import { 
  FileCheck, 
  AlertTriangle, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck, 
  FileText, 
  Utensils, 
  Pill,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function CustomsGuide() {
  const [activeTab, setActiveTab] = useState<'allowed' | 'prohibited' | 'medicines' | 'kyc'>('allowed');

  return (
    <section id="customs-guide" className="py-16 sm:py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
            <span>Hassle-Free Customs & Packaging Standards</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            International Shipping & Customs Guidelines
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            Clear rules on what you can send from Gujarat, food packaging requirements, prescription medicine protocols, and mandatory KYC verification for zero customs delays.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'allowed', label: 'Allowed Food & Items', icon: CheckCircle2 },
            { id: 'prohibited', label: 'Prohibited & Restricted Items', icon: AlertTriangle },
            { id: 'medicines', label: 'Prescription Medicine Rules', icon: Pill },
            { id: 'kyc', label: 'Mandatory KYC Documents', icon: FileCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-navy text-white shadow-md'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Contents Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 shadow-xl border border-slate-200 max-w-4xl mx-auto">
          {/* View 1: Allowed Food & Items */}
          {activeTab === 'allowed' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-navy">What You Can Send Overseas</h3>
                  <p className="text-xs text-slate-500">Full list of allowed food, household and personal items</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                    <Utensils className="w-4 h-4 text-brand-red" />
                    Homemade Gujarati Snacks & Sweets
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Khakhra, Fafda, Ganthiya, Bhavnagri Sev, Chevdo</li>
                    <li>Sweets: Kaju Katli, Mohanthal, Peda, Magas</li>
                    <li>Dry Thepla, Bhakhri, Puri (Vacuum sealed)</li>
                    <li>Dry roasted ground spices, Masala powders, Turmeric</li>
                    <li>Commercial branded pickles (no leaking liquids)</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-brand-navy flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-blue" />
                    Personal & Commercial Goods
                  </h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Traditional dresses, Sarees, Kurtas, Garba outfits</li>
                    <li>University Transcripts, Degree certificates, WES folders</li>
                    <li>Pooja samagri, brass idols, incense sticks (Agarbatti)</li>
                    <li>Kitchen steel utensils, spice boxes, pressure cookers</li>
                    <li>Commercial textile swatches, catalog samples</li>
                  </ul>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 text-xs text-brand-blue flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 shrink-0 text-brand-blue mt-0.5" />
                <div>
                  <p className="font-bold">Mishva Vacuum Packaging Guarantee:</p>
                  <p className="text-slate-600 mt-0.5">
                    All homemade food items are inspected and vacuum-packed in our Chandkheda hub to preserve crispness and prevent spoilage during international air travel.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* View 2: Prohibited & Restricted */}
          {activeTab === 'prohibited' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold">
                  ✕
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-navy">Prohibited & Strictly Banned Items</h3>
                  <p className="text-xs text-slate-500">IATA aviation safety regulations & global customs bans</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200 space-y-1.5">
                  <span className="font-bold text-red-800">Dangerous Goods & Hazards:</span>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li>Flammable liquids, perfumes, deodorants, nail polish</li>
                    <li>Loose lithium batteries / power banks above airline watt limits</li>
                    <li>Firecrackers, matches, gas lighters, compressed cylinders</li>
                    <li>Chemicals, corrosive acids, toxic reagents</li>
                  </ul>
                </div>

                <div className="p-4 bg-red-50/60 rounded-2xl border border-red-200 space-y-1.5">
                  <span className="font-bold text-red-800">Perishables & Restricted Currencies:</span>
                  <ul className="space-y-1 text-slate-700 list-disc list-inside">
                    <li>Raw fresh milk, dairy butter, unpasteurized curds</li>
                    <li>Fresh fruits, seeds, soil, raw live plants</li>
                    <li>Physical currency cash notes, lottery tickets, bearer cheques</li>
                    <li>Gold bullion, raw silver bars (without export bullion permits)</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* View 3: Medicines */}
          {activeTab === 'medicines' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
                  <Pill className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-navy">Prescription Medicine Courier Requirements</h3>
                  <p className="text-xs text-slate-500">How to send doctor-prescribed medications to USA, UK, Canada & worldwide</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">1</span>
                  <div>
                    <strong className="text-slate-900">Valid Doctor's Prescription:</strong> Must clearly mention the patient's full name, prescribed medicine names, dosage, duration, and doctor's registration number/stamp.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">2</span>
                  <div>
                    <strong className="text-slate-900">Original Pharmacy Tax Invoice:</strong> Must match the exact batch numbers on the medicine packaging with at least 6 months validity before expiration.
                  </div>
                </div>

                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[10px]">3</span>
                  <div>
                    <strong className="text-slate-900">Patient & Consignee Identity Proof:</strong> Copy of patient's Aadhaar or Passport.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* View 4: KYC */}
          {activeTab === 'kyc' && (
            <div className="space-y-6 animate-in fade-in">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-brand-blue flex items-center justify-center font-bold">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-navy">Mandatory Indian Customs KYC Verification</h3>
                  <p className="text-xs text-slate-500">Required by Customs Act 1962 & Directorate General of Foreign Trade (DGFT)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-brand-navy">For Individual Senders:</h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Aadhaar Card (front & back)</li>
                    <li>Passport (mandatory for NRI shipments)</li>
                    <li>PAN Card copy</li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <h4 className="font-bold text-sm text-brand-navy">For Commercial B2B Exporters:</h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc list-inside">
                    <li>Importer Exporter Code (IEC)</li>
                    <li>GST Registration Certificate</li>
                    <li>Authorized Signatory PAN & LUT Document</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* Bottom Helpdesk CTA */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-slate-500">Unsure about your specific item or destination customs rules?</span>
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Hi, I want to check if my item is permitted for international courier.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
            >
              Ask Our Customs Specialist on WhatsApp →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
