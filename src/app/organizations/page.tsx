import { AdminShell } from '@/components/shell/AdminShell';
import { OrganizationsScreen } from '@/components/screens/OrganizationsScreen';

export default function OrganizationsPage() {
  return (
    <AdminShell>
      <OrganizationsScreen />
    </AdminShell>
  );
}
