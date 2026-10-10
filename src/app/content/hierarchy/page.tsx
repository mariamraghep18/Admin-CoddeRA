import { AdminShell } from '@/components/shell/AdminShell';
import { ContentHierarchyScreen } from '@/components/screens/ContentHierarchyScreen';

export default function ContentHierarchyPage() {
  return (
    <AdminShell>
      <ContentHierarchyScreen />
    </AdminShell>
  );
}
