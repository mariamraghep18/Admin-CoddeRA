'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import {
  CreditCard,
  DollarSign,
  TrendingUp,
  Search,
  ExternalLink,
  ShieldCheck,
  Building2,
  HeartHandshake,
  UserCircle,
  FileSpreadsheet,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';

export function OrdersScreen() {
  const { orders, t, language, isRtl, showToast, navigateTo } = useApp();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filtered = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.buyerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.buyerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.gatewayRef.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || o.buyerType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.orders}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Reconciliation ledger, payment gateway settlements (Stripe, Paymob, Bank Wire), and customer invoices
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/financials/promotions">
            <Button variant="outline" size="sm">
              Promotions Engine
            </Button>
          </Link>
          <Link href="/financials/referrals">
            <Button variant="outline" size="sm">
              Referral Operations
            </Button>
          </Link>
        </div>
      </div>

      {/* 4 Financial KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-l-4 border-l-emerald-600">
          <CardContent className="p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Total Volume Settled
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-slate-900 dark:text-white">$148,920.00</span>
              <Badge variant="success" size="sm">+18.4%</Badge>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">99.2% Successful Charges</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-600">
          <CardContent className="p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Active Subscriptions
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-blue-600">412</span>
              <span className="text-xs text-slate-400">Recurring</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Family Plans & Enterprise Seats</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-600">
          <CardContent className="p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Pending Invoices (Net 30)
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-amber-600">$14,200.00</span>
              <Badge variant="warning" size="sm">3 Schools</Badge>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Due by end of October</span>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-rose-600">
          <CardContent className="p-4">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Net Refunds & Disputes
            </span>
            <div className="flex items-baseline justify-between mt-1">
              <span className="text-2xl font-black text-rose-600">$1,850.00</span>
              <span className="text-xs text-slate-400">1.2% Ratio</span>
            </div>
            <span className="text-[11px] text-slate-400 mt-1 block">Pro-rata regulated</span>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search */}
      <Card>
        <CardContent className="p-4 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute top-3 left-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Order ID (ORD-1048), buyer name, email, or Stripe reference..."
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 cursor-pointer w-full sm:w-auto"
          >
            <option value="all">All Buyer Types</option>
            <option value="organization">Organization / School</option>
            <option value="parent">Parent</option>
            <option value="individual">Individual</option>
          </select>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer Name & Type</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Gateway</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Detail</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => navigateTo('order-deep-dive', { id: order.id })}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer group"
                >
                  <td className="py-3.5 px-4 font-mono font-bold text-blue-600 dark:text-blue-400">
                    {order.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors">
                      {order.buyerName}
                    </div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <span>{order.buyerType}</span>
                      <span>•</span>
                      <span>{order.buyerEmail}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                    {order.date}
                  </td>
                  <td className="py-3.5 px-4 font-black text-slate-900 dark:text-white">
                    ${order.amount.toFixed(2)} {order.currency}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-mono text-slate-600 dark:text-slate-300">
                      {order.gateway}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge
                      variant={
                        order.status === 'Settled'
                          ? 'success'
                          : order.status === 'Partially Refunded'
                          ? 'warning'
                          : 'danger'
                      }
                      size="sm"
                      dot
                    >
                      {order.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigateTo('order-deep-dive', { id: order.id });
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-blue-600 hover:text-blue-700 bg-blue-50 dark:bg-blue-950/60 rounded-lg cursor-pointer"
                    >
                      <span>Breakdown</span>
                      <ExternalLink className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
