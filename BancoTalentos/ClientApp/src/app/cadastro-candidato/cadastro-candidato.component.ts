import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CandidatoService} from '../../Services/candidato.service';
import {CidadeService} from '../../Services/cidades.service';
import {EstadoService} from '../../Services/estados.service';
import {DisponibilidadeService} from '../../Services/disponibilidades.service';
import {HorarioService} from '../../Services/horarios.service';
import {Router} from '@angular/router';
import { Candidato } from 'src/Models/candidato';
import { Cidade } from 'src/Models/cidade';
import { Estado } from 'src/Models/estado';
import { Disponibilidade } from 'src/Models/disponibilidade';
import { Horario } from 'src/Models/horario';

@Component({
  selector: 'app-cadastro-candidato',
  templateUrl: './cadastro-candidato.component.html',
  styleUrls: ['./cadastro-candidato.component.css']
})
export class CadastroCandidatoComponent implements OnInit {

  public candidatos: Candidato[];
  public cidades: Cidade[];
  public estados: Estado[];
  public disponibilidades: Disponibilidade[];
  public horarios: Horario[];

  candidateForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
            private candidatoService: CandidatoService,
            private cidadeService: CidadeService,
            private estadoService: EstadoService,
            private disponibilidadeService: DisponibilidadeService,
            private horarioService: HorarioService,
            private router: Router
            )
            {
                candidatoService.getCandidates()
                .then(resp =>
                { this.candidatos = resp; });

                cidadeService.getCities()
                  .then(resp =>
                  { this.cidades = resp; });

                estadoService.getStates()
                  .then(resp =>
                  { this.estados = resp; });

                disponibilidadeService.getAvailabilities()
                  .then(resp =>
                  { this.disponibilidades = resp; });

                horarioService.getSchedules()
                  .then(resp =>
                  { this.horarios = resp; });
            }


  ngOnInit() {

    this.createForm(new Candidato());
  }

  createForm(candidato: Candidato) {
    this.candidateForm = this.formBuilder.group({
      nome: [candidato.nome, Validators.required],
      ultimonome: [candidato.ultimoNome, Validators.required],
      email: [candidato.email, Validators.required],
      skype: [candidato.skype, Validators.required],
      telefone: [candidato.telefone, Validators.required],
      portfolio: [candidato.portfolio, Validators.required],
      pretensao: [candidato.pretensao, Validators.required],
      password: [candidato.password, Validators.required],
      candidatos: this.formBuilder.array([]),
      cidades: this.formBuilder.array([]),
      estados: this.formBuilder.array([]),
      disponibilidades: this.formBuilder.array([]),
      horarios: this.formBuilder.array([])
    });
  }

  onSubmit() {

    if (!this.candidateForm.valid) {
      return false;
    } else {
      // chamando a função createForm para limpar os campos na tela
      this.createForm(new Candidato());
      alert(JSON.stringify(this.candidateForm.value));
    }

    this.candidatoService.createCandidate(this.candidateForm.value)
      .subscribe( data => {
        alert('Cadastro efetuado com sucesso!');
        this.router.navigate(['cadastrocandidatoconcluido']);
      },
      error => console.error(error));

  }
}
