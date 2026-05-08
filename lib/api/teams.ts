import { apiFetch } from "../api-client";

export type Team       = { id: string; owner_id: string; name: string };
export type TeamMember = { user_id: string; team_id: string; role: number; status: number };
export type Project    = { id: string; team_id: string | null; mentor_id: string | null; title: string; description: string; category: number; phase: number; status: number; image_url: string | null; notes: string | null; problem: string | null; solution: string | null; value_proposition: string | null; customer_segments: string | null; competition: string | null };

export const teamsApi = {
  getTeam:          (id: string) => apiFetch<Team>(`/api/teams/teams/${id}`),
  createTeam:       (body: Omit<Team, "id">) => apiFetch<Team>("/api/teams/teams", { method: "POST", body: JSON.stringify(body) }),
  updateTeam:       (id: string, body: Partial<Team>) => apiFetch<Team>(`/api/teams/teams/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteTeam:       (id: string) => apiFetch<boolean>(`/api/teams/teams/${id}`, { method: "DELETE" }),
  getMembers:       (teamId: string) => apiFetch<TeamMember[]>(`/api/teams/teams/${teamId}/members`),
  addMember:        (teamId: string, body: Omit<TeamMember, "team_id">) => apiFetch<TeamMember>(`/api/teams/teams/${teamId}/members`, { method: "POST", body: JSON.stringify(body) }),
  updateMember:     (teamId: string, userId: string, status: number) => apiFetch<boolean>(`/api/teams/teams/${teamId}/members/${userId}`, { method: "PATCH", body: JSON.stringify({ status }) }),
  removeMember:     (teamId: string, userId: string) => apiFetch<boolean>(`/api/teams/teams/${teamId}/members/${userId}`, { method: "DELETE" }),
  getProject:       (id: string) => apiFetch<Project>(`/api/teams/projects/${id}`),
  createProject:    (body: Omit<Project, "id" | "phase" | "status" | "image_url" | "notes" | "problem" | "solution" | "value_proposition" | "customer_segments" | "competition">) => apiFetch<Project>("/api/teams/projects", { method: "POST", body: JSON.stringify(body) }),
  updateProject:    (id: string, body: Partial<Project>) => apiFetch<Project>(`/api/teams/projects/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  deleteProject:    (id: string) => apiFetch<boolean>(`/api/teams/projects/${id}`, { method: "DELETE" }),
};
