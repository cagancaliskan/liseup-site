import { apiFetch } from "../api-client";

export type School      = { id: string; admin_id: string; name: string; city: string; type: number };
export type Student     = { user_id: string; school_id: string; grade: number; parent_email: string; lp_balance: number; consent_status: boolean; achievements: unknown; total_xp: number };
export type Mentor      = { user_id: string; university: string; expertise: number[]; bio: string };
export type Category    = { id: number; name: string };

export const educationApi = {
  getSchool:           (id: string) => apiFetch<School>(`/api/education/schools/${id}`),
  getSchoolsByCity:    (city: string) => apiFetch<School[]>(`/api/education/schools?city=${encodeURIComponent(city)}`),
  createSchool:        (body: Omit<School, "id">) => apiFetch<School>("/api/education/schools", { method: "POST", body: JSON.stringify(body) }),
  updateSchool:        (id: string, body: Partial<School>) => apiFetch<School>(`/api/education/schools/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteSchool:        (id: string) => apiFetch<boolean>(`/api/education/schools/${id}`, { method: "DELETE" }),
  getStudent:          (userId: string) => apiFetch<Student>(`/api/education/students/${userId}`),
  getStudentsBySchool: (schoolId: string) => apiFetch<Student[]>(`/api/education/students?schoolId=${encodeURIComponent(schoolId)}`),
  createStudent:       (body: Omit<Student, "lp_balance" | "consent_status" | "achievements" | "total_xp">) => apiFetch<Student>("/api/education/students", { method: "POST", body: JSON.stringify(body) }),
  updateStudent:       (userId: string, body: Partial<Student>) => apiFetch<Student>(`/api/education/students/${userId}`, { method: "PATCH", body: JSON.stringify(body) }),
  getMentor:           (userId: string) => apiFetch<Mentor>(`/api/education/mentors/${userId}`),
  getCategories:       () => apiFetch<Category[]>("/api/education/categories"),
};
