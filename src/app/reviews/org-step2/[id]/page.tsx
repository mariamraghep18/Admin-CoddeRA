import { AdminShell } from '@/components/shell/AdminShell';
import { OrgStep2ReviewScreen } from '@/components/screens/OrgStep2ReviewScreen';
import { initialOrganizations } from '@/data/mockData';

export function generateStaticParams() {
  return initialOrganizations.map((o) => ({ id: o.id }));
}

export default async function OrgStep2Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <OrgStep2ReviewScreen orgId={id} />
    </AdminShell>
  );
}
