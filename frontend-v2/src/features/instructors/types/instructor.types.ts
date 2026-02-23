export interface Instructor {
  id: string
  name: string
  title?: string
  bio?: string
  avatarUrl?: string
  rating?: number
  courseCount?: number
  studentCount?: number
  initials?: string
  avatarColor?: string
}

export interface InstructorListResponse {
  data: Instructor[]
  total: number
}

export interface InstructorPayload {
  name: string
  title?: string
  bio?: string
  avatarUrl?: string
}
