import { AdminShell } from '@/components/shell/AdminShell';
import { StudentParentManagedScreen } from '@/components/screens/StudentParentManagedScreen';
import { initialStudents } from '@/data/mockData';

export function generateStaticParams() {
  return initialStudents
    .filter((s) => s.type !== 'org-managed')
    .map((s) => ({ id: s.id }));
}

export default async function StudentParentManagedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <StudentParentManagedScreen studentId={id} />
    </AdminShell>
  );
}
