'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Plane, 
  UtensilsCrossed, 
  Pill, 
  GraduationCap, 
  Box, 
  Ship, 
  Check, 
  ArrowRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function ServicesSection() {
  const services = [
    {
      id: 'food',
      icon: UtensilsCrossed,
      title: 'NRI Homemade Food & Snacks Courier',
      badge: 'Most Popular in Gujarat',
      badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Specialized international delivery for homemade Gujarati snacks, Khakhra, Fafda, Sweets, Pickles, Thepla, and ground spices with commercial vacuum sealing.',
      features: [
        'Commercial multi-layer vacuum heat seal packing',
        'US FDA & UK customs compliant food clearances',
        'Special rates for 10kg, 15kg & 20kg festive family boxes',
        'Delivery to USA, UK, Canada, Australia, NZ, UAE'
      ],
      ctaText: 'Book Food Courier'
    },
    {
      id: 'express',
      icon: Plane,
      title: 'Worldwide Express Air Parcel',
      badge: '2-4 Day Delivery',
      badgeColor: 'bg-red-100 text-red-800 border-red-300',
      description: 'Lightning-fast door-to-door international express courier connecting Ahmedabad to over 220+ countries with Tier-1 airline space guarantees.',
      features: [
        'Guaranteed next-flight departure scheduling',
        'Real-time flight checkpoint GPS tracking',
        'Complete doorstep delivery with signature proof',
        'Partnership with DHL, FedEx, and UPS networks'
      ],
      ctaText: 'Send Express Parcel'
    },
    {
      id: 'medicine',
      icon: Pill,
      title: 'Prescription Medicine Express',
      badge: 'Doctor RX Support',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      description: 'Safe and certified international shipping of vital medicines, Ayurvedic formulations, and chronic healthcare supplies with complete customs clearance assistance.',
      features: [
        'Assistance with doctor prescription verification',
        'Original pharmacy tax invoice certification',
        'Temperature-stable protective shockproof packaging',
        'Express clearance through international health customs'
      ],
      ctaText: 'Inquire Medicine Courier'
    },
    {
      id: 'student',
      icon: GraduationCap,
      title: 'University & Student Express',
      badge: 'Special Student Rates',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
      description: 'Priority courier services for international students sending academic transcripts, WES evaluations, I-20 documents, and excess study luggage.',
      features: [
        'Flat student discount rates for USA/UK/Canada',
        'Tamper-proof waterproof heavy security envelopes',
        'Special student luggage baggage allowance (up to 40kg)',
        'Delivery directly to University Admissions offices'
      ],
      ctaText: 'Student Document Booking'
    },
    {
      id: 'cargo',
      icon: Box,
      title: 'Commercial Air Cargo & B2B Samples',
      badge: 'Business Export',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
      description: 'Comprehensive commercial air freight for Gujarat exporters, textile merchants, brassware manufacturers, and chemical testing samples.',
      features: [
        'Commercial Invoice & Packing List generation',
        'IEC Code and GST export documentation aid',
        'Palletized cargo and heavy machinery parts transit',
        'Air Waybill (AWB) generation with priority customs gate'
      ],
      ctaText: 'Commercial Freight Quote'
    },
    {
      id: 'excess',
      icon: Ship,
      title: 'Excess Baggage & Relocation Cargo',
      badge: 'Heavy Cargo Saver',
      badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
      description: 'Economical excess baggage and household relocation services for students, families, and professionals moving overseas without airline excess fees.',
      features: [
        'Saves up to 65% compared to airline excess baggage charges',
        'Free door-to-door collection from your residence',
        'Heavy-duty 7-ply cardboard cartons provided free',
        'Air cargo and ocean container options'
      ],
      ctaText: 'Check Baggage Rates'
    }
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-slate-100/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-brand-red/10 text-brand-red border border-brand-red/20 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Comprehensive Global Courier Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-navy tracking-tight">
            Specialized International Courier Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            From homemade festive sweets to life-saving medicines and commercial air cargo, Mishva International Courier connects Ahmedabad and Gujarat to the entire world with utmost care.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv) => {
            const Icon = srv.icon;
            return (
              <div 
                key={srv.id} 
                className="bg-white rounded-3xl p-7 shadow-lg shadow-slate-200/50 border border-slate-200/80 flex flex-col justify-between hover:shadow-2xl hover:border-blue-300 transition-all transform hover:-translate-y-1 group"
              >
                <div>
                  {/* Top Icon & Badge */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-navy to-brand-blue flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${srv.badgeColor}`}>
                      {srv.badge}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-brand-navy group-hover:text-brand-red transition-colors">
                    {srv.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed">
                    {srv.description}
                  </p>

                  {/* Bullet points */}
                  <div className="mt-5 pt-5 border-t border-slate-100 space-y-2.5">
                    {srv.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <a
                    href="#booking"
                    className="font-bold text-xs text-brand-navy group-hover:text-brand-red transition-colors flex items-center gap-1.5"
                  >
                    <span>{srv.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(`Hi, I am interested in ${srv.title} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-semibold text-emerald-600 hover:text-emerald-700 hover:underline"
                  >
                    WhatsApp Quote
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Banner: NRI Food & Medicine Feature with AI Generated Delivery Image */}
        <div id="food-medicine" className="mt-16 bg-gradient-to-r from-brand-navy via-brand-deep to-brand-navy rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="inline-block bg-amber-400 text-slate-950 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
                Gujarat Speciality Delivery
              </span>
              <h3 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Sending Homemade Snacks & Medicines to Family Abroad?
              </h3>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                We know how much your children and relatives in the USA, UK, Canada, and Australia crave authentic Gujarati Khakhra, Fafda, Sev, homemade Pickles, and urgent Indian prescription medicines.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-blue-200">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>100% Leakproof Vacuum Sealing</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Doctor Prescription Clearance</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Free Doorstep Collection in Ahmedabad</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Guaranteed 3-5 Day Delivery</span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap items-center gap-3">
                <a
                  href="#booking"
                  className="bg-brand-red hover:bg-brand-crimson text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-transform hover:-translate-y-0.5"
                >
                  Schedule Free Home Pickup
                </a>
                <a
                  href={`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent("Namaste, I want to send homemade food packets and medicines abroad. Please guide me.")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-lg transition-transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  WhatsApp Inquiries (+91 7623909477)
                </a>
              </div>
            </div>

            <div className="lg:col-span-5 relative">
              <div className="relative h-72 sm:h-80 w-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl">
                <Image
                  src="/images/courier-delivery.jpg"
                  alt="Mishva International Courier Doorstep Service"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-4">
                  <p className="text-white text-xs font-semibold">
                    Doorstep collection & white-glove packaging right at your home in Ahmedabad & Gandhinagar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
