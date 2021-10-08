import { TestBed } from '@angular/core/testing';

import { BaseUrlInterceptorService } from './base-url-interceptor.service';

describe('BaseUrlInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaseUrlInterceptorService = TestBed.get(BaseUrlInterceptorService);
    expect(service).toBeTruthy();
  });
});
