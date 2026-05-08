import { Test, TestingModule } from '@nestjs/testing';
import { CommerceController } from './commerce.controller';
import { CommerceRepository } from '../persistence';
import { AuthGuard } from '../auth/auth.guard';

const mockRepo = {
  findVendorById: jest.fn(),
  findVendorsByManagerId: jest.fn(),
  createVendor: jest.fn(),
  updateVendor: jest.fn(),
  deleteVendor: jest.fn(),
  findProductById: jest.fn(),
  findProductsByVendorId: jest.fn(),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
  findCartByUserId: jest.fn(),
  addToCart: jest.fn(),
  updateCartItem: jest.fn(),
  removeFromCart: jest.fn(),
  clearCart: jest.fn(),
  findTransactionById: jest.fn(),
  findTransactionsByUserId: jest.fn(),
  findTransactionsByTeamId: jest.fn(),
  createTransaction: jest.fn(),
} as any;

describe('CommerceController', () => {
  let controller: CommerceController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommerceController],
      providers: [{ provide: CommerceRepository, useValue: mockRepo }],
    })
      .overrideGuard(AuthGuard)
      .useValue({ canActivate: () => true })
      .compile();
    controller = module.get<CommerceController>(CommerceController);
  });

  it('findVendorById delegates to repository', async () => {
    const vendor = { id: 'v1', manager_id: 'u1', name: 'ACME', logo: null, categories: [] };
    mockRepo.findVendorById.mockResolvedValue(vendor);
    expect(await controller.findVendorById('v1')).toEqual(vendor);
  });

  it('getCart reads userId from req.user', async () => {
    mockRepo.findCartByUserId.mockResolvedValue([]);
    const mockReq = { user: { userId: 'u1' } };
    expect(await controller.getCart(mockReq as any)).toEqual([]);
    expect(mockRepo.findCartByUserId).toHaveBeenCalledWith('u1');
  });
});
