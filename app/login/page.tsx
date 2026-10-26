'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Lock, 
  Phone, 
  Mail, 
  ArrowRight, 
  ShieldCheck, 
  Package, 
  CheckCircle2, 
  AlertCircle,
  Truck,
  Sparkles
} from 'lucide-react';
import { COMPANY_INFO, INITIAL_CUSTOMERS } from '@/lib/data';

export default function CustomerLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('+91 98250 11422');
  const [password, setPassword] = useState('password123');
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage('');

    setTimeout(() => {
      // Allow any phone or email or demo account
      if (identifier) {
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/#customer-portal');
        }, 800);
      } else {
        setErrorMessage('Please enter a valid phone number or email.');
      }
      setLoading(false);
    }, 600);
  };

  const handleQuickDemoCustomer = () => {
    setIdentifier('+91 98250 11422');
    setPassword('demo123');
    setIsSuccess(true);
    setTimeout(() => {
      router.push('/#customer-portal');
    }, 700);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
      {/* 4K Glass Glowing Spheres */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-md w-full glass-4k rounded-3xl overflow-hidden border border-white/20 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Top Header */}
        <div className="p-8 text-center border-b border-white/10 bg-gradient-to-b from-slate-900/80 to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-white p-1 mx-auto mb-3 shadow-xl relative">
            <Image
              src="/images/logo.jpg"
              alt="Mishva International Courier Service"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
            Customer Portal Sign In
          </h2>
          <p className="text-xs text-blue-200 mt-1">
            Access your past international consignments, tax receipts & book doorstep pickups.
          </p>
        </div>

        {/* Form Body */}
        <div className="p-8 space-y-5">
          {errorMessage && (
            <div className="p-3 bg-red-950/70 border border-red-500/40 rounded-xl text-xs text-red-300 font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {isSuccess ? (
            <div className="text-center py-6 space-y-3">
              <div className="w-14 h-14 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <p className="font-bold text-white text-sm">Signed In Successfully!</p>
              <p className="text-xs text-slate-400">Redirecting to your orders dashboard...</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Mobile Number or Email
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    placeholder="+91 98250 XXXXX"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Password / OTP
                  </label>
                  <span className="text-[11px] text-amber-300 hover:underline cursor-pointer">
                    Forgot?
                  </span>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-900/90 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-red-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/30 transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span>Signing In...</span>
                ) : (
                  <>
                    <span>Sign In to Customer Dashboard</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleQuickDemoCustomer}
                  className="w-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 py-2.5 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>1-Click Demo Customer Login (Bhavin Patel)</span>
                </button>
              </div>

              <div className="pt-3 text-center border-t border-white/10">
                <Link
                  href="/"
                  className="text-xs text-slate-400 hover:text-white transition-colors"
                >
                  ← Return to Public Website
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
