import { TestBed, inject } from '@angular/core/testing';

import { CandidatoService } from '../Services/candidato.service';

describe('ApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CandidatoService]
    });
  });

  it('should be created', inject([CandidatoService], (service: CandidatoService) => {
    expect(service).toBeTruthy();
  }));
});
