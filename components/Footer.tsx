'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageCircle, 
  ShieldCheck, 
  Plane, 
  Lock,
  ArrowUp
} from 'lucide-react';
import { COMPANY_INFO, POPULAR_COUNTRIES } from '@/lib/data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="bg-brand-navy text-white pt-16 pb-8 border-t border-blue-900/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-blue-900/60 text-xs sm:text-sm">
          {/* Col 1 & 2: Brand Information */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14 rounded-xl overflow-hidden shadow-md bg-white p-1">
                <Image
                  src="/images/logo.jpg"
                  alt="Mishva International Courier Service"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-extrabold text-xl tracking-tight text-white">
                  MISHVA<span className="text-brand-red">.</span>
                </span>
                <p className="text-[11px] font-bold tracking-widest text-blue-200 uppercase">
                  International Courier Service
                </p>
              </div>
            </Link>

            <p className="text-slate-300 leading-relaxed max-w-sm text-xs">
              Mishva International Courier Service is Ahmedabad&apos;s leading worldwide express logistics provider, specializing in NRI homemade food courier, urgent prescription medicines, university documents, and commercial air cargo to 220+ countries.
            </p>

            <div className="space-y-2 text-xs text-slate-300 pt-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-red shrink-0 mt-0.5" />
                <span>FF, Satyamev Arcade, Nr Satyamev Hospital, Chandkheda, Ahmedabad, Gujarat - 382424</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="hover:text-white font-bold text-white">
                  {COMPANY_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-brand-red shrink-0" />
                <a href={`mailto:${COMPANY_INFO.email}`} className="hover:text-white">
                  {COMPANY_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{COMPANY_INFO.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 3: Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-l-2 border-brand-red pl-2">
              Quick Links
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li>
                <Link href="/#tracking" className="hover:text-white transition-colors">
                  Track Consignment (AWB)
                </Link>
              </li>
              <li>
                <Link href="/#calculator" className="hover:text-white transition-colors">
                  Shipping Cost Calculator
                </Link>
              </li>
              <li>
                <Link href="/#booking" className="hover:text-white transition-colors">
                  Book Doorstep Pickup
                </Link>
              </li>
              <li>
                <Link href="/#food-medicine" className="hover:text-white transition-colors">
                  NRI Food Courier Service
                </Link>
              </li>
              <li>
                <Link href="/#customs-guide" className="hover:text-white transition-colors">
                  Customs Guidelines & KYC
                </Link>
              </li>
              <li>
                <Link href="/admin" className="text-amber-300 hover:text-amber-200 transition-colors flex items-center gap-1 font-semibold">
                  <Lock className="w-3 h-3" /> Admin Management Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Services */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-l-2 border-brand-red pl-2">
              Our Services
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs">
              <li>International Express Air Courier</li>
              <li>Homemade Snacks & Sweets Courier</li>
              <li>Doctor Prescribed Medicines</li>
              <li>University Application & I-20 Packets</li>
              <li>Commercial Air Cargo & Samples</li>
              <li>Excess Baggage & Student Relocation</li>
              <li>Free Export-Grade Packaging</li>
            </ul>
          </div>

          {/* Col 5: Global Destinations */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-xs border-l-2 border-brand-red pl-2">
              Top Country Hubs
            </h4>
            <ul className="space-y-2 text-slate-300 text-xs">
              {POPULAR_COUNTRIES.slice(0, 6).map((c) => (
                <li key={c.countryCode} className="flex items-center gap-1.5">
                  <span>{c.flag}</span>
                  <span>{c.countryName}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            <p>© {new Date().getFullYear()} Mishva International Courier Service. All Rights Reserved.</p>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Chandkheda, Ahmedabad Hub • Registered International Express Courier & Air Cargo Agent.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1"
            >
              <MessageCircle className="w-4 h-4" />
              <span>WhatsApp Direct</span>
            </a>
            <button
              onClick={scrollToTop}
              className="bg-blue-950 hover:bg-blue-900 border border-blue-800 text-white p-2 rounded-lg transition-colors"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
