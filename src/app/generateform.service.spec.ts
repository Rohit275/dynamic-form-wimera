import { TestBed } from '@angular/core/testing';

import { GenerateformService } from './components/generate-form/generateform.service';

describe('GenerateformService', () => {
  let service: GenerateformService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenerateformService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
