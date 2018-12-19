import { TestBed } from '@angular/core/testing';

import { UserResourcesService } from './user-resources.service';

describe('UserResourcesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserResourcesService = TestBed.get(UserResourcesService);
    expect(service).toBeTruthy();
  });
});
