import { AdminShell } from '@/components/shell/AdminShell';
import { StudentOrgManagedScreen } from '@/components/screens/StudentOrgManagedScreen';
import { initialStudents } from '@/data/mockData';

export function generateStaticParams() {
  return initialStudents
    .filter((s) => s.type === 'org-managed')
    .map((s) => ({ id: s.id }));
}

export default async function StudentOrgManagedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <StudentOrgManagedScreen studentId={id} />
    </AdminShell>
  );
}
