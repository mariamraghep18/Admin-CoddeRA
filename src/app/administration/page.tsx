import { AdminShell } from '@/components/shell/AdminShell';
import { AdministrationScreen } from '@/components/screens/AdministrationScreen';

export default function AdministrationPage() {
  return (
    <AdminShell>
      <AdministrationScreen />
    </AdminShell>
  );
}
