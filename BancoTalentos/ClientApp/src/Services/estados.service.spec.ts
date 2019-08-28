import { TestBed, inject } from '@angular/core/testing';

import { EstadoService } from './estados.service';

describe('EstadosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EstadoService]
    });
  });

  it('should be created', inject([EstadoService], (service: EstadoService) => {
    expect(service).toBeTruthy();
  }));
});
