export enum CourseStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  ARCHIVED = 'ARCHIVED',
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructorId: string;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
  price?: number;
  thumbnailUrl?: string;
}

export type CoursePreview = Pick<Course, 'id' | 'title' | 'thumbnailUrl'>;