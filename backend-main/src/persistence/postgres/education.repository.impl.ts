import { Injectable } from '@nestjs/common';
import { eq, sql } from 'drizzle-orm';
import { EducationRepository, School, NewSchool, Student, NewStudent, Mentor, NewMentor, Category, NewCategory } from '../abstracts';
import { PostgresProvider } from './postgres.provider';
import { schools, students, mentors, categories } from '../schema';

@Injectable()
export class PgEducationRepository extends EducationRepository {
  constructor(private readonly pg: PostgresProvider) {
    super();
  }

  private get db() {
    return this.pg.db;
  }

  // ─── Schools ─────────────────────────────────────────

  async findSchoolById(id: string): Promise<School | null> {
    const rows = await this.db.select().from(schools).where(eq(schools.id, id));
    return rows[0] ?? null;
  }

  async findSchoolsByCity(city: string): Promise<School[]> {
    return this.db.select().from(schools).where(eq(schools.city, city));
  }

  async createSchool(data: NewSchool): Promise<School> {
    const rows = await this.db.insert(schools).values(data).returning();
    return rows[0];
  }

  async updateSchool(id: string, data: Partial<NewSchool>): Promise<School | null> {
    const rows = await this.db.update(schools).set(data).where(eq(schools.id, id)).returning();
    return rows[0] ?? null;
  }

  async deleteSchool(id: string): Promise<boolean> {
    const rows = await this.db.delete(schools).where(eq(schools.id, id)).returning();
    return rows.length > 0;
  }

  // ─── Students ────────────────────────────────────────

  async findStudentByUserId(userId: string): Promise<Student | null> {
    const rows = await this.db.select().from(students).where(eq(students.user_id, userId));
    return rows[0] ?? null;
  }

  async findStudentsBySchoolId(schoolId: string): Promise<Student[]> {
    return this.db.select().from(students).where(eq(students.school_id, schoolId));
  }

  async createStudent(data: NewStudent): Promise<Student> {
    const rows = await this.db.insert(students).values(data).returning();
    return rows[0];
  }

  async updateStudent(userId: string, data: Partial<NewStudent>): Promise<Student | null> {
    const rows = await this.db.update(students).set(data).where(eq(students.user_id, userId)).returning();
    return rows[0] ?? null;
  }

  async deleteStudent(userId: string): Promise<boolean> {
    const rows = await this.db.delete(students).where(eq(students.user_id, userId)).returning();
    return rows.length > 0;
  }

  // ─── Mentors ─────────────────────────────────────────

  async findMentorByUserId(userId: string): Promise<Mentor | null> {
    const rows = await this.db.select().from(mentors).where(eq(mentors.user_id, userId));
    return rows[0] ?? null;
  }

  async findMentorsByExpertise(categoryId: number): Promise<Mentor[]> {
    return this.db
      .select()
      .from(mentors)
      .where(sql`${categoryId} = ANY(${mentors.expertise})`);
  }

  async createMentor(data: NewMentor): Promise<Mentor> {
    const rows = await this.db.insert(mentors).values(data).returning();
    return rows[0];
  }

  async updateMentor(userId: string, data: Partial<NewMentor>): Promise<Mentor | null> {
    const rows = await this.db.update(mentors).set(data).where(eq(mentors.user_id, userId)).returning();
    return rows[0] ?? null;
  }

  async deleteMentor(userId: string): Promise<boolean> {
    const rows = await this.db.delete(mentors).where(eq(mentors.user_id, userId)).returning();
    return rows.length > 0;
  }

  // ─── Categories ──────────────────────────────────────

  async findAllCategories(): Promise<Category[]> {
    return this.db.select().from(categories).orderBy(categories.id);
  }

  async createCategory(data: NewCategory): Promise<Category> {
    const rows = await this.db.insert(categories).values(data).returning();
    return rows[0];
  }

  async deleteCategory(id: number): Promise<boolean> {
    const rows = await this.db.delete(categories).where(eq(categories.id, id)).returning();
    return rows.length > 0;
  }
}
