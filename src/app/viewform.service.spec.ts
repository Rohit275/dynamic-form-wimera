import { TestBed } from '@angular/core/testing';

import { ViewformService } from './components/view-forms/viewform.service';

describe('ViewformService', () => {
  let service: ViewformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ViewformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
