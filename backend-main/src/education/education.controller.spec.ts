import { Test, TestingModule } from '@nestjs/testing';
import { EducationController } from './education.controller';
import { EducationRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo = {
  findSchoolById: jest.fn(),
  findSchoolsByCity: jest.fn(),
  createSchool: jest.fn(),
  updateSchool: jest.fn(),
  deleteSchool: jest.fn(),
  findStudentByUserId: jest.fn(),
  findStudentsBySchoolId: jest.fn(),
  createStudent: jest.fn(),
  updateStudent: jest.fn(),
  deleteStudent: jest.fn(),
  findMentorByUserId: jest.fn(),
  findMentorsByExpertise: jest.fn(),
  createMentor: jest.fn(),
  updateMentor: jest.fn(),
  deleteMentor: jest.fn(),
  findAllCategories: jest.fn(),
  createCategory: jest.fn(),
  deleteCategory: jest.fn(),
} as any;

describe('EducationController', () => {
  let controller: EducationController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducationController],
      providers: [{ provide: EducationRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<EducationController>(EducationController);
  });

  it('findSchoolById delegates to repository', async () => {
    const school = { id: 's1', admin_id: 'u1', name: 'Test', city: 'Ankara', type: 0 };
    mockRepo.findSchoolById.mockResolvedValue(school);
    expect(await controller.findSchoolById('s1')).toEqual(school);
    expect(mockRepo.findSchoolById).toHaveBeenCalledWith('s1');
  });

  it('findAllCategories delegates to repository', async () => {
    mockRepo.findAllCategories.mockResolvedValue([{ id: 1, name: 'Tech' }]);
    const result = await controller.findAllCategories();
    expect(result).toEqual([{ id: 1, name: 'Tech' }]);
  });
});
