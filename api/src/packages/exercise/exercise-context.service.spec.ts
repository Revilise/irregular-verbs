import { Test, TestingModule } from '@nestjs/testing';
import { ExerciseContextService } from './exercise-context.service.js';

describe('ExerciseService', () => {
  let service: ExerciseContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExerciseContextService],
    }).compile();

    service = module.get<ExerciseContextService>(ExerciseContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
