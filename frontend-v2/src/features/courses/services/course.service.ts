type Course = {
  id: string
  title: string
  description?: string
  thumbnailUrl?: string
  instructorId?: string
  rating?: number
  studentCount?: number
  price?: number
}

type CourseListResponse = {
  data: Course[]
  total: number
}

type CoursePayload = {
  title: string
  description?: string
  thumbnailUrl?: string
  instructorId?: string
  price?: number
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? ''

const request = async <T>(path: string, options?: RequestInit): Promise<T> => {
  if (!API_BASE_URL) {
    throw new Error('NEXT_PUBLIC_API_BASE_URL is not set')
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers ?? {}),
    },
    ...options,
  })

  if (!response.ok) {
    const message = await response.text()
    throw new Error(message || 'Request failed')
  }

  return response.json() as Promise<T>
}

export const courseService = {
  list: (page = 1, pageSize = 10) =>
    request<CourseListResponse>(`/courses?page=${page}&pageSize=${pageSize}`),
  getById: (id: string) => request<Course>(`/courses/${id}`),
  create: (payload: CoursePayload) =>
    request<Course>('/courses', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: Partial<CoursePayload>) =>
    request<Course>(`/courses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    request<{ success: boolean }>(`/courses/${id}`, {
      method: 'DELETE',
    }),
}
