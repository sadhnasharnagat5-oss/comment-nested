import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { beforeEach, describe, it } from 'node:test';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
  });

  
});


