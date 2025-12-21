import Sidebar from './Sidebar';
import  { DashboardContent } from './_components/DashboardContent';

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <DashboardContent />
    </div>
  );
}