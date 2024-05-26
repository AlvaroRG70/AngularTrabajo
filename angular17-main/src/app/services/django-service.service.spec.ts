import { TestBed } from '@angular/core/testing';

import { DjangoServiceService } from './django-service.service';

describe('DjangoServiceService', () => {
  let service: DjangoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DjangoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
