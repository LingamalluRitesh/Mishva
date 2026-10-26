'use client';

import React, { useState } from 'react';
import { 
  Bot, 
  Sparkles, 
  Send, 
  HelpCircle, 
  MessageSquare, 
  ArrowRight, 
  ShieldCheck, 
  CheckCircle2,
  X,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface Message {
  sender: 'ai' | 'user';
  text: string;
  actionLink?: { label: string; href: string };
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      text: 'Namaste! 🙏 I am Mishva AI Logistics Assistant. Ask me anything about international courier rates, customs guidelines for food/medicines, or delivery schedules from Ahmedabad to 220+ countries.',
    },
  ]);

  const QUICK_QUESTIONS = [
    'Can I send Khakhra & Pickles to USA?',
    'What documents are needed for Medicines to UK?',
    'How much for 10kg box to Canada?',
    'How fast does express parcel reach Dubai?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    // Add user message
    const newMessages: Message[] = [...messages, { sender: 'user', text: query }];
    setMessages(newMessages);
    setInput('');

    // Process AI response
    setTimeout(() => {
      const lower = query.toLowerCase();
      let reply: Message;

      if (lower.includes('food') || lower.includes('khakhra') || lower.includes('pickle') || lower.includes('thepla') || lower.includes('snack') || lower.includes('sweet')) {
        reply = {
          sender: 'ai',
          text: '✅ YES! You can safely send Khakhra, Fafda, Ganthiya, Sweets, and Homemade Pickles. At Mishva Courier Chandkheda, we provide commercial multi-layer vacuum sealing to prevent leakage and guarantee compliance with US FDA, UK HMRC, and Canadian CFIA customs norms.',
          actionLink: { label: 'Book Food Courier Pickup', href: '#booking' },
        };
      } else if (lower.includes('medicine') || lower.includes('doctor') || lower.includes('rx') || lower.includes('prescription')) {
        reply = {
          sender: 'ai',
          text: '💊 To send prescription medicines to the USA, UK, Canada, or Australia, you need: 1) Original Doctor\'s prescription with diagnosis, 2) Pharmacy tax invoice matching batch numbers, and 3) Patient\'s Aadhaar/Passport copy. We handle the complete customs health declaration for you.',
          actionLink: { label: 'Inquire Medicine Courier', href: '#food-medicine' },
        };
      } else if (lower.includes('rate') || lower.includes('price') || lower.includes('cost') || lower.includes('10kg') || lower.includes('canada') || lower.includes('usa')) {
        reply = {
          sender: 'ai',
          text: '💰 Indicative Express Rates from Ahmedabad: \n• USA: ~₹1,650 for first 500g (+₹450/addl 500g). A 10kg box is approx ₹9,500 - ₹10,200 including free doorstep pickup and 5-ply export box.\n• UK: ~₹1,450 base rate\n• Canada: ~₹1,750 base rate\n• UAE/Dubai: ~₹950 base rate.',
          actionLink: { label: 'Open Rate Calculator', href: '#calculator' },
        };
      } else if (lower.includes('dubai') || lower.includes('uae') || lower.includes('time') || lower.includes('fast') || lower.includes('transit')) {
        reply = {
          sender: 'ai',
          text: '⚡ Dubai/UAE deliveries take just 1 to 3 business days! We have daily direct flight cargo departures from Ahmedabad SVPI Airport (AMD) directly into Dubai International (DXB).',
          actionLink: { label: 'Book Immediate Pickup', href: '#booking' },
        };
      } else if (lower.includes('student') || lower.includes('university') || lower.includes('transcript') || lower.includes('i20')) {
        reply = {
          sender: 'ai',
          text: '🎓 We offer a flat 20% Student Discount for university application packets, WES evaluation transcripts, and I-20 originals. Packaged inside heavy tamper-evident waterproof sleeves.',
          actionLink: { label: 'Book Student Express', href: '#booking' },
        };
      } else {
        reply = {
          sender: 'ai',
          text: `Thank you for your question! For custom parcels or bulk export shipments, our Chandkheda operations team is available right now on WhatsApp at +91 7623909477 or call us directly.`,
          actionLink: { label: 'Chat with Specialist on WhatsApp', href: `https://wa.me/${COMPANY_INFO.whatsappNumber}` },
        };
      }

      setMessages((prev) => [...prev, reply]);
    }, 600);
  };

  return (
    <div id="ai-assistant" className="w-full">
      <div className="bg-gradient-to-br from-blue-950 via-brand-navy to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-blue-800 relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-red to-amber-400 flex items-center justify-center text-white shadow-lg">
              <Bot className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight">
                  Mishva AI Logistics & Customs Assistant
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                  Online 24/7
                </span>
              </div>
              <p className="text-xs text-blue-200">
                Trained on international customs regulations, IATA air cargo rules, and Gujarat export protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Chat History Box */}
        <div className="bg-slate-900/80 rounded-2xl border border-blue-900/60 p-4 sm:p-6 space-y-4 max-h-80 overflow-y-auto text-xs">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-brand-red text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                  AI
                </div>
              )}
              <div
                className={`p-3.5 rounded-2xl max-w-lg leading-relaxed whitespace-pre-line ${
                  m.sender === 'user'
                    ? 'bg-brand-red text-white font-medium rounded-tr-xs'
                    : 'bg-blue-950/80 border border-blue-800/60 text-slate-200 rounded-tl-xs'
                }`}
              >
                {m.text}
                {m.actionLink && (
                  <div className="mt-2.5 pt-2 border-t border-white/10">
                    <a
                      href={m.actionLink.href}
                      className="inline-flex items-center gap-1 bg-amber-400 hover:bg-amber-300 text-slate-950 px-3 py-1.5 rounded-lg font-bold text-[11px] transition-colors"
                    >
                      <span>{m.actionLink.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Suggested Quick Question Chips */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] text-slate-400 font-medium">Try asking:</span>
          {QUICK_QUESTIONS.map((q, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleSend(q)}
              className="bg-white/10 hover:bg-white/20 text-slate-200 hover:text-white border border-white/10 px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="mt-4 flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Ask about food packing, medicines, rate calculations, or custom duties..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 p-3 bg-slate-900 border border-blue-800/80 rounded-xl text-xs text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-red"
          />
          <button
            type="submit"
            className="bg-brand-red hover:bg-brand-crimson text-white px-5 py-3 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-500/20 transition-all"
          >
            <span>Ask AI</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
