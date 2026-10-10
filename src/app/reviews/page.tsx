import { AdminShell } from '@/components/shell/AdminShell';
import { PendingReviewsScreen } from '@/components/screens/PendingReviewsScreen';

export default function PendingReviewsPage() {
  return (
    <AdminShell>
      <PendingReviewsScreen />
    </AdminShell>
  );
}
