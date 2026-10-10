import { AdminShell } from '@/components/shell/AdminShell';
import { OrgStep1ReviewScreen } from '@/components/screens/OrgStep1ReviewScreen';
import { initialOrganizations } from '@/data/mockData';

export function generateStaticParams() {
  return initialOrganizations.map((o) => ({ id: o.id }));
}

export default async function OrgStep1Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <OrgStep1ReviewScreen orgId={id} />
    </AdminShell>
  );
}
