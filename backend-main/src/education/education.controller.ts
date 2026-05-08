import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Auth } from '../auth/decorators/auth-type.decorator';
import { Role } from '../entities/role';
import { EducationRepository } from '../persistence';
import type {
  NewSchool,
  NewStudent,
  NewMentor,
  NewCategory,
} from '../persistence';

@Controller('/api/education')
export class EducationController {
  constructor(private readonly educationRepository: EducationRepository) {}

  // ── Schools ────────────────────────────────────────────────────────────────

  @Auth()
  @Get('schools/:id')
  findSchoolById(@Param('id') id: string) {
    return this.educationRepository.findSchoolById(id);
  }

  @Auth()
  @Get('schools')
  findSchoolsByCity(@Query('city') city: string) {
    return this.educationRepository.findSchoolsByCity(city);
  }

  @Auth(Role.Admin)
  @Post('schools')
  createSchool(@Body() data: NewSchool) {
    return this.educationRepository.createSchool(data);
  }

  @Auth(Role.Admin, Role.SchoolAdmin)
  @Patch('schools/:id')
  updateSchool(@Param('id') id: string, @Body() data: Partial<NewSchool>) {
    return this.educationRepository.updateSchool(id, data);
  }

  @Auth(Role.Admin)
  @Delete('schools/:id')
  deleteSchool(@Param('id') id: string) {
    return this.educationRepository.deleteSchool(id);
  }

  // ── Students ───────────────────────────────────────────────────────────────

  @Auth()
  @Get('students/:userId')
  findStudentByUserId(@Param('userId') userId: string) {
    return this.educationRepository.findStudentByUserId(userId);
  }

  @Auth(Role.SchoolAdmin, Role.Admin)
  @Get('students')
  findStudentsBySchoolId(@Query('schoolId') schoolId: string) {
    return this.educationRepository.findStudentsBySchoolId(schoolId);
  }

  @Auth(Role.Admin)
  @Post('students')
  createStudent(@Body() data: NewStudent) {
    return this.educationRepository.createStudent(data);
  }

  @Auth(Role.Admin)
  @Patch('students/:userId')
  updateStudent(@Param('userId') userId: string, @Body() data: Partial<NewStudent>) {
    return this.educationRepository.updateStudent(userId, data);
  }

  // ── Mentors ────────────────────────────────────────────────────────────────

  @Auth()
  @Get('mentors/:userId')
  findMentorByUserId(@Param('userId') userId: string) {
    return this.educationRepository.findMentorByUserId(userId);
  }

  // ── Categories ─────────────────────────────────────────────────────────────

  @Get('categories')
  findAllCategories() {
    return this.educationRepository.findAllCategories();
  }
}
