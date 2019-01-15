import { TestBed } from '@angular/core/testing';

import { ResCatService } from './res-cat.service';

describe('ResCatService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResCatService = TestBed.get(ResCatService);
    expect(service).toBeTruthy();
  });
});
