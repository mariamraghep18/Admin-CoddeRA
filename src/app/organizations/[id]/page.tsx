import { AdminShell } from '@/components/shell/AdminShell';
import { OrganizationDetailScreen } from '@/components/screens/OrganizationDetailScreen';
import { initialOrganizations } from '@/data/mockData';

export function generateStaticParams() {
  return initialOrganizations.map((o) => ({ id: o.id }));
}

export default async function OrganizationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <OrganizationDetailScreen orgId={id} />
    </AdminShell>
  );
}
