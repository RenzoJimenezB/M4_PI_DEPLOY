import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { CategoriesRepository } from './categories.repository';

describe('CategoriesService', () => {
  let service: CategoriesService;
  let mockCategoriesRepository: Partial<jest.Mocked<CategoriesRepository>>;

  beforeEach(async () => {
    mockCategoriesRepository = {
      findAll: jest.fn().mockResolvedValue([]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoriesService,
        { provide: CategoriesRepository, useValue: mockCategoriesRepository },
      ],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should be defined', () => {
    expect(mockCategoriesRepository.findAll).toBeDefined();
    expect(typeof mockCategoriesRepository.findAll).toBe('function');
  });
});
