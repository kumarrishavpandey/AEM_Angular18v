import { TestBed } from '@angular/core/testing';

import { ApprovalCardService } from './approval-card.service';

describe('ApprovalCardService', () => {
  let service: ApprovalCardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApprovalCardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
