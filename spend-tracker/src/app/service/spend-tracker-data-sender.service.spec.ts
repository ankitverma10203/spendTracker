import { TestBed } from '@angular/core/testing';

import { SpendTrackerDataSenderService } from './spend-tracker-data-sender.service';

describe('SpendTrackerDataSenderService', () => {
  let service: SpendTrackerDataSenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendTrackerDataSenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
