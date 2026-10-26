'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Plane, 
  Package, 
  Truck, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight, 
  MessageCircle, 
  CheckCircle2, 
  Award,
  Sparkles,
  Calculator,
  Search,
  ExternalLink,
  User,
  Radio,
  FileText,
  Star,
  Check,
  X,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

import TrackingWidget from '@/components/TrackingWidget';
import RateCalculator from '@/components/RateCalculator';
import BookingForm from '@/components/BookingForm';
import ServicesSection from '@/components/ServicesSection';
import NetworkSection from '@/components/NetworkSection';
import CustomsGuide from '@/components/CustomsGuide';
import CustomerPortal from '@/components/CustomerPortal';
import LiveFlightMap from '@/components/LiveFlightMap';
import InvoiceGenerator from '@/components/InvoiceGenerator';
import TypewriterQuotes from '@/components/TypewriterQuotes';
import { COMPANY_INFO, DEFAULT_SITE_CONTENT } from '@/lib/data';
import { Shipment, SiteContent } from '@/lib/types';

export default function HomePage() {
  const [content, setContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  
  // On-demand active feature state: null means clean dashboard view
  // Options: 'track' | 'calculator' | 'pickup' | 'orders' | 'radar' | 'invoice' | 'guide' | 'services'
  const [activeFeature, setActiveFeature] = useState<string | null>(null);
  
  // Hero quick search input
  const [heroSearchAwb, setHeroSearchAwb] = useState('');

  const [selectedRateDetails, setSelectedRateDetails] = useState<{
    country: string;
    weight: number;
    rate: number;
    service: string;
  } | null>(null);

  // Fetch live CMS content if edited by admin
  useEffect(() => {
    fetch('/api/site-content')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.content) {
          setContent(data.content);
        }
      })
      .catch(() => console.log('Using default content'));
  }, []);

  // Listen for custom tab switch events (from Navbar or AI Assistant)
  useEffect(() => {
    const handleCustomTab = (e: any) => {
      if (e.detail?.tabId) {
        setActiveFeature(e.detail.tabId);
        const el = document.getElementById('operations-deck');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    window.addEventListener('mishva-switch-tab', handleCustomTab);
    return () => window.removeEventListener('mishva-switch-tab', handleCustomTab);
  }, []);

  // Check URL hash on initial load
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.replace('#', '');
      if (['tracking', 'track'].includes(hash)) setActiveFeature('track');
      else if (['calculator', 'calc', 'rates'].includes(hash)) setActiveFeature('calculator');
      else if (['booking', 'pickup'].includes(hash)) setActiveFeature('pickup');
      else if (['customer-portal', 'orders'].includes(hash)) setActiveFeature('orders');
      else if (['flight-radar', 'radar'].includes(hash)) setActiveFeature('radar');
      else if (['invoice-tool', 'invoice'].includes(hash)) setActiveFeature('invoice');
      else if (['services'].includes(hash)) setActiveFeature('services');
      else if (['customs-guide', 'guide'].includes(hash)) setActiveFeature('guide');
    }
  }, []);

  const openFeature = (featureId: string) => {
    setActiveFeature(featureId);
    setTimeout(() => {
      const el = document.getElementById('operations-deck');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const closeFeature = () => {
    setActiveFeature(null);
  };

  const handleHeroTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!heroSearchAwb.trim()) return;
    setActiveFeature('track');
    setTimeout(() => {
      const el = document.getElementById('operations-deck');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleRateSelected = (details: {
    country: string;
    weight: number;
    rate: number;
    service: string;
  }) => {
    setSelectedRateDetails(details);
    setActiveFeature('pickup');
    setTimeout(() => {
      const el = document.getElementById('operations-deck');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleRebookOrder = (shipment: Shipment) => {
    setSelectedRateDetails({
      country: shipment.receiverCountry,
      weight: shipment.weightKg,
      rate: shipment.paymentAmount,
      service: shipment.serviceType,
    });
    setActiveFeature('pickup');
    setTimeout(() => {
      const el = document.getElementById('operations-deck');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const FEATURE_ITEMS = [
    {
      id: 'track',
      title: 'Track Consignment',
      tag: 'LIVE GPS TELEMETRY',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'Enter your AWB number to get real-time flight checkpoints, customs clearance timestamps, and expected delivery date.',
      icon: Search,
      iconBg: 'from-red-600 to-rose-700',
      actionText: 'Launch Live Tracker',
    },
    {
      id: 'calculator',
      title: 'Rate & Volumetric Calculator',
      tag: 'TRANSPARENT IATA PRICING',
      tagColor: 'bg-blue-50 text-blue-800 border-blue-200',
      description: 'Instant doorstep-to-doorstep rate calculator for 220+ countries with IATA volumetric vs scale weight comparison.',
      icon: Calculator,
      iconBg: 'from-blue-600 to-indigo-700',
      actionText: 'Calculate Shipping Rates',
    },
    {
      id: 'pickup',
      title: 'Book Doorstep Pickup',
      tag: 'FREE IN AHMEDABAD',
      tagColor: 'bg-red-50 text-red-800 border-red-200',
      description: 'Book home or office collection in Ahmedabad & Gandhinagar. Our van arrives with digital weight scale & 5-ply export box.',
      icon: Truck,
      iconBg: 'from-red-600 to-red-800',
      actionText: 'Schedule Free Pickup',
    },
    {
      id: 'orders',
      title: 'My Previous Orders',
      tag: 'CUSTOMER SELF-SERVICE',
      tagColor: 'bg-amber-50 text-amber-800 border-amber-200',
      description: 'View your completed and active consignments, download commercial tax receipts, or re-order frequent routes with 1 click.',
      icon: User,
      iconBg: 'from-amber-600 to-amber-800',
      actionText: 'View Order History',
    },
    {
      id: 'radar',
      title: 'Live Air Cargo Radar',
      tag: 'AMD SVPI AIRPORT TELEMETRY',
      tagColor: 'bg-purple-50 text-purple-800 border-purple-200',
      description: 'Explore live air freighter routes connecting Ahmedabad & Mumbai to London, New York, Toronto, Dubai & Sydney.',
      icon: Radio,
      iconBg: 'from-purple-600 to-indigo-800',
      actionText: 'Open Flight Radar',
    },
    {
      id: 'invoice',
      title: 'Customs Proforma Invoice',
      tag: 'FREE EXPORT UTILITY',
      tagColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      description: 'Generate international customs proforma invoice and itemized packing slip for NRI food, gifts, textiles, or commercial samples.',
      icon: FileText,
      iconBg: 'from-cyan-600 to-blue-700',
      actionText: 'Generate Free Invoice',
    },
    {
      id: 'guide',
      title: 'NRI Food & Medicine Guide',
      tag: 'FDA & HMRC CUSTOMS AID',
      tagColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      description: 'Essential guidelines for vacuum sealing homemade snacks, doctor prescription verification, and prohibited item lists.',
      icon: ShieldCheck,
      iconBg: 'from-emerald-600 to-teal-800',
      actionText: 'View Packaging Rules',
    },
    {
      id: 'services',
      title: 'All Courier Services',
      tag: '220+ COUNTRIES',
      tagColor: 'bg-rose-50 text-rose-800 border-rose-200',
      description: 'Explore our full suite of international express parcels, student transcript logistics, excess baggage, and air freight.',
      icon: Layers,
      iconBg: 'from-rose-600 to-pink-800',
      actionText: 'Explore All Services',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#F8FAFC] text-slate-900 font-sans selection:bg-red-600 selection:text-white">
      {/* Top Announcement Notice */}
      {content.company.noticeBarEnabled && (
        <div className="bg-[#DC2626] text-white text-xs py-2 px-4 text-center font-bold shadow-xs border-b border-red-700 flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span>{content.company.noticeBarText}</span>
        </div>
      )}

      {/* 
        WHITE THEME HERO SECTION WITH FULL-VISIBILITY AI CARGO FREIGHTER IMAGE
      */}
      <section className="relative overflow-hidden py-12 lg:py-20 bg-slate-50 border-b border-slate-200">
        {/* 
          100% VISIBLE FULL-COLOR AIR CARGO FREIGHTER BACKGROUND IMAGE 
          Positioned across the hero with clean light gradient blending on the left
        */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <Image
            src="/images/hero-cargo.jpg"
            alt="Mishva International Air Cargo Freighter at Airport Tarmac"
            fill
            className="object-cover object-right lg:object-center opacity-95 scale-100"
            priority
          />
          {/* 
            Smooth White-to-Transparent Gradient:
            Left side stays clean white for crystal-clear readability;
            Right side reveals the full, glorious, vivid Boeing air cargo freighter!
          */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-white/40 lg:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: White-Theme Headline, Dynamic Quotes & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/95 border border-slate-200 text-slate-800 shadow-sm backdrop-blur-md">
                <span className="flex text-amber-500">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                </span>
                <span>Ahmedabad Hub • Trusted by 10,000+ NRI Families</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-slate-900">
                {content.hero.headingMain}{' '}
                <span className="text-[#DC2626]">
                  {content.hero.headingHighlight}
                </span>
              </h1>

              {/* Subheading */}
              <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                {content.hero.subheading}
              </p>

              {/* TYPING ANIMATED QUOTES COMPONENT */}
              <div className="pt-1 flex justify-center lg:justify-start">
                <TypewriterQuotes />
              </div>

              {/* Benefit Chips in Clean White Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-800">
                <div className="bg-white/95 border border-slate-200 rounded-xl p-3 flex items-center gap-2 text-left shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-extrabold text-slate-900">Free Doorstep Pickup</span>
                </div>
                <div className="bg-white/95 border border-slate-200 rounded-xl p-3 flex items-center gap-2 text-left shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-extrabold text-slate-900">5-Ply Export Carton</span>
                </div>
                <div className="bg-white/95 border border-slate-200 rounded-xl p-3 flex items-center gap-2 text-left shadow-xs">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-[11px] font-extrabold text-slate-900">FDA & Doctor Rx Aid</span>
                </div>
              </div>

              {/* Action Buttons to Launch Features On Demand */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <button
                  type="button"
                  onClick={() => openFeature('pickup')}
                  className="btn-primary px-6 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-lg"
                >
                  <Truck className="w-4 h-4" />
                  <span>Book Doorstep Pickup</span>
                </button>

                <button
                  type="button"
                  onClick={() => openFeature('calculator')}
                  className="btn-secondary px-5 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Calculator className="w-4 h-4 text-blue-600" />
                  <span>Rate Calculator</span>
                </button>

                <Link
                  href="/login"
                  className="btn-secondary px-4 py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2"
                >
                  <User className="w-4 h-4 text-emerald-600" />
                  <span>Customer Login</span>
                </Link>
              </div>
            </div>

            {/* Right Col: Hero Info & Airport Operations Visuals (Tracking Box Removed per user request) */}
            <div className="lg:col-span-5 w-full space-y-4">
              {/* Airport Cargo Operations Highlights Card */}
              <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border-2 border-slate-200 shadow-xl space-y-4 text-slate-900">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-md">
                      <Plane className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-slate-900">SVPI Airport Cargo Hub</h3>
                      <p className="text-[11px] text-slate-500 font-medium">Ahmedabad (AMD) International Departures</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    Direct Daily Flights
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Global Reach</span>
                    <strong className="text-sm font-black text-slate-900">220+ Countries</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">USA, UK, Canada, UAE & more</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Express Transit</span>
                    <strong className="text-sm font-black text-slate-900">3 - 5 Days</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">Door-to-door delivery</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Doorstep Collection</span>
                    <strong className="text-sm font-black text-emerald-600">100% Free</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">Ahmedabad & Gandhinagar</p>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Export Packaging</span>
                    <strong className="text-sm font-black text-slate-900">Free 5-Ply Box</strong>
                    <p className="text-[10px] text-slate-500 mt-0.5">With vacuum heat sealing</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => openFeature('track')}
                    className="w-full btn-primary py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer transition-all"
                  >
                    <Search className="w-4 h-4" />
                    <span>Open Consignment Tracker</span>
                  </button>
                </div>
              </div>

              {/* Dedicated 4K AI Air Cargo Corridor Card */}
              <div 
                onClick={() => openFeature('radar')}
                className="relative h-44 rounded-2xl overflow-hidden border-2 border-slate-200 shadow-md group cursor-pointer"
              >
                <Image
                  src="/images/global-network.jpg"
                  alt="Mishva Global Express Corridors"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div>
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-amber-300 bg-black/60 px-2 py-0.5 rounded">
                      Direct Bonded Flight Lines
                    </span>
                    <h4 className="font-extrabold text-xs sm:text-sm mt-0.5">USA • UK • Canada • Australia • UAE</h4>
                  </div>
                  <div className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-md rounded-xl text-white transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        INTERACTIVE OPERATIONS LAUNCHPAD
        "When I click on the option then only I need to see the feature"
      */}
      <section id="operations-deck" className="py-14 lg:py-20 bg-slate-100/70 border-b border-slate-200 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {/* Section Heading & Quick Tab Strip */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-red-50 text-red-700 border border-red-200 mb-2">
                <Layers className="w-3.5 h-3.5" />
                <span>On-Demand Logistics Cockpit</span>
              </div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
                Select a Service or Tool to Launch
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-xl font-medium">
                Click any tool below to view it on demand. No cluttered endless scrolling.
              </p>
            </div>

            {/* Quick Switch Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {activeFeature && (
                <button
                  type="button"
                  onClick={closeFeature}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Close Active View</span>
                </button>
              )}
            </div>
          </div>

          {/* ACTIVE VIEW CONTAINER - MOUNTS ONLY WHEN AN OPTION IS CLICKED */}
          {activeFeature && (
            <div className="p-1 sm:p-2 rounded-3xl bg-gradient-to-b from-red-600 to-rose-700 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
              <div className="bg-white rounded-2xl p-4 sm:p-7 space-y-6">
                {/* Active Tool Control Bar */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 bg-slate-50 p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                      Currently Active Tool:
                    </span>
                    <span className="font-black text-sm sm:text-base text-slate-900 bg-white px-3 py-1 rounded-lg border border-slate-300 shadow-xs">
                      {FEATURE_ITEMS.find((f) => f.id === activeFeature)?.title || 'Service Tool'}
                    </span>
                  </div>

                  {/* Close Action */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      onClick={closeFeature}
                      className="btn-primary px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                      <span>Close This Tool</span>
                    </button>
                  </div>
                </div>

                {/* DYNAMICALLY MOUNTED TOOL VIEW */}
                <div className="w-full">
                  {activeFeature === 'track' && (
                    <TrackingWidget initialAwb={heroSearchAwb} />
                  )}

                  {activeFeature === 'calculator' && (
                    <RateCalculator onSelectRate={handleRateSelected} />
                  )}

                  {activeFeature === 'pickup' && (
                    <BookingForm
                      initialCountry={selectedRateDetails?.country}
                      initialWeight={selectedRateDetails?.weight}
                      initialRate={selectedRateDetails?.rate}
                      initialService={selectedRateDetails?.service}
                    />
                  )}

                  {activeFeature === 'orders' && (
                    <CustomerPortal onRebook={handleRebookOrder} />
                  )}

                  {activeFeature === 'radar' && (
                    <LiveFlightMap />
                  )}

                  {activeFeature === 'invoice' && (
                    <InvoiceGenerator />
                  )}

                  {activeFeature === 'guide' && (
                    <CustomsGuide />
                  )}

                  {activeFeature === 'services' && (
                    <ServicesSection />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* GRID OF CLICKABLE FEATURE TILES IN CRISP WHITE CARDS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURE_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeFeature === item.id;

              return (
                <div
                  key={item.id}
                  onClick={() => openFeature(item.id)}
                  className={`rounded-2xl p-5 border-2 transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                    isActive
                      ? 'bg-red-50/60 border-red-500 ring-2 ring-red-500/20 shadow-xl'
                      : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-red-400 hover:shadow-xl'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className={`w-11 h-11 rounded-xl bg-gradient-to-tr ${item.iconBg} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${item.tagColor}`}>
                        {item.tag}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-black text-base text-slate-900 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 mt-1.5 leading-relaxed font-medium">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-bold">
                    <span className={isActive ? 'text-red-600 font-extrabold' : 'text-slate-700 group-hover:text-red-600'}>
                      {isActive ? 'Currently Open' : item.actionText}
                    </span>
                    <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isActive ? 'text-red-600' : 'text-slate-400'}`} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ULTRA-HD AI PHOTOGRAPHY GALLERY IN CRISP WHITE */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-red-600 font-bold">
                OPERATIONS & GLOBAL GATEWAYS
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight mt-1">
                From Ahmedabad Hub to International Gateways
              </h2>
            </div>
            <p className="text-xs text-slate-600 max-w-md font-medium">
              Handling express shipments with certified aviation security screening, commercial vacuum sealing, and daily freighter space allocations.
            </p>
          </div>

          {/* 3 AI Images Grid in Full Color & Brightness */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image 1: Airport Cargo */}
            <div 
              onClick={() => openFeature('radar')}
              className="bg-white rounded-2xl overflow-hidden group cursor-pointer border-2 border-slate-200 hover:border-red-500 shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/hero-cargo.jpg"
                  alt="Mishva Air Cargo Freighter Loading"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-300 font-bold bg-black/60 px-2 py-0.5 rounded">
                    Air Cargo Freighter
                  </span>
                  <h4 className="font-bold text-sm mt-1">Daily Direct Flight Cargo Departures</h4>
                  <p className="text-[11px] text-slate-300">From SVPI Airport (AMD) & BOM Terminals</p>
                </div>
              </div>
            </div>

            {/* Image 2: Doorstep Executive */}
            <div 
              onClick={() => openFeature('pickup')}
              className="bg-white rounded-2xl overflow-hidden group cursor-pointer border-2 border-slate-200 hover:border-red-500 shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/courier-delivery.jpg"
                  alt="Mishva Doorstep Courier Executive"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-300 font-bold bg-black/60 px-2 py-0.5 rounded">
                    Free Home Pickup
                  </span>
                  <h4 className="font-bold text-sm mt-1">White-Glove Doorstep Collection</h4>
                  <p className="text-[11px] text-slate-300">Free 5-ply export carton & digital scale</p>
                </div>
              </div>
            </div>

            {/* Image 3: 3D Global Network */}
            <div 
              onClick={() => openFeature('calculator')}
              className="bg-white rounded-2xl overflow-hidden group cursor-pointer border-2 border-slate-200 hover:border-red-500 shadow-md hover:shadow-xl transition-all"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/global-network.jpg"
                  alt="Mishva Global Flight Corridors"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent"></div>
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-blue-300 font-bold bg-black/60 px-2 py-0.5 rounded">
                    220+ Countries
                  </span>
                  <h4 className="font-bold text-sm mt-1">Global Air & Express Corridors</h4>
                  <p className="text-[11px] text-slate-300">Direct bonded lines to USA, UK, Canada & UAE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CHANDKHEDA AHMEDABAD BRANCH & CONTACT SECTION */}
      <section className="py-14 sm:py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 text-slate-900 shadow-xl relative overflow-hidden border-2 border-slate-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-red-50 text-red-700 border border-red-200">
                  <MapPin className="w-3.5 h-3.5 text-red-600" />
                  <span>Operations Hub & Head Office</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                  Visit Our Chandkheda Branch in Ahmedabad
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  Walk in to our main branch for instant digital weighing, commercial vacuum heat packaging, export documentation aid, or book a free doorstep pickup right from your home anywhere in Ahmedabad or Gandhinagar.
                </p>

                <div className="space-y-2.5 text-xs sm:text-sm text-slate-700 pt-1 font-medium">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-slate-900">Address:</strong> {content.company.address}
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-red-600 shrink-0" />
                    <span>
                      <strong className="text-slate-900">Phone / Helpline:</strong>{' '}
                      <a href={`tel:${content.company.phoneRaw}`} className="underline font-bold text-red-600">
                        {content.company.phone}
                      </a>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Mail className="w-4 h-4 text-red-600 shrink-0" />
                    <span>
                      <strong className="text-slate-900">Email:</strong>{' '}
                      <a href={`mailto:${content.company.email}`} className="underline text-slate-900 font-semibold">
                        {content.company.email}
                      </a>
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>
                      <strong className="text-slate-900">Hours:</strong> {content.company.workingHours}
                    </span>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/${content.company.whatsappNumber}?text=${encodeURIComponent('Hello Mishva Courier, I want to visit your Chandkheda branch / schedule a pickup.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-transform hover:-translate-y-0.5 shadow-md"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Chat on WhatsApp (+91 7623909477)</span>
                  </a>

                  <a
                    href={`tel:${content.company.phoneRaw}`}
                    className="btn-primary px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Direct Call Desk</span>
                  </a>
                </div>
              </div>

              {/* Right Col: Contact Banner Image & Verified Location */}
              <div className="lg:col-span-5 space-y-3">
                <div className="bg-slate-50 rounded-2xl p-4 border-2 border-slate-200 text-center space-y-3">
                  <div className="relative h-28 w-full rounded-xl overflow-hidden border border-slate-200">
                    <Image
                      src="/images/contact-banner.jpg"
                      alt="Mishva Courier Contact Header"
                      fill
                      className="object-contain bg-white"
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-700">
                    Chandkheda Branch Location Verification
                  </p>
                  <a
                    href={COMPANY_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 btn-secondary py-2.5 rounded-xl font-bold text-xs"
                  >
                    <MapPin className="w-4 h-4 text-red-600" />
                    <span>Open in Google Maps (Chandkheda)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
