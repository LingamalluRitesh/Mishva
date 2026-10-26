'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, 
  X, 
  Search, 
  Calculator, 
  Truck, 
  User, 
  Radio, 
  FileText, 
  Layers
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tabId: string) => {
    setMobileMenuOpen(false);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('mishva-switch-tab', { detail: { tabId } }));
      const el = document.getElementById('operations-deck');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full shadow-xs">
      {/* Main Crisp White Navigation Bar (Top phone bar removed per user request) */}
      <nav className="bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Brand Logo with fixed dimensions */}
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="relative w-14 h-14 rounded-2xl overflow-hidden shadow-sm border border-slate-200 bg-white flex items-center justify-center p-0.5 group-hover:scale-105 transition-transform duration-300 shrink-0">
                <Image
                  src="/images/logo.jpg"
                  alt="Mishva International Courier Service"
                  width={56}
                  height={56}
                  className="w-full h-full object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl sm:text-2xl tracking-tight text-slate-900 leading-none">
                  MISHVA<span className="text-red-600">.</span>
                </span>
                <span className="text-[10px] sm:text-xs font-black tracking-widest text-slate-700 uppercase mt-0.5">
                  International Courier Service
                </span>
                <span className="text-[9px] text-slate-500 font-semibold hidden sm:block">
                  Chandkheda, Ahmedabad Hub • Global Air Express
                </span>
              </div>
            </Link>

            {/* Desktop On-Demand Action Links in Crisp Dark Text */}
            <div className="hidden lg:flex items-center space-x-1 font-bold text-xs xl:text-sm text-slate-700">
              <button 
                type="button"
                onClick={() => handleNavClick('track')}
                className="px-3 py-2 rounded-xl hover:text-red-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Search className="w-3.5 h-3.5 text-red-600" />
                <span>Track AWB</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('calculator')}
                className="px-3 py-2 rounded-xl hover:text-blue-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-blue-600" />
                <span>Rate Calculator</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('services')}
                className="px-3 py-2 rounded-xl hover:text-amber-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-amber-600" />
                <span>Services</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('radar')}
                className="px-3 py-2 rounded-xl hover:text-purple-600 hover:bg-slate-100 transition-colors flex items-center gap-1 cursor-pointer"
              >
                <Radio className="w-3.5 h-3.5 text-purple-600" />
                <span>Live Radar</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('orders')}
                className="px-3 py-2 rounded-xl hover:text-emerald-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-emerald-700 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-emerald-600" />
                <span>Previous Orders</span>
              </button>

              <button 
                type="button"
                onClick={() => handleNavClick('invoice')}
                className="px-3 py-2 rounded-xl hover:text-cyan-600 hover:bg-slate-100 transition-colors flex items-center gap-1 text-slate-700 cursor-pointer"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-600" />
                <span>Customs Invoice</span>
              </button>
            </div>

            {/* Customer Login & Action Buttons (NO ADMIN SWITCHING ON PUBLIC SITE) */}
            <div className="hidden sm:flex items-center space-x-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all"
              >
                <User className="w-3.5 h-3.5 text-amber-500" />
                <span>Customer Login</span>
              </Link>

              <button
                type="button"
                onClick={() => handleNavClick('pickup')}
                className="btn-primary inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm cursor-pointer"
              >
                <Truck className="w-4 h-4" />
                <span>Book Pickup</span>
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 focus:outline-none"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-2xl animate-in slide-in-from-top-2">
            <div className="grid grid-cols-1 gap-1 text-slate-800 font-bold text-xs">
              <button
                type="button"
                onClick={() => handleNavClick('track')}
                className="w-full text-left flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100"
              >
                <Search className="w-4 h-4 text-red-600" />
                <span>Track Consignment</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('calculator')}
                className="w-full text-left flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100"
              >
                <Calculator className="w-4 h-4 text-blue-600" />
                <span>Rate & Volumetric Calculator</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('orders')}
                className="w-full text-left flex items-center gap-2 p-3 rounded-xl bg-emerald-50 text-emerald-800 font-bold border border-emerald-200"
              >
                <User className="w-4 h-4 text-emerald-600" />
                <span>My Previous Orders & Invoices</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('radar')}
                className="w-full text-left flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100"
              >
                <Radio className="w-4 h-4 text-purple-600" />
                <span>Live Cargo Flight Radar</span>
              </button>

              <button
                type="button"
                onClick={() => handleNavClick('invoice')}
                className="w-full text-left flex items-center gap-2 p-3 rounded-xl hover:bg-slate-100"
              >
                <FileText className="w-4 h-4 text-cyan-600" />
                <span>Customs Proforma Invoice Tool</span>
              </button>

              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 font-bold"
              >
                <User className="w-4 h-4 text-amber-500" />
                <span>Customer Sign In</span>
              </Link>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => handleNavClick('pickup')}
                className="w-full block text-center btn-primary py-3 rounded-xl font-bold cursor-pointer"
              >
                Book Doorstep Pickup Now
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
