import { AdminShell } from '@/components/shell/AdminShell';
import { OrderDetailScreen } from '@/components/screens/OrderDetailScreen';
import { initialOrders } from '@/data/mockData';

export function generateStaticParams() {
  return initialOrders.map((o) => ({ id: o.id }));
}

export default async function OrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <OrderDetailScreen orderId={id} />
    </AdminShell>
  );
}
