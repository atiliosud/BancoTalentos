import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroCandidatoConcluidoComponent } from './cadastro-candidato-concluido.component';

describe('CadastroCandidatoConcluidoComponent', () => {
  let component: CadastroCandidatoConcluidoComponent;
  let fixture: ComponentFixture<CadastroCandidatoConcluidoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroCandidatoConcluidoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroCandidatoConcluidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
