'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import {
  CreditCard,
  FileSpreadsheet,
  RotateCcw,
  ShieldAlert,
  Send,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Lock,
  ExternalLink,
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '@/components/common/Card';
import { Badge } from '@/components/common/Badge';
import { Button } from '@/components/common/Button';
import { Modal } from '@/components/common/Modal';

export function OrderDetailScreen({ orderId = 'ORD-1048' }: { orderId?: string }) {
  const {
    orders,
    processPartialRefund,
    processFullReversal,
    resendTaxInvoice,
    showToast,
    role,
    t,
    language,
    isRtl,
    navigateTo,
  } = useApp();

  const order = orders.find((o) => o.id === orderId) || orders[0];

  // Partial Refund Slider State
  const [refundAmount, setRefundAmount] = useState<number>(500);
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false);

  // Full Reversal Modal State
  const [isReversalModalOpen, setIsReversalModalOpen] = useState(false);
  const [reversalPassword, setReversalPassword] = useState('');

  // Pro-rata calculations
  const seatUsedCount = order.seatsUsed || 0;
  const seatTotalCount = order.seatsCount || 1;
  const consumptionRatio = seatUsedCount / seatTotalCount;
  const maxRefundable = order.amount * (1 - consumptionRatio);

  const handleExecuteRefund = () => {
    const success = processPartialRefund(order.id, refundAmount);
    if (success) {
      setIsRefundModalOpen(false);
    }
  };

  const handleExecuteReversal = () => {
    const success = processFullReversal(order.id, reversalPassword);
    if (success) {
      setIsReversalModalOpen(false);
      setReversalPassword('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200/60 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Order {order.id} · Detailed Breakdown
            </h1>
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
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Gateway: {order.gateway} (Ref: {order.gatewayRef}) • Date: {order.date}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Send className="w-3.5 h-3.5" />}
            onClick={() => resendTaxInvoice(order.id)}
          >
            {t.orderDetail.resendInvoiceBtn}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTo('payments')}
          >
            All Orders
          </Button>
        </div>
      </div>

      {/* Grid: Order Metadata & Itemization (7 Cols) + Administrative Refund & Reversal (5 Cols) */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left: Customer, Itemized Items, and Webhook Timeline (7 Cols) */}
        <div className="xl:col-span-7 space-y-6">
          {/* Customer Metadata Card */}
          <Card>
            <CardHeader
              title={t.orderDetail.customerDetails}
              icon={<CreditCard className="w-4 h-4 text-blue-600" />}
            />
            <CardContent className="space-y-3.5 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.orderDetail.customerName}:</span>
                <span className="font-bold text-slate-900 dark:text-white">{order.buyerName}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">Billing Email:</span>
                <span className="font-mono text-slate-800 dark:text-slate-200">{order.buyerEmail}</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <span className="text-slate-500">{t.orderDetail.gatewayRef}:</span>
                <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{order.gatewayRef}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Customer Category:</span>
                <Badge variant="primary" size="sm">
                  {order.buyerType}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Itemized Order Breakdown */}
          <Card>
            <CardHeader
              title={t.orderDetail.itemizedBreakdown}
              icon={<FileSpreadsheet className="w-4 h-4 text-emerald-600" />}
            />
            <CardContent className="space-y-4">
              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 uppercase font-semibold">
                    <tr>
                      <th className="py-2.5 px-3">Item Description</th>
                      <th className="py-2.5 px-3 text-center">Qty</th>
                      <th className="py-2.5 px-3 text-right">Unit Price</th>
                      <th className="py-2.5 px-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {order.items.map((item, idx) => (
                      <tr key={idx}>
                        <td className="py-3 px-3 font-medium text-slate-800 dark:text-slate-200">
                          {item.description}
                        </td>
                        <td className="py-3 px-3 text-center font-bold text-slate-900 dark:text-white">
                          {item.quantity}
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          ${item.unitPrice.toFixed(2)}
                        </td>
                        <td className="py-3 px-3 text-right font-black font-mono text-slate-900 dark:text-white">
                          ${item.total.toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Subtotal, Tax, and Grand Total */}
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-2 text-xs border border-slate-200/80 dark:border-slate-700">
                <div className="flex items-center justify-between text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono font-bold">${(order.amount - order.tax).toFixed(2)} USD</span>
                </div>
                <div className="flex items-center justify-between text-slate-500">
                  <span>Estimated Tax / VAT:</span>
                  <span className="font-mono font-bold">${order.tax.toFixed(2)} USD</span>
                </div>
                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between font-extrabold text-sm text-slate-900 dark:text-white">
                  <span>Grand Total Settled:</span>
                  <span className="font-mono text-emerald-600">${order.amount.toFixed(2)} USD</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Immutable Event Log Timeline */}
          <Card>
            <CardHeader
              title={t.orderDetail.timelineTitle}
              subtitle="Cryptographic Stripe webhook receipts"
              icon={<Clock className="w-4 h-4 text-purple-600" />}
            />
            <CardContent>
              <div className="space-y-3 text-xs">
                {order.eventTimeline.map((ev, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-1.5 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">
                          {ev.event}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">{ev.timestamp}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">
                        {ev.details}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Administrative Controls & Financial Protection Rules (5 Cols) */}
        <div className="xl:col-span-5 space-y-6">
          <Card className="border-2 border-rose-500/20 dark:border-rose-500/30">
            <CardHeader
              title="Financial Action Controls"
              subtitle="Pro-rata seat checks & Super Admin password authorization"
              icon={<ShieldAlert className="w-4 h-4 text-rose-600" />}
            />
            <CardContent className="space-y-4 text-xs">
              {/* Seat Consumption Audit */}
              <div className="p-3.5 bg-amber-50/60 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl space-y-2">
                <span className="font-bold text-amber-900 dark:text-amber-200 block">
                  {t.orderDetail.seatsUtilization}
                </span>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-[11px]">
                  {order.seatsUsed} of {order.seatsCount} student seats have already submitted coursework or initiated video verifications.
                </p>
                <div className="pt-1 flex items-center justify-between font-semibold text-amber-800 dark:text-amber-300">
                  <span>{t.orderDetail.maxRefundAllowed}</span>
                  <span className="font-mono text-base font-bold">${maxRefundable.toFixed(2)} USD</span>
                </div>
              </div>

              {/* Partial Refund Trigger Button */}
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl space-y-3">
                <span className="font-bold text-slate-900 dark:text-white block">
                  1. Partial Pro-Rata Refund
                </span>
                <p className="text-slate-500 text-[11px]">
                  Adjust refund amount within the maximum allowable cap.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsRefundModalOpen(true)}
                  icon={<RotateCcw className="w-3.5 h-3.5 text-amber-500" />}
                >
                  Configure Partial Refund
                </Button>
              </div>

              {/* Full Reversal Trigger Button */}
              <div className="p-3.5 bg-rose-50/50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 rounded-xl space-y-3">
                <div className="flex items-center gap-1.5 font-bold text-rose-900 dark:text-rose-200">
                  <Lock className="w-4 h-4 text-rose-600" />
                  <span>2. Full Transaction Reversal & Seat Revocation</span>
                </div>
                <p className="text-rose-700 dark:text-rose-300 text-[11px] leading-relaxed">
                  Requires Super Admin explicit confirmation password. Will immediately deactivate all 50 student seats provisioned under this order.
                </p>
                <Button
                  variant="danger"
                  size="sm"
                  className="w-full"
                  onClick={() => setIsReversalModalOpen(true)}
                  icon={<ShieldAlert className="w-3.5 h-3.5" />}
                >
                  {t.orderDetail.fullReverseBtn}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Partial Refund Modal */}
      <Modal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
        title="Process Partial Pro-Rata Refund"
        subtitle={`Order: ${order.id} • Max Allowable: $${maxRefundable.toFixed(2)}`}
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsRefundModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleExecuteRefund}>
              Confirm Refund of ${refundAmount.toFixed(2)}
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="font-bold text-slate-700 dark:text-slate-300">
                Refund Amount ($ USD):
              </label>
              <span className="font-mono text-base font-black text-blue-600">
                ${refundAmount.toFixed(2)}
              </span>
            </div>
            <input
              type="range"
              min="50"
              max={maxRefundable}
              step="50"
              value={refundAmount}
              onChange={(e) => setRefundAmount(Number(e.target.value))}
              className="w-full accent-blue-600"
            />
          </div>
          <p className="text-slate-500 text-[11px]">
            Funds will be returned to the original payment source via Stripe payment intent ({order.gatewayRef}) within 5-10 business days.
          </p>
        </div>
      </Modal>

      {/* Full Reversal Password Confirmation Modal */}
      <Modal
        isOpen={isReversalModalOpen}
        onClose={() => setIsReversalModalOpen(false)}
        title="Security Authentication: Full Reversal"
        subtitle="This action revokes student seats immediately"
        footer={
          <>
            <Button variant="outline" size="sm" onClick={() => setIsReversalModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" size="sm" onClick={handleExecuteReversal}>
              Authenticate & Revoke
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-xl text-rose-800 dark:text-rose-200">
            Enter Super Admin confirmation password (try: <code className="font-mono font-bold">admin123</code> or <code className="font-mono font-bold">superadmin</code>) to authenticate this reversal.
          </div>
          <div>
            <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
              Super Admin Confirmation Password:
            </label>
            <input
              type="password"
              placeholder="••••••••••••"
              value={reversalPassword}
              onChange={(e) => setReversalPassword(e.target.value)}
              className="w-full p-2.5 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
