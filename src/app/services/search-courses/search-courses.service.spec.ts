import { TestBed } from '@angular/core/testing';

import { SearchCoursesService } from './search-courses.service';

describe('SearchCoursesService', () => {
  let service: SearchCoursesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchCoursesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
