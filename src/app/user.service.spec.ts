import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { beforeEach, describe } from 'node:test';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

function expect(service: UserService) {
  throw new Error('Function not implemented.');
}

