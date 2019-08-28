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

  public candidateForm: FormGroup;
  promise: any;

  constructor(private formBuilder: FormBuilder,
            private candidatoService: CandidatoService,
            private cidadeService: CidadeService,
            private estadoService: EstadoService,
            private disponibilidadeService: DisponibilidadeService,
            private horarioService: HorarioService,
            private router: Router
            )
  {
    this.promise = this.initialize();
  }


  ngOnInit() {
  }

  async initialize() {
    await this.candidatoService.getCandidates()
      .then(resp => { this.candidatos = resp; });

    await this.cidadeService.getCities()
      .then(resp => { this.cidades = resp; });

    await this.estadoService.getStates()
      .then(resp => { this.estados = resp; });

    await this.disponibilidadeService.getAvailabilities()
      .then(resp => { this.disponibilidades = resp; });

    await this.horarioService.getSchedules()
      .then(resp => { this.horarios = resp; });

    console.log(this.candidatos);
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
      candidatos: this.formBuilder.array(this.candidatos),
      cidades: this.formBuilder.array(this.cidades),
      estados: this.formBuilder.array(this.estados),
      disponibilidades: this.formBuilder.array(this.disponibilidades),
      horarios: this.formBuilder.array(this.horarios)
    });
  }

  async onSubmit() {
    console.log(JSON.stringify(this.candidateForm.value));

    if (!this.candidateForm.valid) {
      return false;
    } else {
      // chamando a função createForm para limpar os campos na tela
      this.createForm(new Candidato());
      alert(JSON.stringify(this.candidateForm.value));
    }

    await this.candidatoService.createCandidate(this.candidateForm.value)
      .then( resp => {
        alert('Cadastro efetuado com sucesso!');
        this.router.navigate(['cadastrocandidatoconcluido']);
      },
      error => console.error(error));

  }
}
