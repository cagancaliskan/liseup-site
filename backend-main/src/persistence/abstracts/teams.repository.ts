import { teams, teamMembers, projects } from '../schema';

export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;

export abstract class TeamsRepository {
  // Teams
  abstract findTeamById(id: string): Promise<Team | null>;
  abstract findTeamsByOwnerId(ownerId: string): Promise<Team[]>;
  abstract createTeam(data: NewTeam): Promise<Team>;
  abstract updateTeam(id: string, data: Partial<NewTeam>): Promise<Team | null>;
  abstract deleteTeam(id: string): Promise<boolean>;

  // Team Members
  abstract findMembersByTeamId(teamId: string): Promise<TeamMember[]>;
  abstract findMembershipsByUserId(userId: string): Promise<TeamMember[]>;
  abstract addMember(data: NewTeamMember): Promise<TeamMember>;
  abstract updateMemberStatus(userId: string, teamId: string, status: number): Promise<boolean>;
  abstract removeMember(userId: string, teamId: string): Promise<boolean>;

  // Projects
  abstract findProjectById(id: string): Promise<Project | null>;
  abstract findProjectsByTeamId(teamId: string): Promise<Project[]>;
  abstract findProjectsByMentorId(mentorId: string): Promise<Project[]>;
  abstract createProject(data: NewProject): Promise<Project>;
  abstract updateProject(id: string, data: Partial<NewProject>): Promise<Project | null>;
  abstract deleteProject(id: string): Promise<boolean>;
}
