import React from 'react';
import { StudentDashboardPage } from '@/features/students/pages/StudentDashboardPage';

/**
 * #99 Refactor: This route file is now a thin wrapper.
 * All dashboard logic is managed within the students feature module.
 */
const StudentDashboardRoute: React.FC = () => {
  return <StudentDashboardPage />;
};

export default StudentDashboardRoute;