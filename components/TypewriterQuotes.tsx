'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const QUOTES = [
  {
    text: "Direct Daily Flight Departures from Ahmedabad Hub to 220+ Countries Worldwide.",
    category: "GLOBAL AIR EXPRESS",
  },
  {
    text: "Specialized NRI Homemade Snacks & Sweets with Free Commercial Vacuum Sealing.",
    category: "NRI SPECIALITY",
  },
  {
    text: "Certified Prescription Medicines Delivery with Complete Doctor Rx Customs Clearance.",
    category: "HEALTHCARE LOGISTICS",
  },
  {
    text: "100% Free Doorstep Pickup Across Ahmedabad & Gandhinagar with Digital Electronic Scales.",
    category: "DOORSTEP SERVICE",
  },
  {
    text: "Transparent IATA Volumetric Rates, Real-Time AWB Tracking & Zero Hidden Charges.",
    category: "TRANSPARENT PRICING",
  },
  {
    text: "Export-Grade 5-Ply Corrugated Packaging Ensuring 0% In-Transit Breakage.",
    category: "SECURE PACKAGING",
  }
];

export default function TypewriterQuotes() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(45);

  useEffect(() => {
    const fullText = QUOTES[currentQuoteIndex].text;

    const handleTyping = () => {
      if (!isDeleting) {
        // Typing forward
        setDisplayedText(fullText.substring(0, displayedText.length + 1));

        if (displayedText.length === fullText.length) {
          // Finished typing, pause before deleting
          setTypingSpeed(2800);
          setIsDeleting(true);
        } else {
          setTypingSpeed(38);
        }
      } else {
        // Deleting backward
        setDisplayedText(fullText.substring(0, displayedText.length - 2));

        if (displayedText.length <= 1) {
          // Finished deleting, switch to next quote
          setIsDeleting(false);
          setCurrentQuoteIndex((prev) => (prev + 1) % QUOTES.length);
          setTypingSpeed(450);
        } else {
          setTypingSpeed(18);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, currentQuoteIndex, typingSpeed]);

  const currentCategory = QUOTES[currentQuoteIndex].category;

  return (
    <div className="w-full max-w-2xl py-1">
      {/* Category Tag with Glowing Live Indicator */}
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-red-50 text-red-700 border border-red-200 shadow-xs">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span>{currentCategory}</span>
        </span>
        <span className="text-[11px] text-slate-500 font-semibold hidden sm:inline-flex items-center gap-1">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Mishva Operational Guarantee
        </span>
      </div>

      {/* Pure Type-in Animation - No Box, No Quote Symbol */}
      <div className="min-h-[52px] sm:min-h-[60px] flex items-center">
        <p className="text-base sm:text-lg lg:text-xl font-black text-slate-900 tracking-tight leading-snug">
          {displayedText}
          <span className="inline-block w-1.5 h-5 sm:h-6 ml-1.5 bg-red-600 animate-pulse align-middle" />
        </p>
      </div>
    </div>
  );
}
