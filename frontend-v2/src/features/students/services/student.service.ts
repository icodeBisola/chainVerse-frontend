type Student = {
  id: string
  name: string
  email?: string
  avatarUrl?: string
  enrolledCourseIds?: string[]
  completedCourseIds?: string[]
}

type StudentListResponse = {
  data: Student[]
  total: number
}

type StudentPayload = {
  name: string
  email?: string
  avatarUrl?: string
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

export const studentService = {
  list: (page = 1, pageSize = 10) =>
    request<StudentListResponse>(`/students?page=${page}&pageSize=${pageSize}`),
  getById: (id: string) => request<Student>(`/students/${id}`),
  create: (payload: StudentPayload) =>
    request<Student>('/students', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  update: (id: string, payload: Partial<StudentPayload>) =>
    request<Student>(`/students/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
  remove: (id: string) =>
    request<{ success: boolean }>(`/students/${id}`, {
      method: 'DELETE',
    }),
}
