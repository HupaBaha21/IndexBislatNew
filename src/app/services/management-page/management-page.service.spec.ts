import { TestBed } from '@angular/core/testing';

import { ManagementPageService } from './management-page.service';

describe('ManagementPageService', () => {
  let service: ManagementPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManagementPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
