'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Phone, Clock, ShieldCheck } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

export default function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('');

  const handleSendCustomMessage = (e: React.FormEvent) => {
    e.preventDefault();
    const text = userMsg.trim() || COMPANY_INFO.whatsappDefaultMsg;
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setUserMsg('');
    setIsOpen(false);
  };

  const handleQuickOption = (topic: string) => {
    let text = "";
    if (topic === 'pickup') {
      text = "Hi Mishva International Courier, I want to book a doorstep pickup from Ahmedabad/Gandhinagar. Please guide me.";
    } else if (topic === 'quote') {
      text = "Hello, I would like to get a shipping rate quote for an international courier parcel. (From Ahmedabad to USA/UK/Canada/UAE).";
    } else if (topic === 'food') {
      text = "Namaste! I want to send homemade Gujarati snacks (Khakhra/Sweets/Farsan) abroad. What is your rate and packing procedure?";
    } else if (topic === 'medicine') {
      text = "Hello, I need to send prescription medicines overseas. Please tell me the required documentation and charges.";
    } else {
      text = COMPANY_INFO.whatsappDefaultMsg;
    }
    window.open(`https://wa.me/${COMPANY_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end pointer-events-auto">
      {/* WhatsApp Chat Popover */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl shadow-2xl bg-slate-900 border border-slate-700 text-white overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          {/* Header */}
          <div className="bg-[#128C7E] text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-white" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-300 border-2 border-[#128C7E] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-bold text-sm tracking-wide">Mishva WhatsApp Desk</h4>
                <p className="text-[10px] text-emerald-100 flex items-center gap-1">
                  <Clock className="w-3 h-3 inline" /> +91 7623909477 • Typically replies in 2 mins
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-black/20 transition-colors"
              aria-label="Close WhatsApp chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-84 overflow-y-auto text-xs bg-[#0b141a]">
            <div className="bg-[#202c33] p-3 rounded-2xl rounded-tl-sm text-slate-200 space-y-1">
              <p className="font-semibold text-white">Namaste! 🙏 Welcome to Mishva International Courier.</p>
              <p className="text-slate-300">
                How can we assist your international delivery today? Choose a quick inquiry or type below:
              </p>
            </div>

            {/* Quick Action Chips */}
            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => handleQuickOption('pickup')}
                className="w-full text-left p-2.5 bg-[#111b21] hover:bg-[#202c33] border border-slate-700/60 rounded-xl transition-all font-medium text-slate-200 flex items-center justify-between group"
              >
                <span>📦 Book Doorstep Pickup in Ahmedabad</span>
                <Send className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button
                onClick={() => handleQuickOption('food')}
                className="w-full text-left p-2.5 bg-[#111b21] hover:bg-[#202c33] border border-slate-700/60 rounded-xl transition-all font-medium text-slate-200 flex items-center justify-between group"
              >
                <span>🍛 NRI Homemade Snacks & Sweets</span>
                <Send className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button
                onClick={() => handleQuickOption('medicine')}
                className="w-full text-left p-2.5 bg-[#111b21] hover:bg-[#202c33] border border-slate-700/60 rounded-xl transition-all font-medium text-slate-200 flex items-center justify-between group"
              >
                <span>💊 Prescription Medicines Delivery</span>
                <Send className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>

              <button
                onClick={() => handleQuickOption('quote')}
                className="w-full text-left p-2.5 bg-[#111b21] hover:bg-[#202c33] border border-slate-700/60 rounded-xl transition-all font-medium text-slate-200 flex items-center justify-between group"
              >
                <span>💰 Get Instant Rate Quotation (USA/UK/UAE)</span>
                <Send className="w-3 h-3 text-slate-500 group-hover:text-emerald-400 transition-colors" />
              </button>
            </div>

            {/* Custom input */}
            <form onSubmit={handleSendCustomMessage} className="pt-2 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message to WhatsApp..."
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                className="flex-1 bg-[#2a3942] border border-slate-700 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-emerald-500 text-white placeholder:text-slate-400"
              />
              <button
                type="submit"
                className="bg-[#00a884] hover:bg-[#029071] text-white p-2 rounded-xl transition-colors shrink-0"
                title="Send via WhatsApp"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating WhatsApp Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border border-white/20"
        aria-label="Open WhatsApp Support"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-400 border border-white"></span>
        </span>
        <MessageCircle className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
}
