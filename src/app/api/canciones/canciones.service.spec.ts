import { TestBed } from '@angular/core/testing';

import { CancionesService } from './canciones.service';

describe('CancionesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CancionesService = TestBed.get(CancionesService);
    expect(service).toBeTruthy();
  });
});
