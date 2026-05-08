import { Injectable } from '@nestjs/common';
import { eq, and } from 'drizzle-orm';
import { TeamsRepository, Team, NewTeam, TeamMember, NewTeamMember, Project, NewProject } from '../abstracts';
import { PostgresProvider } from './postgres.provider';
import { teams, teamMembers, projects } from '../schema';

@Injectable()
export class PgTeamsRepository extends TeamsRepository {
  constructor(private readonly pg: PostgresProvider) {
    super();
  }

  private get db() {
    return this.pg.db;
  }

  // ─── Teams ───────────────────────────────────────────

  async findTeamById(id: string): Promise<Team | null> {
    const rows = await this.db.select().from(teams).where(eq(teams.id, id));
    return rows[0] ?? null;
  }

  async findTeamsByOwnerId(ownerId: string): Promise<Team[]> {
    return this.db.select().from(teams).where(eq(teams.owner_id, ownerId));
  }

  async createTeam(data: NewTeam): Promise<Team> {
    const rows = await this.db.insert(teams).values(data).returning();
    return rows[0];
  }

  async updateTeam(id: string, data: Partial<NewTeam>): Promise<Team | null> {
    const rows = await this.db.update(teams).set(data).where(eq(teams.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteTeam(id: string): Promise<boolean> {
    const rows = await this.db.delete(teams).where(eq(teams.id, id)).returning();
    return rows.length > 0;
  }

  // ─── Team Members ───────────────────────────────────

  async findMembersByTeamId(teamId: string): Promise<TeamMember[]> {
    return this.db.select().from(teamMembers).where(eq(teamMembers.team_id, teamId));
  }

  async findMembershipsByUserId(userId: string): Promise<TeamMember[]> {
    return this.db.select().from(teamMembers).where(eq(teamMembers.user_id, userId));
  }

  async addMember(data: NewTeamMember): Promise<TeamMember> {
    const rows = await this.db.insert(teamMembers).values(data).returning();
    return rows[0];
  }

  async updateMemberStatus(userId: string, teamId: string, status: number): Promise<boolean> {
    const rows = await this.db
      .update(teamMembers)
      .set({ status })
      .where(and(eq(teamMembers.user_id, userId), eq(teamMembers.team_id, teamId)))
      .returning();
    return rows.length > 0;
  }

  async removeMember(userId: string, teamId: string): Promise<boolean> {
    const rows = await this.db
      .delete(teamMembers)
      .where(and(eq(teamMembers.user_id, userId), eq(teamMembers.team_id, teamId)))
      .returning();
    return rows.length > 0;
  }

  // ─── Projects ────────────────────────────────────────

  async findProjectById(id: string): Promise<Project | null> {
    const rows = await this.db.select().from(projects).where(eq(projects.id, id));
    return rows[0] ?? null;
  }

  async findProjectsByTeamId(teamId: string): Promise<Project[]> {
    return this.db.select().from(projects).where(eq(projects.team_id, teamId));
  }

  async findProjectsByMentorId(mentorId: string): Promise<Project[]> {
    return this.db.select().from(projects).where(eq(projects.mentor_id, mentorId));
  }

  async createProject(data: NewProject): Promise<Project> {
    const rows = await this.db.insert(projects).values(data).returning();
    return rows[0];
  }

  async updateProject(id: string, data: Partial<NewProject>): Promise<Project | null> {
    const rows = await this.db.update(projects).set(data).where(eq(projects.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteProject(id: string): Promise<boolean> {
    const rows = await this.db.delete(projects).where(eq(projects.id, id)).returning();
    return rows.length > 0;
  }
}
