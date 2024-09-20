import { TestBed } from '@angular/core/testing';

import { QuizResultServiceService } from './quiz-result-service.service';

describe('QuizResultServiceService', () => {
  let service: QuizResultServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizResultServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
