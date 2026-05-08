import { schools, students, mentors, categories } from '../schema';

export type School = typeof schools.$inferSelect;
export type NewSchool = typeof schools.$inferInsert;
export type Student = typeof students.$inferSelect;
export type NewStudent = typeof students.$inferInsert;
export type Mentor = typeof mentors.$inferSelect;
export type NewMentor = typeof mentors.$inferInsert;
export type Category = typeof categories.$inferSelect;
export type NewCategory = typeof categories.$inferInsert;

export abstract class EducationRepository {
  // Schools
  abstract findSchoolById(id: string): Promise<School | null>;
  abstract findSchoolsByCity(city: string): Promise<School[]>;
  abstract createSchool(data: NewSchool): Promise<School>;
  abstract updateSchool(id: string, data: Partial<NewSchool>): Promise<School | null>;
  abstract deleteSchool(id: string): Promise<boolean>;

  // Students
  abstract findStudentByUserId(userId: string): Promise<Student | null>;
  abstract findStudentsBySchoolId(schoolId: string): Promise<Student[]>;
  abstract createStudent(data: NewStudent): Promise<Student>;
  abstract updateStudent(userId: string, data: Partial<NewStudent>): Promise<Student | null>;
  abstract deleteStudent(userId: string): Promise<boolean>;

  // Mentors
  abstract findMentorByUserId(userId: string): Promise<Mentor | null>;
  abstract findMentorsByExpertise(categoryId: number): Promise<Mentor[]>;
  abstract createMentor(data: NewMentor): Promise<Mentor>;
  abstract updateMentor(userId: string, data: Partial<NewMentor>): Promise<Mentor | null>;
  abstract deleteMentor(userId: string): Promise<boolean>;

  // Categories
  abstract findAllCategories(): Promise<Category[]>;
  abstract createCategory(data: NewCategory): Promise<Category>;
  abstract deleteCategory(id: number): Promise<boolean>;
}
