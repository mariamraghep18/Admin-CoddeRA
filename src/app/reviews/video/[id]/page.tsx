import { AdminShell } from '@/components/shell/AdminShell';
import { VideoReviewStudioScreen } from '@/components/screens/VideoReviewStudioScreen';
import { initialStudents } from '@/data/mockData';

export function generateStaticParams() {
  return initialStudents.map((s) => ({ id: s.id }));
}

export default async function VideoReviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AdminShell>
      <VideoReviewStudioScreen studentId={id} />
    </AdminShell>
  );
}
