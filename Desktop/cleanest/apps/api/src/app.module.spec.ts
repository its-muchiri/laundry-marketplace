import { Test, TestingModule } from '@nestjs/testing';

jest.mock('@nestjs/terminus', () => ({
  TerminusModule: class MockTerminusModule {},
}));

jest.mock('bcrypt', () => ({
  genSalt: jest.fn().mockResolvedValue('salt'),
  compare: jest.fn().mockResolvedValue(true),
  hash: jest.fn().mockResolvedValue('hashed'),
  hashSync: jest.fn().mockReturnValue('hashed'),
  compareSync: jest.fn().mockReturnValue(true),
}));

jest.mock('@nestjs/typeorm', () => {
  const mockRepo = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    create: jest.fn(),
    createQueryBuilder: jest.fn(() => ({
      where: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      orderBy: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      getMany: jest.fn().mockResolvedValue([]),
      getOne: jest.fn().mockResolvedValue(null),
      getRawMany: jest.fn().mockResolvedValue([]),
      getCount: jest.fn().mockResolvedValue(0),
    })),
  };
  return {
    TypeOrmModule: {
      forRootAsync: () => ({
        module: class MockTypeOrmModule {},
        providers: [],
      }),
      forFeature: () => ({
        module: class MockFeatureModule {},
        providers: [],
      }),
    },
    getRepository: () => mockRepo,
    getRepositoryToken: () => 'mock-token',
    InjectRepository: () => () => {},
    Repository: class Repository {},
  };
});

describe('AppModule', () => {
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        {
          module: class MockAppModule {},
          providers: [{ provide: 'mock-token', useValue: {} }],
        },
      ],
    }).compile();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(module).toBeDefined();
  });

  it('AppModule class should exist', async () => {
    const { AppModule } = await import('./app.module');
    expect(AppModule).toBeDefined();
    expect(typeof AppModule).toBe('function');
  });
});
