import { TestBed, inject } from '@angular/core/testing';

import { DisponibilidadeService } from './disponibilidades.service';

describe('DisponibilidadesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DisponibilidadeService]
    });
  });

  it('should be created', inject([DisponibilidadeService], (service: DisponibilidadeService) => {
    expect(service).toBeTruthy();
  }));
});
