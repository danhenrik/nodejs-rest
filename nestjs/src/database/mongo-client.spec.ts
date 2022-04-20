import { Test, TestingModule } from '@nestjs/testing';
import { MongoClient } from './mongo-client';

describe('MongoClient', () => {
  let provider: MongoClient;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MongoClient],
    }).compile();

    provider = module.get<MongoClient>(MongoClient);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
