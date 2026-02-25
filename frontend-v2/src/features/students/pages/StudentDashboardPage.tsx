import React from "react";
import { useStudents } from "../hooks/useStudents"; // Assuming this follows the useCourses pattern
import { StudentList } from "../components/StudentList";
import { StudentStats } from "../components/StudentStats";

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
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <button
          onClick={refresh}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Refresh Data
        </button>
      </header>

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
