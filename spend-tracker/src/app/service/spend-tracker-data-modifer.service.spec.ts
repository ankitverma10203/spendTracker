import { TestBed } from '@angular/core/testing';

import { SpendTrackerDataModiferService } from './spend-tracker-data-modifer.service';

describe('SpendTrackerDataModiferService', () => {
  let service: SpendTrackerDataModiferService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendTrackerDataModiferService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
