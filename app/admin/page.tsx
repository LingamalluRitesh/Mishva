'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Package, 
  Truck, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Printer, 
  Share2, 
  DollarSign, 
  Users, 
  Globe, 
  AlertCircle, 
  Lock, 
  LogOut, 
  Eye, 
  Edit3, 
  Calendar,
  Plane,
  X,
  Phone,
  ArrowRight,
  ShieldCheck,
  RefreshCw,
  Sliders,
  Save,
  Check,
  Sparkles
} from 'lucide-react';
import { Shipment, PickupRequest, ShipmentStatus, SiteContent, CountryRate } from '@/lib/types';
import { COMPANY_INFO, POPULAR_COUNTRIES, DEFAULT_SITE_CONTENT } from '@/lib/data';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginEmail, setLoginEmail] = useState('admin@mishva.com');
  const [loginPassword, setLoginPassword] = useState('mishva@admin2026');
  const [loginError, setLoginError] = useState('');

  // Active navigation tab
  const [activeTab, setActiveTab] = useState<'dashboard' | 'shipments' | 'pickups' | 'cms' | 'rates'>('dashboard');

  // Data states
  const [shipments, setShipments] = useState<Shipment[]>([]);
  const [pickups, setPickups] = useState<PickupRequest[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent>(DEFAULT_SITE_CONTENT);
  const [loading, setLoading] = useState(false);
  const [cmsSavedMessage, setCmsSavedMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [labelModalOpen, setLabelModalOpen] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null);

  // New Shipment Form State
  const [newAwb, setNewAwb] = useState('');
  const [newSenderName, setNewSenderName] = useState('');
  const [newSenderPhone, setNewSenderPhone] = useState('');
  const [newSenderAddress, setNewSenderAddress] = useState('Chandkheda, Ahmedabad');
  const [newReceiverName, setNewReceiverName] = useState('');
  const [newReceiverPhone, setNewReceiverPhone] = useState('');
  const [newReceiverCountry, setNewReceiverCountry] = useState('United States (USA)');
  const [newReceiverCity, setNewReceiverCity] = useState('');
  const [newReceiverAddress, setNewReceiverAddress] = useState('');
  const [newServiceType, setNewServiceType] = useState('Express International');
  const [newCategory, setNewCategory] = useState('Homemade Gujarati Snacks');
  const [newWeight, setNewWeight] = useState<number>(5.0);
  const [newDeclaredValue, setNewDeclaredValue] = useState<number>(7500);
  const [newCarrier, setNewCarrier] = useState('Mishva Express');
  const [newPaymentStatus, setNewPaymentStatus] = useState<'Paid' | 'Pending' | 'COD / Pay on Pickup'>('Paid');
  const [newAmount, setNewAmount] = useState<number>(3650);

  // Update Status Form State
  const [newStatus, setNewStatus] = useState<ShipmentStatus>('In Transit');
  const [newLocation, setNewLocation] = useState('');
  const [newDescription, setNewDescription] = useState('');

  // Fetch initial data
  const fetchData = async () => {
    setLoading(true);
    try {
      const [resShipments, resPickups, resContent] = await Promise.all([
        fetch('/api/shipments'),
        fetch('/api/pickups'),
        fetch('/api/site-content')
      ]);
      const dataShipments = await resShipments.json();
      const dataPickups = await resPickups.json();
      const dataContent = await resContent.json();

      if (dataShipments.success) setShipments(dataShipments.shipments || []);
      if (dataPickups.success) setPickups(dataPickups.pickups || []);
      if (dataContent.success && dataContent.content) setSiteContent(dataContent.content);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      loginEmail === 'admin@mishva.com' && 
      (loginPassword === 'mishva@admin2026' || loginPassword === 'mishva2026' || loginPassword === 'admin123' || loginPassword === '7623')
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid admin credentials. Use admin@mishva.com / mishva@admin2026');
    }
  };

  const handleQuickDemoLogin = () => {
    setIsAuthenticated(true);
  };

  // Save Website CMS Changes
  const handleSaveCMS = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/site-content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(siteContent),
      });
      const data = await res.json();
      if (data.success) {
        setCmsSavedMessage(true);
        setTimeout(() => setCmsSavedMessage(false), 3500);
      }
    } catch (err) {
      console.error(err);
      alert('Error updating site content');
    }
  };

  const handleOpenCreateModal = () => {
    const awb = `MIC-${Math.floor(100000 + Math.random() * 900000)}-IN`;
    setNewAwb(awb);
    setCreateModalOpen(true);
  };

  const handleCreateShipment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        awb: newAwb,
        senderName: newSenderName,
        senderPhone: newSenderPhone,
        senderCity: 'Ahmedabad, Gujarat',
        senderAddress: newSenderAddress,
        receiverName: newReceiverName,
        receiverPhone: newReceiverPhone,
        receiverCountry: newReceiverCountry,
        receiverCity: newReceiverCity,
        receiverAddress: newReceiverAddress,
        serviceType: newServiceType,
        category: newCategory,
        weightKg: Number(newWeight),
        chargeableWeightKg: Number(newWeight),
        declaredValue: Number(newDeclaredValue),
        currency: 'INR',
        bookingDate: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
        estimatedDelivery: 'In 3-5 Days',
        currentStatus: 'Booked',
        currentLocation: 'Chandkheda Central Hub, Ahmedabad',
        carrierPartner: newCarrier,
        flightNo: 'Scheduled Flight Consolidation',
        paymentStatus: newPaymentStatus,
        paymentAmount: Number(newAmount),
        paymentMethod: newPaymentStatus === 'Paid' ? 'Online Gateway' : 'Pay on Pickup',
      };

      const res = await fetch('/api/shipments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setCreateModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert('Error creating shipment');
    }
  };

  const handleOpenUpdateModal = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setNewStatus(shipment.currentStatus);
    setNewLocation(shipment.currentLocation);
    setNewDescription(`Updated to ${shipment.currentStatus}`);
    setUpdateModalOpen(true);
  };

  const handleSaveStatusUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedShipment) return;

    const newCheckpoint = {
      id: `cp-${Date.now()}`,
      status: newStatus,
      location: newLocation,
      timestamp: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      description: newDescription || `Consignment checkpoint: ${newStatus}`,
      completed: true,
    };

    const updatedShipment: Shipment = {
      ...selectedShipment,
      currentStatus: newStatus,
      currentLocation: newLocation,
      checkpoints: [...selectedShipment.checkpoints, newCheckpoint],
    };

    try {
      const res = await fetch('/api/shipments', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedShipment),
      });
      const data = await res.json();
      if (data.success) {
        setUpdateModalOpen(false);
        fetchData();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  const handleUpdatePickupStatus = async (pickup: PickupRequest, status: any) => {
    try {
      const updated = { ...pickup, status };
      const res = await fetch('/api/pickups', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      const data = await res.json();
      if (data.success) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleOpenPrintLabel = (shipment: Shipment) => {
    setSelectedShipment(shipment);
    setLabelModalOpen(true);
  };

  // Metrics
  const totalShipments = shipments.length;
  const inTransitCount = shipments.filter(s => s.currentStatus === 'In Transit' || s.currentStatus.includes('Customs')).length;
  const deliveredCount = shipments.filter(s => s.currentStatus === 'Delivered').length;
  const pendingPickupsCount = pickups.filter(p => p.status === 'Pending').length;
  const totalRevenue = shipments.reduce((acc, s) => acc + (s.paymentAmount || 0), 0);

  // Filtered shipments
  const filteredShipments = shipments.filter(s => {
    const matchesSearch = 
      s.awb.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.receiverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.receiverCountry.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (statusFilter === 'ALL') return matchesSearch;
    return matchesSearch && s.currentStatus === statusFilter;
  });

  /* View: Login Screen if not authenticated */
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center p-4 relative overflow-hidden">
        {/* Glow Spheres */}
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-red-600/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-md w-full glass-4k rounded-3xl shadow-2xl overflow-hidden border border-white/20 relative z-10 animate-in fade-in">
          <div className="bg-gradient-to-r from-brand-navy to-slate-900 text-white p-8 text-center border-b border-white/10">
            <div className="w-16 h-16 rounded-2xl bg-white p-1 mx-auto mb-3 shadow-xl relative">
              <Image
                src="/images/logo.jpg"
                alt="Mishva Logo"
                fill
                className="object-contain"
              />
            </div>
            <h2 className="text-xl font-black tracking-tight">Mishva Operations Central</h2>
            <p className="text-xs text-amber-300 mt-1 uppercase tracking-widest font-black">
              Restricted Admin Authentication
            </p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-4">
            {loginError && (
              <div className="p-3 bg-red-950/70 border border-red-500/40 rounded-xl text-xs text-red-300 font-semibold flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Master Email
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full p-3 bg-slate-900/90 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Admin Master PIN / Password
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full p-3 bg-slate-900/90 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-brand-red to-brand-crimson hover:from-red-600 hover:to-red-700 text-white py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-lg shadow-red-500/30 transition-all"
            >
              Authenticate & Access Control
            </button>

            <div className="pt-2">
              <button
                type="button"
                onClick={handleQuickDemoLogin}
                className="w-full bg-white/5 hover:bg-white/10 border border-white/15 text-slate-200 py-2.5 rounded-xl text-xs font-bold transition-colors"
              >
                ⚡ 1-Click Master Access (mishva@admin2026)
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col">
      {/* Top Admin Bar */}
      <header className="glass-4k sticky top-0 z-40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo & Portal title */}
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-white p-0.5 shadow-md">
                <Image
                  src="/images/logo.jpg"
                  alt="Mishva"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="font-black text-sm sm:text-base leading-tight">
                  MISHVA <span className="text-brand-red">ADMIN CONTROL</span>
                </h1>
                <p className="text-[10px] text-blue-200">Chandkheda Hub & Live Website CMS</p>
              </div>
            </div>

            {/* Nav Tabs */}
            <div className="hidden lg:flex items-center space-x-1 text-xs font-bold">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: Globe },
                { id: 'cms', label: 'Live Website CMS (Change Everything)', icon: Sliders, highlight: true },
                { id: 'shipments', label: `Shipments (${shipments.length})`, icon: Package },
                { id: 'pickups', label: `Pickups (${pickups.length})`, icon: Truck },
                { id: 'rates', label: 'Rates & Tariffs', icon: DollarSign },
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-3 py-2 rounded-xl flex items-center gap-1.5 transition-all ${
                      activeTab === tab.id
                        ? 'bg-brand-red text-white shadow-lg shadow-red-500/25'
                        : tab.highlight
                        ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 hover:bg-amber-400/30'
                        : 'text-slate-300 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={fetchData}
                className="p-2 rounded-xl bg-white/5 text-blue-200 hover:text-white border border-white/10 transition-colors"
                title="Refresh Data"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>

              <Link
                href="/"
                target="_blank"
                className="hidden sm:flex items-center gap-1 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-colors border border-white/10"
              >
                <span>View Live Site</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <button
                onClick={() => setIsAuthenticated(false)}
                className="p-2 rounded-xl bg-red-600/20 text-red-300 hover:bg-red-600 hover:text-white transition-colors border border-red-500/30"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* VIEW: LIVE WEBSITE CMS & CONTENT EDITOR */}
        {activeTab === 'cms' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="glass-4k rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-400/20 text-amber-300 border border-amber-400/40 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Real-Time Website Control System</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Website CMS & Live Content Editor
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Change company details, emergency notice banner, hero titles, per-KG rates, and services instantly on the live website!
                </p>
              </div>

              {cmsSavedMessage && (
                <div className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <Check className="w-4 h-4" />
                  <span>Website Updated Successfully!</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSaveCMS} className="space-y-6">
              {/* Section 1: Header Notice Strip */}
              <div className="glass-4k rounded-3xl p-6 border border-white/10 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <h4 className="font-black text-sm uppercase tracking-wider text-amber-300">
                    1. Header Top Announcement Bar
                  </h4>
                  <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                    <input
                      type="checkbox"
                      checked={siteContent.company.noticeBarEnabled}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          company: { ...siteContent.company, noticeBarEnabled: e.target.checked }
                        })
                      }
                      className="accent-brand-red w-4 h-4 rounded cursor-pointer"
                    />
                    <span>Enable Announcement Strip</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Announcement Banner Text (Appears at top of public site)
                  </label>
                  <input
                    type="text"
                    value={siteContent.company.noticeBarText}
                    onChange={(e) =>
                      setSiteContent({
                        ...siteContent,
                        company: { ...siteContent.company, noticeBarText: e.target.value }
                      })
                    }
                    className="w-full p-3 bg-slate-900 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-brand-red"
                  />
                </div>
              </div>

              {/* Section 2: Company Contact Details */}
              <div className="glass-4k rounded-3xl p-6 border border-white/10 space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-amber-300 pb-3 border-b border-white/10">
                  2. Company & Chandkheda Hub Details
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Company Official Name</label>
                    <input
                      type="text"
                      value={siteContent.company.name}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          company: { ...siteContent.company, name: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Direct Phone Helpline</label>
                    <input
                      type="text"
                      value={siteContent.company.phone}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          company: { ...siteContent.company, phone: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      value={siteContent.company.email}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          company: { ...siteContent.company, email: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block font-semibold text-slate-300 mb-1">Chandkheda Hub Physical Address</label>
                    <input
                      type="text"
                      value={siteContent.company.address}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          company: { ...siteContent.company, address: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">WhatsApp Number (e.g. 917623909477)</label>
                    <input
                      type="text"
                      value={siteContent.company.whatsappNumber}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          company: { ...siteContent.company, whatsappNumber: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Hero Section Headlines */}
              <div className="glass-4k rounded-3xl p-6 border border-white/10 space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-amber-300 pb-3 border-b border-white/10">
                  3. Hero Section Headlines & Copy
                </h4>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Hero Pill Badge</label>
                    <input
                      type="text"
                      value={siteContent.hero.badgeText}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, badgeText: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Main Heading Part 1</label>
                      <input
                        type="text"
                        value={siteContent.hero.headingMain}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, headingMain: e.target.value }
                          })
                        }
                        className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-300 mb-1">Highlighted Heading Text (Red)</label>
                      <input
                        type="text"
                        value={siteContent.hero.headingHighlight}
                        onChange={(e) =>
                          setSiteContent({
                            ...siteContent,
                            hero: { ...siteContent.hero, headingHighlight: e.target.value }
                          })
                        }
                        className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold text-brand-red"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Subheading Paragraph</label>
                    <textarea
                      rows={3}
                      value={siteContent.hero.subheading}
                      onChange={(e) =>
                        setSiteContent({
                          ...siteContent,
                          hero: { ...siteContent.hero, subheading: e.target.value }
                        })
                      }
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                    />
                  </div>
                </div>
              </div>

              {/* Section 4: Country Shipping Rates Editor */}
              <div className="glass-4k rounded-3xl p-6 border border-white/10 space-y-4">
                <h4 className="font-black text-sm uppercase tracking-wider text-amber-300 pb-3 border-b border-white/10">
                  4. International Tariff Rates Master (USA, UK, Canada, UAE, etc.)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                  {siteContent.rates.map((rate, idx) => (
                    <div key={rate.countryCode} className="bg-slate-900/90 border border-white/10 p-4 rounded-2xl space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{rate.flag}</span>
                        <strong className="text-white text-xs truncate">{rate.countryName}</strong>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div>
                          <label className="text-[10px] text-slate-400 block">Base Rate First 500g (₹)</label>
                          <input
                            type="number"
                            value={rate.baseRateFirst500g}
                            onChange={(e) => {
                              const updatedRates = [...siteContent.rates];
                              updatedRates[idx] = { ...rate, baseRateFirst500g: Number(e.target.value) };
                              setSiteContent({ ...siteContent, rates: updatedRates });
                            }}
                            className="w-full p-2 bg-slate-950 border border-white/20 rounded-lg font-mono font-bold"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-slate-400 block">Per Addl 500g (₹)</label>
                          <input
                            type="number"
                            value={rate.perAdditional500g}
                            onChange={(e) => {
                              const updatedRates = [...siteContent.rates];
                              updatedRates[idx] = { ...rate, perAdditional500g: Number(e.target.value) };
                              setSiteContent({ ...siteContent, rates: updatedRates });
                            }}
                            className="w-full p-2 bg-slate-950 border border-white/20 rounded-lg font-mono font-bold"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Save Button */}
              <div className="sticky bottom-4 z-20">
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-wider shadow-2xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5 active:scale-98"
                >
                  <Save className="w-5 h-5" />
                  <span>Save & Publish All Changes to Live Website</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* VIEW 1: Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
              <div className="glass-4k p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-semibold uppercase">Total Shipments</span>
                <p className="text-2xl sm:text-3xl font-black text-white mt-1 font-mono">{totalShipments}</p>
                <span className="text-[10px] text-emerald-400 font-bold">● Active tracking records</span>
              </div>

              <div className="glass-4k p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-semibold uppercase">In Air / Transit</span>
                <p className="text-2xl sm:text-3xl font-black text-blue-400 mt-1 font-mono">{inTransitCount}</p>
                <span className="text-[10px] text-blue-400 font-bold">● Flight & customs</span>
              </div>

              <div className="glass-4k p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-semibold uppercase">Delivered</span>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400 mt-1 font-mono">{deliveredCount}</p>
                <span className="text-[10px] text-emerald-400 font-bold">● Consignee received</span>
              </div>

              <div className="glass-4k p-5 rounded-2xl border border-white/10">
                <span className="text-xs text-slate-400 font-semibold uppercase">Pending Pickups</span>
                <p className="text-2xl sm:text-3xl font-black text-amber-400 mt-1 font-mono">{pendingPickupsCount}</p>
                <span className="text-[10px] text-amber-400 font-bold">● Ahmedabad doorstep</span>
              </div>

              <div className="glass-4k p-5 rounded-2xl border border-white/10 col-span-2 lg:col-span-1">
                <span className="text-xs text-slate-400 font-semibold uppercase">Revenue Booked</span>
                <p className="text-2xl sm:text-3xl font-black text-amber-300 mt-1 font-mono">₹{totalRevenue.toLocaleString('en-IN')}</p>
                <span className="text-[10px] text-emerald-400 font-bold">● Paid & scheduled</span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="glass-4k rounded-3xl p-6 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="font-extrabold text-lg text-white">Operations Actions</h3>
                <p className="text-xs text-slate-400">Create new consignment manifests or edit website content.</p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={handleOpenCreateModal}
                  className="bg-brand-red hover:bg-brand-crimson text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-red-500/20"
                >
                  <Plus className="w-4 h-4" />
                  <span>Create New Shipment (AWB)</span>
                </button>

                <button
                  onClick={() => setActiveTab('cms')}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-black text-xs flex items-center gap-1.5 transition-all shadow-md"
                >
                  <Sliders className="w-4 h-4" />
                  <span>Edit Live Website CMS</span>
                </button>
              </div>
            </div>

            {/* Recent Consignments Preview Table */}
            <div className="glass-4k rounded-3xl border border-white/10 overflow-hidden">
              <div className="p-5 border-b border-white/10 flex items-center justify-between">
                <h4 className="font-extrabold text-sm text-white uppercase tracking-wider">
                  Recent Consignment Manifests
                </h4>
                <button
                  onClick={() => setActiveTab('shipments')}
                  className="text-xs font-bold text-blue-400 hover:underline"
                >
                  View All Shipments →
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">AWB No</th>
                      <th className="p-3.5">Sender</th>
                      <th className="p-3.5">Destination</th>
                      <th className="p-3.5">Category & Wt</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Carrier</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium text-slate-200">
                    {shipments.slice(0, 5).map((s) => (
                      <tr key={s.awb} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-amber-400">{s.awb}</td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white">{s.senderName}</p>
                          <p className="text-[11px] text-slate-400">{s.senderCity}</p>
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white">{s.receiverCountry}</p>
                          <p className="text-[11px] text-slate-400">{s.receiverCity}</p>
                        </td>
                        <td className="p-3.5">
                          <p className="truncate max-w-[140px]">{s.category}</p>
                          <p className="text-[11px] font-bold text-slate-400">{s.weightKg} kg</p>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            s.currentStatus === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                            s.currentStatus.includes('Customs') ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                            s.currentStatus === 'In Transit' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                            'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>
                            {s.currentStatus}
                          </span>
                        </td>
                        <td className="p-3.5 text-slate-300">{s.carrierPartner}</td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleOpenUpdateModal(s)}
                            className="p-1.5 bg-white/10 hover:bg-blue-600 text-white rounded-lg transition-colors"
                            title="Update Status"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenPrintLabel(s)}
                            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            title="Print Label"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: Full Shipment Management */}
        {activeTab === 'shipments' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Filter Bar */}
            <div className="glass-4k p-5 rounded-3xl border border-white/10 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search AWB, Sender, Receiver..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-white/20 rounded-xl text-xs text-white focus:outline-none"
                  />
                </div>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 bg-slate-900 border border-white/20 rounded-xl text-xs font-semibold text-white focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="Booked">Booked</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Customs Cleared (Origin)">Customs Cleared (Origin)</option>
                  <option value="Customs Cleared (Destination)">Customs Cleared (Destination)</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <button
                onClick={handleOpenCreateModal}
                className="bg-brand-red hover:bg-brand-crimson text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-red-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Create Shipment</span>
              </button>
            </div>

            {/* Table */}
            <div className="glass-4k rounded-3xl border border-white/10 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-bold uppercase tracking-wider border-b border-white/10">
                    <tr>
                      <th className="p-3.5">AWB No</th>
                      <th className="p-3.5">Sender</th>
                      <th className="p-3.5">Receiver & Country</th>
                      <th className="p-3.5">Category & Wt</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Payment</th>
                      <th className="p-3.5">Carrier</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-medium text-slate-200">
                    {filteredShipments.map((s) => (
                      <tr key={s.awb} className="hover:bg-white/5 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-amber-400">{s.awb}</td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white">{s.senderName}</p>
                          <p className="text-[11px] text-slate-400">{s.senderPhone}</p>
                        </td>
                        <td className="p-3.5">
                          <p className="font-semibold text-white">{s.receiverName}</p>
                          <p className="text-[11px] text-slate-400">{s.receiverCountry} ({s.receiverCity})</p>
                        </td>
                        <td className="p-3.5">
                          <p className="truncate max-w-[140px]">{s.category}</p>
                          <p className="text-[11px] font-bold text-slate-400">{s.weightKg} kg</p>
                        </td>
                        <td className="p-3.5">
                          <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                            s.currentStatus === 'Delivered' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                            s.currentStatus.includes('Customs') ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                            s.currentStatus === 'In Transit' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                            'bg-amber-500/20 text-amber-300 border-amber-500/30'
                          }`}>
                            {s.currentStatus}
                          </span>
                        </td>
                        <td className="p-3.5">
                          <span className="font-bold text-white">₹{s.paymentAmount}</span>
                          <p className="text-[10px] text-emerald-400 font-semibold">{s.paymentStatus}</p>
                        </td>
                        <td className="p-3.5 text-slate-300">{s.carrierPartner}</td>
                        <td className="p-3.5 text-right space-x-1">
                          <button
                            onClick={() => handleOpenUpdateModal(s)}
                            className="p-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg"
                            title="Update Checkpoint"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleOpenPrintLabel(s)}
                            className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg"
                            title="Print Label"
                          >
                            <Printer className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 3: Pickups */}
        {activeTab === 'pickups' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="glass-4k p-5 rounded-3xl border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-white">Doorstep Pickup Inquiries</h3>
                <p className="text-xs text-slate-400">Pickups booked by customers in Ahmedabad & Gandhinagar</p>
              </div>
              <span className="text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full">
                {pendingPickupsCount} Pending Action
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pickups.map((p) => (
                <div key={p.id} className="glass-4k p-5 rounded-3xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <div>
                      <span className="font-mono font-bold text-xs text-amber-400">{p.id}</span>
                      <p className="text-[11px] text-slate-400">{p.createdAt}</p>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold border ${
                      p.status === 'Picked Up' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
                      p.status === 'Driver Assigned' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                      'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    }`}>
                      {p.status}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs">
                    <p className="font-bold text-white text-sm">{p.customerName}</p>
                    <p className="text-slate-300 flex items-center gap-1">
                      <Phone className="w-3 h-3 text-brand-red" />
                      <a href={`tel:${p.phone}`} className="font-semibold text-blue-400">{p.phone}</a>
                    </p>
                    <p className="text-slate-300 flex items-start gap-1">
                      <MapPin className="w-3 h-3 text-brand-red shrink-0 mt-0.5" />
                      <span>{p.pickupAddress}, Pincode: {p.pickupPincode}</span>
                    </p>
                    <div className="pt-2 grid grid-cols-2 gap-2 text-[11px] bg-slate-900 p-2.5 rounded-xl border border-white/10">
                      <div>
                        <span className="text-slate-400">Destination:</span>
                        <p className="font-bold text-white">{p.destinationCountry}</p>
                      </div>
                      <div>
                        <span className="text-slate-400">Weight:</span>
                        <p className="font-bold text-white">{p.estimatedWeightKg} kg</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2 border-t border-white/10">
                    {p.status === 'Pending' && (
                      <button
                        onClick={() => handleUpdatePickupStatus(p, 'Driver Assigned')}
                        className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2 rounded-xl font-bold text-xs"
                      >
                        Assign Driver
                      </button>
                    )}
                    {p.status === 'Driver Assigned' && (
                      <button
                        onClick={() => handleUpdatePickupStatus(p, 'Picked Up')}
                        className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl font-bold text-xs"
                      >
                        Mark Picked Up
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* VIEW 4: Rates */}
        {activeTab === 'rates' && (
          <div className="space-y-6 animate-in fade-in">
            <div className="glass-4k p-5 rounded-3xl border border-white/10 flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-lg text-white">Active International Tariff Matrix</h3>
                <p className="text-xs text-slate-400">Can also be modified inside the Live Website CMS tab</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {siteContent.rates.map((c) => (
                <div key={c.countryCode} className="glass-4k p-5 rounded-3xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-3xl">{c.flag}</span>
                    <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-500/30">
                      {c.region}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-white">{c.countryName}</h4>
                  
                  <div className="space-y-1.5 text-xs pt-2 border-t border-white/10">
                    <div className="flex justify-between">
                      <span className="text-slate-400">First 500g Base:</span>
                      <strong className="text-amber-400 font-mono">₹{c.baseRateFirst500g}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Addl. 500g Rate:</span>
                      <strong className="text-amber-400 font-mono">₹{c.perAdditional500g}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Express Transit:</span>
                      <span className="font-semibold text-slate-200">{c.deliveryDaysExpress}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* MODAL 1: Create New Shipment */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-4k rounded-3xl shadow-2xl max-w-2xl w-full border border-white/20 overflow-hidden max-h-[92vh] flex flex-col">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-white/10">
              <div>
                <h3 className="font-bold text-base">Create New International Consignment</h3>
                <p className="text-xs text-blue-200">Generates instant tracking record and printable AWB</p>
              </div>
              <button onClick={() => setCreateModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateShipment} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="bg-slate-900/90 p-3 rounded-xl border border-white/20 flex justify-between items-center">
                <span className="font-semibold text-slate-300">Auto-Generated AWB:</span>
                <span className="font-mono font-black text-amber-400 text-sm">{newAwb}</span>
              </div>

              {/* Sender */}
              <div className="space-y-2">
                <p className="font-bold text-white uppercase">Sender (Gujarat)</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Sender Full Name"
                    value={newSenderName}
                    onChange={(e) => setNewSenderName(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Sender Phone"
                    value={newSenderPhone}
                    onChange={(e) => setNewSenderPhone(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Pickup / Origin Address"
                    value={newSenderAddress}
                    onChange={(e) => setNewSenderAddress(e.target.value)}
                    className="col-span-2 p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                </div>
              </div>

              {/* Receiver */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="font-bold text-white uppercase">Receiver (Overseas)</p>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Receiver Full Name"
                    value={newReceiverName}
                    onChange={(e) => setNewReceiverName(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                  <input
                    type="tel"
                    required
                    placeholder="Receiver Phone"
                    value={newReceiverPhone}
                    onChange={(e) => setNewReceiverPhone(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                  <select
                    value={newReceiverCountry}
                    onChange={(e) => setNewReceiverCountry(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-white/20 rounded-xl font-semibold"
                  >
                    {siteContent.rates.map((c) => (
                      <option key={c.countryCode} value={c.countryName}>
                        {c.flag} {c.countryName}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Destination City"
                    value={newReceiverCity}
                    onChange={(e) => setNewReceiverCity(e.target.value)}
                    className="p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                  <input
                    type="text"
                    placeholder="Street Address & Postal Code"
                    value={newReceiverAddress}
                    onChange={(e) => setNewReceiverAddress(e.target.value)}
                    className="col-span-2 p-2.5 bg-slate-900 border border-white/20 rounded-xl"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <p className="font-bold text-white uppercase">Shipment Specs</p>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-slate-400">Weight (KG)</label>
                    <input
                      type="number"
                      step="0.5"
                      value={newWeight}
                      onChange={(e) => setNewWeight(parseFloat(e.target.value))}
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Amount (₹)</label>
                    <input
                      type="number"
                      value={newAmount}
                      onChange={(e) => setNewAmount(Number(e.target.value))}
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400">Carrier</label>
                    <select
                      value={newCarrier}
                      onChange={(e) => setNewCarrier(e.target.value)}
                      className="w-full p-2.5 bg-slate-900 border border-white/20 rounded-xl font-semibold"
                    >
                      <option>Mishva Express</option>
                      <option>DHL Network</option>
                      <option>FedEx Global</option>
                      <option>Aramex</option>
                      <option>UPS</option>
                    </select>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-brand-red hover:bg-brand-crimson text-white py-3 rounded-xl font-bold text-sm shadow-md"
              >
                Save Consignment & Activate Tracking
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Update Checkpoint */}
      {updateModalOpen && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="glass-4k rounded-3xl shadow-2xl max-w-lg w-full border border-white/20 overflow-hidden">
            <div className="bg-slate-900 text-white p-5 flex items-center justify-between border-b border-white/10">
              <div>
                <h3 className="font-bold text-base">Update Consignment Status</h3>
                <p className="text-xs text-blue-200">AWB: {selectedShipment.awb}</p>
              </div>
              <button onClick={() => setUpdateModalOpen(false)} className="text-white/80 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveStatusUpdate} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">New Milestone Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ShipmentStatus)}
                  className="w-full p-3 bg-slate-900 border border-white/20 rounded-xl font-bold text-white"
                >
                  <option value="Booked">Booked</option>
                  <option value="Picked Up">Picked Up</option>
                  <option value="At Origin Hub">At Origin Hub (Ahmedabad SVPI)</option>
                  <option value="Customs Cleared (Origin)">Customs Cleared (Origin Export)</option>
                  <option value="In Transit">In Transit (Air Cargo En Route)</option>
                  <option value="Arrived at Destination Country">Arrived at Destination Gateway</option>
                  <option value="Customs Cleared (Destination)">Customs Cleared (Import)</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Current Location Hub</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. London Heathrow Airport Terminal 4 or Dubai Hub"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-white/20 rounded-xl font-medium"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Checkpoint Description / Scan Note</label>
                <textarea
                  rows={3}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full p-3 bg-slate-900 border border-white/20 rounded-xl font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-bold text-sm shadow-md"
              >
                Push Real-Time Checkpoint Update
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Printable Label */}
      {labelModalOpen && selectedShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between no-print">
              <span className="font-bold text-xs text-slate-700">Official Air Waybill (AWB) Label</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-brand-red text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Label</span>
                </button>
                <button onClick={() => setLabelModalOpen(false)} className="text-slate-500 hover:text-slate-800 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div id="printable-awb" className="p-6 text-black bg-white space-y-4 text-xs font-sans">
              <div className="flex items-center justify-between border-b-2 border-black pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 relative">
                    <Image src="/images/logo.jpg" alt="Mishva" fill className="object-contain" />
                  </div>
                  <div>
                    <h2 className="font-black text-base tracking-tight">{siteContent.company.name}</h2>
                    <p className="text-[9px] uppercase font-semibold">Chandkheda, Ahmedabad • Direct Air Cargo</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="border-2 border-black px-2 py-1 font-black text-xs uppercase">
                    PRIORITY AIR
                  </span>
                </div>
              </div>

              <div className="text-center py-2 border-b border-black">
                <div className="flex justify-center items-center h-12 gap-0.5 my-1">
                  {[...Array(35)].map((_, i) => (
                    <div
                      key={i}
                      className="bg-black"
                      style={{
                        width: i % 3 === 0 ? '4px' : i % 2 === 0 ? '2px' : '1px',
                        height: '100%',
                      }}
                    ></div>
                  ))}
                </div>
                <span className="font-mono font-black text-sm tracking-widest">{selectedShipment.awb}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 border-b border-black pb-3">
                <div className="border border-black p-2 rounded">
                  <span className="font-bold text-[10px] block uppercase">SHIPPER:</span>
                  <p className="font-bold text-xs">{selectedShipment.senderName}</p>
                  <p className="text-[11px]">{selectedShipment.senderAddress}</p>
                  <p className="text-[11px] font-semibold">Ph: {selectedShipment.senderPhone}</p>
                </div>

                <div className="border-2 border-black p-2 rounded bg-slate-50">
                  <span className="font-bold text-[10px] block uppercase">CONSIGNEE:</span>
                  <p className="font-black text-sm">{selectedShipment.receiverName}</p>
                  <p className="text-[11px] font-semibold">{selectedShipment.receiverAddress}</p>
                  <p className="text-xs font-black">{selectedShipment.receiverCity}, {selectedShipment.receiverCountry}</p>
                  <p className="text-[11px] font-semibold">Ph: {selectedShipment.receiverPhone}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 text-center text-[10px] border-b border-black pb-3">
                <div className="border border-black p-1 rounded">
                  <span className="block text-slate-500">PIECES</span>
                  <strong className="text-xs font-bold">1 PKG</strong>
                </div>
                <div className="border border-black p-1 rounded">
                  <span className="block text-slate-500">WEIGHT</span>
                  <strong className="text-xs font-bold">{selectedShipment.weightKg} KG</strong>
                </div>
                <div className="border border-black p-1 rounded">
                  <span className="block text-slate-500">PAYMENT</span>
                  <strong className="text-xs font-bold">{selectedShipment.paymentStatus}</strong>
                </div>
                <div className="border border-black p-1 rounded">
                  <span className="block text-slate-500">CARRIER</span>
                  <strong className="text-xs font-bold">{selectedShipment.carrierPartner}</strong>
                </div>
              </div>

              <div className="text-[9px] text-slate-600">
                <p><strong>Contents:</strong> {selectedShipment.category}</p>
                <p>Aviation Security Inspected. For inquiries: {siteContent.company.phone}.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
