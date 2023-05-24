import { TestBed } from '@angular/core/testing';

import { MicrosoftLoginService } from './microsoft-login.service';

describe('MicrosoftLoginService', () => {
  let service: MicrosoftLoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrosoftLoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
