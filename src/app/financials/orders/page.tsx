import { AdminShell } from '@/components/shell/AdminShell';
import { OrdersScreen } from '@/components/screens/OrdersScreen';

export default function OrdersPage() {
  return (
    <AdminShell>
      <OrdersScreen />
    </AdminShell>
  );
}
