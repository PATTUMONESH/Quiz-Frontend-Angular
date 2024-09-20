import { TestBed } from '@angular/core/testing';

import { SharedQuizService } from './shared-quiz.service';

describe('SharedQuizService', () => {
  let service: SharedQuizService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedQuizService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
