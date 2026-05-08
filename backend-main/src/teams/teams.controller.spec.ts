import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo = {
  findTeamById: jest.fn(),
  findTeamsByOwnerId: jest.fn(),
  createTeam: jest.fn(),
  updateTeam: jest.fn(),
  deleteTeam: jest.fn(),
  findMembersByTeamId: jest.fn(),
  findMembershipsByUserId: jest.fn(),
  addMember: jest.fn(),
  updateMemberStatus: jest.fn(),
  removeMember: jest.fn(),
  findProjectById: jest.fn(),
  findProjectsByTeamId: jest.fn(),
  findProjectsByMentorId: jest.fn(),
  createProject: jest.fn(),
  updateProject: jest.fn(),
  deleteProject: jest.fn(),
} as any;

describe('TeamsController', () => {
  let controller: TeamsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [{ provide: TeamsRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<TeamsController>(TeamsController);
  });

  it('findTeamById delegates to repository', async () => {
    const team = { id: 't1', owner_id: 'u1', name: 'Dream Team' };
    mockRepo.findTeamById.mockResolvedValue(team);
    expect(await controller.findTeamById('t1')).toEqual(team);
    expect(mockRepo.findTeamById).toHaveBeenCalledWith('t1');
  });

  it('findProjectById delegates to repository', async () => {
    mockRepo.findProjectById.mockResolvedValue(null);
    expect(await controller.findProjectById('p1')).toBeNull();
  });
});
