import NavBar from '@/components/NavBar';
import { StudentSidebar } from '@/components/student-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function StudentDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <StudentSidebar />
      <main className="min-h-screen">{children}</main>
    </SidebarProvider>
  );
}
