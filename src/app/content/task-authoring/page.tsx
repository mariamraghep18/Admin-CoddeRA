import { AdminShell } from '@/components/shell/AdminShell';
import { TaskAuthoringScreen } from '@/components/screens/TaskAuthoringScreen';

export default function TaskAuthoringPage() {
  return (
    <AdminShell>
      <TaskAuthoringScreen />
    </AdminShell>
  );
}
