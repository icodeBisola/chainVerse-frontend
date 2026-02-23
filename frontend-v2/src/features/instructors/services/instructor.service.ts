import type {
	Instructor,
	InstructorListResponse,
	InstructorPayload,
} from '../types/instructor.types'

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

export const instructorService = {
	list: (page = 1, pageSize = 10) =>
		request<InstructorListResponse>(
			`/instructors?page=${page}&pageSize=${pageSize}`
		),
	getById: (id: string) => request<Instructor>(`/instructors/${id}`),
	create: (payload: InstructorPayload) =>
		request<Instructor>('/instructors', {
			method: 'POST',
			body: JSON.stringify(payload),
		}),
	update: (id: string, payload: Partial<InstructorPayload>) =>
		request<Instructor>(`/instructors/${id}`, {
			method: 'PATCH',
			body: JSON.stringify(payload),
		}),
	remove: (id: string) =>
		request<{ success: boolean }>(`/instructors/${id}`, {
			method: 'DELETE',
		}),
}
