import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { CadastroCandidatoComponent } from './cadastro-candidato/cadastro-candidato.component';
import { CadastroCandidatoConcluidoComponent } from './cadastro-candidato-concluido/cadastro-candidato-concluido.component';

import {CandidatoService} from '../Services/candidato.service';
import {DisponibilidadeService} from '../Services/disponibilidades.service';
import {CidadeService} from '../Services/cidades.service';
import {EstadoService} from '../Services/estados.service';
import {HorarioService} from '../Services/horarios.service';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FetchDataComponent,
    CadastroCandidatoComponent,
    CadastroCandidatoConcluidoComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: CadastroCandidatoComponent, pathMatch: 'full' },
      { path: 'cadastrocandidatoconcluido', component: CadastroCandidatoConcluidoComponent }
    ])
  ],
  providers: [CandidatoService, CidadeService, DisponibilidadeService, HorarioService, EstadoService],
  bootstrap: [AppComponent],
  entryComponents: [CadastroCandidatoComponent],
})
export class AppModule { }
