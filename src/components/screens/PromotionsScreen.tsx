'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  Percent,
  PlusCircle,
  ToggleLeft,
  ToggleRight,
  Sparkles,
  Calendar,
  Users,
  Copy,
  CheckCircle2,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';
import { PromoCode } from '@/data/mockData';

export function PromotionsScreen() {
  const { promotions, togglePromoStatus, addPromoCode, showToast, t, language, isRtl } = useApp();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [code, setCode] = useState('');
  const [discount, setDiscount] = useState(20);
  const [maxRedemptions, setMaxRedemptions] = useState(250);
  const [expiry, setExpiry] = useState('2026-12-31');
  const [audience, setAudience] = useState<PromoCode['targetAudience']>('All');

  const generateRandomCode = () => {
    const prefixes = ['CODE', 'SUMMER', 'LEARN', 'FUTUR', 'KIDS'];
    const rand = Math.floor(1000 + Math.random() * 9000);
    const chosen = `${prefixes[Math.floor(Math.random() * prefixes.length)]}${rand}`;
    setCode(chosen);
  };

  const handleCreatePromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;
    addPromoCode({
      code: code.toUpperCase(),
      discountPercentage: discount,
      applicableTracks: ['All Tracks'],
      maxRedemptions: maxRedemptions,
      expiryDate: expiry,
      status: 'Active',
      targetAudience: audience,
    });
    setIsCreateModalOpen(false);
    setCode('');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t.nav.promotions}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Create, calibrate, and restrict marketing promotion codes, discount percentages, and tenant audience bounds
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={<PlusCircle className="w-3.5 h-3.5" />}
          onClick={() => {
            generateRandomCode();
            setIsCreateModalOpen(true);
          }}
        >
          Create New Promo Code
        </Button>
      </div>

      {/* Promotions Table */}
      <Card className="overflow-hidden">
        <CardHeader
          title="Active Marketing Discount Coupons"
          subtitle="Real-time redemption velocity and capacity capping"
          icon={<Percent className="w-4 h-4 text-amber-500" />}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3 px-4">Coupon Code</th>
                <th className="py-3 px-4">Discount</th>
                <th className="py-3 px-4">Audience</th>
                <th className="py-3 px-4">Redemptions</th>
                <th className="py-3 px-4">Expires</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Toggle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {promotions.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                      {p.code}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(p.code);
                        showToast(`Copied ${p.code} to clipboard`, 'info');
                      }}
                      className="text-slate-400 hover:text-blue-600 cursor-pointer"
                      title="Copy Code"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-emerald-600">
                    {p.discountPercentage}% OFF
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300">
                    {p.targetAudience}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 font-mono">
                      <span>{p.redemptionsCount} / {p.maxRedemptions}</span>
                      <div className="w-16 h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{ width: `${(p.redemptionsCount / p.maxRedemptions) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[11px] text-slate-500">
                    {p.expiryDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <Badge variant={p.status === 'Active' ? 'success' : 'neutral'} size="sm" dot>
                      {p.status}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <Button
                      variant={p.status === 'Active' ? 'outline' : 'primary'}
                      size="sm"
                      onClick={() => togglePromoStatus(p.id)}
                    >
                      {p.status === 'Active' ? 'Pause' : 'Activate'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Promo Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Generate New Promotional Coupon"
        subtitle="Configure discount bounds and target audience"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleCreatePromo}>
              Publish Promo Code
            </Button>
          </>
        }
      >
        <form onSubmit={handleCreatePromo} className="space-y-3.5 text-xs">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-bold text-slate-700 dark:text-slate-300">Promo Code:</label>
              <button
                type="button"
                onClick={generateRandomCode}
                className="text-[11px] text-blue-600 font-semibold cursor-pointer"
              >
                Regenerate Random
              </button>
            </div>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              className="w-full p-2.5 font-mono font-bold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Discount Percentage (%):
              </label>
              <input
                type="number"
                min="5"
                max="90"
                value={discount}
                onChange={(e) => setDiscount(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Max Redemptions Cap:
              </label>
              <input
                type="number"
                min="1"
                value={maxRedemptions}
                onChange={(e) => setMaxRedemptions(Number(e.target.value))}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Expiry Date:
              </label>
              <input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              />
            </div>
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Target Audience Restriction:
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value as any)}
                className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
              >
                <option value="All">All Audiences</option>
                <option value="Parents Only">Parents Only</option>
                <option value="Organizations Only">Schools Only</option>
                <option value="Individuals Only">Independent Teens Only</option>
              </select>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
