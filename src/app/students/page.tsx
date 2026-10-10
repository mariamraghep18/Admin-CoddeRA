import { AdminShell } from '@/components/shell/AdminShell';
import { StudentsScreen } from '@/components/screens/StudentsScreen';

export default function StudentsPage() {
  return (
    <AdminShell>
      <StudentsScreen />
    </AdminShell>
  );
}
