import { Test, TestingModule } from '@nestjs/testing';
import { PostgresClient } from './postgres-client';

describe('PostgresClient', () => {
  let provider: PostgresClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PostgresClient],
    }).compile();

    provider = module.get<PostgresClient>(PostgresClient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
