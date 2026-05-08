import { Test, TestingModule } from '@nestjs/testing';
import { MessagingController } from './messaging.controller';
import { MessagingRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo = {
  findMessageById: jest.fn(),
  findConversation: jest.fn(),
  findByReceiverId: jest.fn(),
  sendMessage: jest.fn(),
  markAsRead: jest.fn(),
  deleteMessage: jest.fn(),
} as any;

describe('MessagingController', () => {
  let controller: MessagingController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessagingController],
      providers: [{ provide: MessagingRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<MessagingController>(MessagingController);
  });

  it('getInbox delegates to repository with userId from JWT', async () => {
    mockRepo.findByReceiverId.mockResolvedValue([]);
    const mockReq = { user: { userId: 'u1' } };
    expect(await controller.getInbox(mockReq as any)).toEqual([]);
    expect(mockRepo.findByReceiverId).toHaveBeenCalledWith('u1');
  });

  it('getConversation delegates to repository', async () => {
    mockRepo.findConversation.mockResolvedValue([]);
    const mockReq = { user: { userId: 'u1' } };
    expect(await controller.getConversation(mockReq as any, 'u2')).toEqual([]);
    expect(mockRepo.findConversation).toHaveBeenCalledWith('u1', 'u2');
  });
});
