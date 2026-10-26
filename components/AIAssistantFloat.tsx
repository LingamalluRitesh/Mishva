'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  X, 
  Send, 
  Sparkles, 
  ArrowRight, 
  Clock, 
  CheckCircle2, 
  Phone,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { COMPANY_INFO } from '@/lib/data';

interface Message {
  id: string;
  sender: 'ai' | 'customer';
  text: string;
  time: string;
  action?: { label: string; tabId?: string; href?: string };
}

export default function AIAssistantFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasAutoOpened, setHasAutoOpened] = useState(false);
  const [unreadCount, setUnreadCount] = useState(1);
  const [isTyping, setIsTyping] = useState(false);
  const [inputVal, setInputVal] = useState('');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      sender: 'ai',
      text: 'Namaste! 🙏 Welcome to Mishva International Courier (Ahmedabad Hub).\n\nI am your 24/7 AI Logistics Assistant. Ask me anything about:\n• 🍛 Sending homemade Gujarati snacks (Khakhra/Sweets)\n• 💊 Prescription medicine shipping to USA/UK/Canada\n• 💰 Shipping rates & volumetric calculator\n• 📦 Free doorstep pickup in Ahmedabad\n\nHow can I help your delivery today?',
      time: 'Just now',
    }
  ]);

  const QUICK_PROMPTS = [
    'How much for 10kg food box to USA?',
    'Can I send Khakhra & Sweets to UK?',
    'What documents are needed for Medicines?',
    'Book doorstep pickup in Ahmedabad',
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasAutoOpened) {
        setUnreadCount(1);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [hasAutoOpened]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      setHasAutoOpened(true);
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isOpen, messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputVal).trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'customer',
      text: query,
      time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let replyText = '';
      let replyAction: { label: string; tabId?: string; href?: string } | undefined;

      if (lower.includes('food') || lower.includes('khakhra') || lower.includes('sweet') || lower.includes('snack') || lower.includes('pickle') || lower.includes('fafda') || lower.includes('thepla')) {
        replyText = '✅ 100% Permitted! You can easily send homemade Khakhra, Fafda, Sweets, Thepla, and Spices to USA, UK, Canada, Australia, and UAE.\n\nAt our Chandkheda hub, we provide free commercial vacuum heat-sealing and US FDA / UK HMRC compliant declarations so your box arrives fresh without customs delays!';
        replyAction = { label: 'Open Doorstep Pickup Tool', tabId: 'pickup' };
      } else if (lower.includes('medicine') || lower.includes('doctor') || lower.includes('rx') || lower.includes('tablet')) {
        replyText = '💊 For Prescription Medicines: You need: 1) Doctor\'s written prescription, 2) Original pharmacy tax bill matching batch numbers, and 3) Patient\'s Aadhaar or Passport copy. We handle international health customs clearance for USA, UK, Canada, and Australia.';
        replyAction = { label: 'View Medicine Guide', tabId: 'guide' };
      } else if (lower.includes('rate') || lower.includes('price') || lower.includes('cost') || lower.includes('10kg') || lower.includes('usa') || lower.includes('uk') || lower.includes('canada')) {
        replyText = '💰 Indicative Doorstep-to-Doorstep Rates from Ahmedabad:\n• USA: Base ₹1,650 (First 500g) + ₹450 / addl 500g. A 10kg box is approx ₹9,500 - ₹10,200 with free pickup & export packing.\n• UK: Base ₹1,450 + ₹380 / 500g\n• Canada: Base ₹1,750 + ₹480 / 500g\n• UAE/Dubai: Base ₹950 + ₹260 / 500g';
        replyAction = { label: 'Open Rate Calculator', tabId: 'calculator' };
      } else if (lower.includes('pickup') || lower.includes('book') || lower.includes('home') || lower.includes('ahmedabad') || lower.includes('chandkheda')) {
        replyText = '📦 We provide 100% FREE Doorstep Pickup across Ahmedabad (Chandkheda, Motera, Sabarmati, Satellite, Vastrapur, Maninagar, etc.) and Gandhinagar. Our vehicle carries an electronic weight scale and export carton packaging.';
        replyAction = { label: 'Launch Booking Form', tabId: 'pickup' };
      } else if (lower.includes('track') || lower.includes('awb') || lower.includes('status')) {
        replyText = '🔍 To track your consignment, enter your AWB number (e.g. MIC-892341-IN) in our Live Tracking Tool. You can also view live cargo flights on our Live Radar!';
        replyAction = { label: 'Open Consignment Tracker', tabId: 'track' };
      } else {
        replyText = `Thank you for reaching out! Our Chandkheda logistics support desk is active right now. You can talk to a live specialist directly on WhatsApp or call us at +91 7623909477.`;
        replyAction = { label: 'Chat on WhatsApp with Team', href: `https://wa.me/${COMPANY_INFO.whatsappNumber}` };
      }

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        action: replyAction,
      };

      setIsTyping(false);
      setMessages((prev) => [...prev, aiReply]);
    }, 700);
  };

  const handleActionClick = (action: { label: string; tabId?: string; href?: string }) => {
    setIsOpen(false);
    if (action.tabId) {
      // Dispatch custom event to switch active feature on homepage
      window.dispatchEvent(new CustomEvent('mishva-switch-tab', { detail: { tabId: action.tabId } }));
      const el = document.getElementById('operations-deck');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (action.href) {
      window.open(action.href, '_blank');
    }
  };

  return (
    /* Placed cleanly at bottom-6 left-6 so it NEVER overlays WhatsApp (which is at bottom-6 right-6) */
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start pointer-events-auto">
      {/* Expanded AI Chat Box */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 rounded-2xl shadow-2xl bg-white border-2 border-slate-200 text-slate-900 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200 flex flex-col max-h-[500px]">
          {/* Header */}
          <div className="bg-[#0B1528] p-4 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-amber-500 flex items-center justify-center text-white shadow-md">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-900 rounded-full"></span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-extrabold text-sm tracking-wide text-white">Mishva AI Assistant</h4>
                  <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                    24/7 Live
                  </span>
                </div>
                <p className="text-[10px] text-slate-300">
                  Instant Auto-Reply & Logistics Support
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Close Assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="p-4 overflow-y-auto flex-1 space-y-3 text-xs bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'customer' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-xl max-w-[85%] leading-relaxed whitespace-pre-line shadow-xs ${
                    m.sender === 'customer'
                      ? 'bg-red-600 text-white font-medium rounded-tr-xs'
                      : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs font-medium'
                  }`}
                >
                  <p>{m.text}</p>
                  {m.action && (
                    <button
                      type="button"
                      onClick={() => handleActionClick(m.action!)}
                      className="mt-2.5 inline-flex items-center gap-1.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold px-3 py-1.5 rounded-lg text-[11px] transition-colors cursor-pointer shadow-sm"
                    >
                      <span>{m.action.label}</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
                <span className="text-[9px] text-slate-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-3 py-1.5 rounded-xl w-fit text-slate-600 text-xs shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce delay-100"></span>
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-bounce delay-200"></span>
                <span className="text-[10px] ml-1 text-slate-600 font-semibold">AI auto-replying...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          <div className="p-2 bg-slate-100 border-t border-slate-200 overflow-x-auto flex gap-1.5 no-scrollbar">
            {QUICK_PROMPTS.map((prompt, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleSendMessage(prompt)}
                className="whitespace-nowrap px-2.5 py-1 rounded-lg bg-white hover:bg-slate-200 border border-slate-300 text-[10px] text-slate-700 font-semibold transition-colors cursor-pointer"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-2.5 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask anything (e.g. 10kg rate to USA...)"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 font-medium"
            />
            <button
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-white p-2.5 rounded-xl transition-colors shrink-0 cursor-pointer"
              title="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Floating AI Button at Bottom-Left with Live Pulse */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative bg-[#0B1528] hover:bg-[#1E293B] text-white p-3.5 rounded-full shadow-2xl flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 border-2 border-white cursor-pointer"
          aria-label="Open AI Assistant"
          title="Mishva AI Assistant (24/7 Auto-Reply)"
        >
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-400 text-slate-950 font-black text-[9px] items-center justify-center border border-slate-950">
                1
              </span>
            </span>
          )}
          <Bot className="w-6 h-6 text-amber-300" />
        </button>

        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="hidden sm:flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-800 px-3.5 py-2 rounded-full border-2 border-slate-200 shadow-xl text-xs font-extrabold transition-all cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
            <span>AI Assistant 24/7</span>
          </button>
        )}
      </div>
    </div>
  );
}
