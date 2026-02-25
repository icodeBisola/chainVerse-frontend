import React from 'react';
import { CourseStatus } from '../types/course.types';
import { cn } from '@/lib';
import { PageHeader } from '@/src/shared/components/layout/PageHeader';

// Mock data to visualize the implementation
const MOCK_COURSES = [
  { id: '1', title: 'Introduction to React', instructor: 'Jane Doe', status: CourseStatus.PUBLISHED, price: 49.99 },
  { id: '2', title: 'Advanced TypeScript Patterns', instructor: 'John Smith', status: CourseStatus.PUBLISHED, price: 89.99 },
  { id: '3', title: 'Cloud Infrastructure with Terraform', instructor: 'Alex Rivera', status: CourseStatus.DRAFT, price: 0 },
];

export const CoursesPage = () => {
  return (
    <div className="space-y-6">
      {/* #124: Using the new PageHeader */}
      <PageHeader 
        title="Course Management" 
        subtitle="Create, edit, and monitor your curriculum performance."
        action={
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium">
            Create New Course
          </button>
        }
      />

      {/* Course Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_COURSES.map((course) => (
          <div key={course.id} className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start mb-4">
              <span className={cn(
                "px-2 py-1 text-xs font-semibold rounded-full",
                course.status === CourseStatus.PUBLISHED ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
              )}>
                {course.status}
              </span>
              <span className="text-lg font-bold text-blue-600">
                {course.price > 0 ? `$${course.price}` : 'Free'}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-1">{course.title}</h3>
            <p className="text-gray-500 text-sm mb-4">Instructor: {course.instructor}</p>
            
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded hover:bg-gray-50">Edit</button>
              <button className="flex-1 px-3 py-2 text-sm text-blue-600 font-medium hover:underline">View Analytics</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};