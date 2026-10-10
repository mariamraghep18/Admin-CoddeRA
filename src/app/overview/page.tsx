import { AdminShell } from '@/components/shell/AdminShell';
import { OverviewScreen } from '@/components/screens/OverviewScreen';

export default function OverviewPage() {
  return (
    <AdminShell>
      <OverviewScreen />
    </AdminShell>
  );
}
