import React from "react";
import { useStudents } from "../hooks/useStudents"; // Assuming this follows the useCourses pattern
import { StudentList } from "../components/StudentList";
import { StudentStats } from "../components/StudentStats";
import { PageHeader } from "@/src/shared/components/layout/PageHeader";

export const StudentDashboardPage: React.FC = () => {
  const { students, isLoading, error, refresh } = useStudents();

  if (error)
    return (
      <div className="p-4 text-red-500">
        Error loading students: {error.message}
      </div>
    );

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Student Directory"
        subtitle="Manage and view all enrolled students."
        action={<button className="btn-primary">Add Student</button>}
      />

      {isLoading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-gray-200 rounded-lg" />
          <div className="h-64 bg-gray-200 rounded-lg" />
        </div>
      ) : (
        <>
          <StudentStats students={students} />
          <StudentList students={students} />
        </>
      )}
    </div>
  );
};
