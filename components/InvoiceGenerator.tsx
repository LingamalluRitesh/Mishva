'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Trash2, 
  Printer, 
  ShieldCheck, 
  Download, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  hsnCode: string;
}

export default function InvoiceGenerator() {
  const [senderName, setSenderName] = useState('Bhavin Patel');
  const [senderAddress, setSenderAddress] = useState('Satellite Road, Ahmedabad, Gujarat - 380015');
  const [senderPhone, setSenderPhone] = useState('+91 98250 11422');
  const [senderAadhaar, setSenderAadhaar] = useState('XXXX-XXXX-9477');

  const [receiverName, setReceiverName] = useState('Sneha Patel');
  const [receiverAddress, setReceiverAddress] = useState('42 Wembley Park Drive, London HA9 8HP, UK');
  const [receiverCountry, setReceiverCountry] = useState('United Kingdom (UK)');
  const [receiverPhone, setReceiverPhone] = useState('+44 7700 900142');

  const [invoiceNumber, setInvoiceNumber] = useState('PI-MIC-2026-089');
  const [invoiceDate, setInvoiceDate] = useState(new Date().toISOString().split('T')[0]);
  const [purpose, setPurpose] = useState('Personal Gift / NRI Household Homemade Food');

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Vacuum-Packed Homemade Gujarati Khakhra (Methi/Jeera)', quantity: 15, unit: 'Packets', unitPrice: 120, hsnCode: '19059040' },
    { id: '2', description: 'Dry Sweets (Mohanthal & Kaju Katli in sealed tin)', quantity: 4, unit: 'Boxes (500g)', unitPrice: 450, hsnCode: '21069099' },
    { id: '3', description: 'Ground Spices (Turmeric, Red Chilli, Garam Masala)', quantity: 3, unit: 'Packets', unitPrice: 180, hsnCode: '09109990' },
  ]);

  const [showPrintModal, setShowPrintModal] = useState(false);

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: 'Traditional Garments / Cotton Kurtas',
      quantity: 2,
      unit: 'Pieces',
      unitPrice: 850,
      hsnCode: '62040000',
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const totalValue = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  return (
    <div id="invoice-tool" className="w-full">
      <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-brand-deep to-brand-navy text-white p-6 sm:p-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 text-white backdrop-blur-sm mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>Free Export Utility Tool</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Instant Customs Proforma Invoice & Packing Slip Generator
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 mt-2">
              Generate the mandatory 3-copy export Proforma Invoice required by Indian Customs & international border agencies for zero customs hold-ups.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {/* Shipper Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-sm text-brand-navy uppercase">Shipper / Exporter Info</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-slate-500 font-semibold">Sender Name</label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold">Address (Ahmedabad / Gujarat)</label>
                  <input
                    type="text"
                    value={senderAddress}
                    onChange={(e) => setSenderAddress(e.target.value)}
                    className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-700 font-bold">Phone</label>
                    <input
                      type="text"
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
                      className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold">Aadhaar / ID Ref</label>
                    <input
                      type="text"
                      value={senderAadhaar}
                      onChange={(e) => setSenderAadhaar(e.target.value)}
                      className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Consignee Details */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-3">
              <h4 className="font-bold text-sm text-brand-navy uppercase">Consignee (Overseas)</h4>
              <div className="space-y-2">
                <div>
                  <label className="text-slate-700 font-bold">Receiver Name</label>
                  <input
                    type="text"
                    value={receiverName}
                    onChange={(e) => setReceiverName(e.target.value)}
                    className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-bold">Destination Address & Postal Code</label>
                  <input
                    type="text"
                    value={receiverAddress}
                    onChange={(e) => setReceiverAddress(e.target.value)}
                    className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-bold text-slate-900"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-700 font-bold">Country</label>
                    <input
                      type="text"
                      value={receiverCountry}
                      onChange={(e) => setReceiverCountry(e.target.value)}
                      className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-bold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="text-slate-700 font-bold">International Phone</label>
                    <input
                      type="text"
                      value={receiverPhone}
                      onChange={(e) => setReceiverPhone(e.target.value)}
                      className="w-full p-2 bg-white border-2 border-slate-300 rounded-lg font-mono font-bold text-slate-900"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Itemized Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-sm text-brand-navy uppercase">
                Itemized Packing List & Declared Values
              </h4>
              <button
                type="button"
                onClick={addItem}
                className="bg-blue-50 text-brand-blue hover:bg-blue-100 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Item Line</span>
              </button>
            </div>

            <div className="border border-slate-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                  <tr>
                    <th className="p-3">Description of Goods</th>
                    <th className="p-3">HSN Code</th>
                    <th className="p-3">Qty</th>
                    <th className="p-3">Unit</th>
                    <th className="p-3">Rate (₹)</th>
                    <th className="p-3">Total (₹)</th>
                    <th className="p-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50">
                      <td className="p-2.5">
                        <input
                          type="text"
                          value={item.description}
                          onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                          className="w-full p-2 bg-white border-2 border-slate-300 rounded font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2.5 w-28">
                        <input
                          type="text"
                          value={item.hsnCode}
                          onChange={(e) => updateItem(item.id, 'hsnCode', e.target.value)}
                          className="w-full p-2 bg-white border-2 border-slate-300 rounded font-mono font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2.5 w-16">
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                          className="w-full p-2 bg-white border-2 border-slate-300 rounded font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2.5 w-28">
                        <input
                          type="text"
                          value={item.unit}
                          onChange={(e) => updateItem(item.id, 'unit', e.target.value)}
                          className="w-full p-2 bg-white border-2 border-slate-300 rounded font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2.5 w-24">
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, 'unitPrice', Number(e.target.value))}
                          className="w-full p-2 bg-white border-2 border-slate-300 rounded font-mono font-bold text-slate-900"
                        />
                      </td>
                      <td className="p-2.5 font-bold font-mono text-slate-800">
                        ₹{(item.quantity * item.unitPrice).toLocaleString('en-IN')}
                      </td>
                      <td className="p-2.5 text-right">
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="p-1 text-slate-400 hover:text-red-600 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-200 gap-3">
              <div>
                <span className="text-xs text-slate-500">Total Declared Export Value:</span>
                <p className="text-2xl font-black text-brand-navy">
                  ₹{totalValue.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-normal text-slate-500">INR (Non-Commercial Purpose)</span>
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowPrintModal(true)}
                className="bg-brand-red hover:bg-brand-crimson text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-all"
              >
                <Printer className="w-4 h-4" />
                <span>Generate Printable Proforma Invoice</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Printable Invoice Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[95vh]">
            <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between no-print">
              <span className="font-bold text-xs text-slate-700">Official Customs Proforma Invoice</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="bg-brand-red text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Document</span>
                </button>
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="text-slate-500 hover:text-slate-800 p-1"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-8 text-black bg-white space-y-4 text-xs font-sans overflow-y-auto">
              <div className="text-center border-b-2 border-black pb-3">
                <h2 className="font-black text-lg tracking-tight">PROFORMA INVOICE / PACKING SLIP</h2>
                <p className="text-[10px] uppercase font-semibold">For International Customs & Aviation Security Clearance</p>
                <p className="text-[10px] text-slate-600">Shipped via Mishva International Courier Service (Chandkheda, Ahmedabad)</p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs border-b border-black pb-3">
                <div>
                  <span className="font-bold text-[10px] block uppercase">SHIPPER / EXPORTER:</span>
                  <p className="font-bold">{senderName}</p>
                  <p>{senderAddress}</p>
                  <p>Ph: {senderPhone} • ID Ref: {senderAadhaar}</p>
                </div>
                <div>
                  <span className="font-bold text-[10px] block uppercase">CONSIGNEE:</span>
                  <p className="font-bold">{receiverName}</p>
                  <p>{receiverAddress}</p>
                  <p>{receiverCountry} • Ph: {receiverPhone}</p>
                </div>
              </div>

              <div className="border border-black">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-100 border-b border-black font-bold">
                    <tr>
                      <th className="p-2">Item Description</th>
                      <th className="p-2">HSN Code</th>
                      <th className="p-2">Qty</th>
                      <th className="p-2 text-right">Value (INR)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/30">
                    {items.map((it, idx) => (
                      <tr key={idx}>
                        <td className="p-2">{it.description}</td>
                        <td className="p-2 font-mono">{it.hsnCode}</td>
                        <td className="p-2">{it.quantity} {it.unit}</td>
                        <td className="p-2 text-right font-mono">₹{(it.quantity * it.unitPrice).toLocaleString('en-IN')}</td>
                      </tr>
                    ))}
                    <tr className="font-black bg-slate-50 border-t border-black">
                      <td colSpan={3} className="p-2 uppercase text-right">Total Declared Value:</td>
                      <td className="p-2 text-right font-mono">₹{totalValue.toLocaleString('en-IN')}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Declaration Statement */}
              <div className="text-[10px] text-slate-700 space-y-1 border-t border-black pt-3">
                <p className="font-bold uppercase">DECLARATION OF SHIPPER:</p>
                <p>
                  I hereby declare that the contents of this consignment as detailed above are bonafide personal gifts/household food articles/documents, contain no commercial value, no hazardous, narcotics, or prohibited goods as per aviation security regulations and Customs Act 1962.
                </p>
              </div>

              <div className="pt-6 flex justify-between items-end text-xs">
                <div>
                  <p className="text-[10px] text-slate-500">Date: {invoiceDate}</p>
                  <p className="text-[10px] text-slate-500">Place: Ahmedabad, Gujarat, India</p>
                </div>
                <div className="text-center border-t border-black w-48 pt-1">
                  <p className="font-bold text-xs">{senderName}</p>
                  <p className="text-[10px] text-slate-500">Authorized Signature of Shipper</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
