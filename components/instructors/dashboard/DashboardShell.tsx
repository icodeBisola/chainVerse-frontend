'use client';
import { useState } from 'react';

import InstructorDashboardHeader from './header';
import NotificationBar from './notification-bar';
import { instructorRoutes, instructor } from '@/lib/mock-data/instructorsData';
import InstructorSidebar from '@/components/instructorSidebar';
import { activities, alerts } from '@/lib/mock-data/notification-data';

import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';

export default function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showNotification, setShowNotification] = useState(false);
  const handleNotificationToggle = () => setShowNotification((prev) => !prev);

  return (
    <SidebarProvider>
      <InstructorSidebar routes={instructorRoutes} />
      <SidebarInset className="flex flex-col min-h-screen">
        <InstructorDashboardHeader
          user={instructor}
          handleNotificationToggle={handleNotificationToggle}
        />
        <main className="p-4 flex-1">{children}</main>

        {/* Notificación */}
        {showNotification && (
          <div className="absolute z-50 right-2 top-2">
            <NotificationBar
              activities={activities}
              alerts={alerts}
              setShowNotification={() => setShowNotification(false)}
            />
          </div>
        )}
      </SidebarInset>
    </SidebarProvider>
  );
}
