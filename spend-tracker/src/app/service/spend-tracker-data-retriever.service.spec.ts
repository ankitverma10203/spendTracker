import { TestBed } from '@angular/core/testing';

import { SpendTrackerDataRetrieverService } from './spend-tracker-data-retriever.service';

describe('SpendTrackerDataRetrieverService', () => {
  let service: SpendTrackerDataRetrieverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpendTrackerDataRetrieverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
