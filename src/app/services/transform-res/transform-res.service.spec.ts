import { TestBed } from '@angular/core/testing';

import { TransformResService } from './transform-res.service';

describe('TransformResService', () => {
  let service: TransformResService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransformResService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
