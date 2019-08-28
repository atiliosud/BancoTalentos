import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-candidato-concluido',
  templateUrl: './cadastro-candidato-concluido.component.html',
  styleUrls: ['./cadastro-candidato-concluido.component.css']
})
export class CadastroCandidatoConcluidoComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  navegarParaCadastro() {
    setTimeout(() => {
      this.router.navigate(['/cadastrocandidatoconcluido']);
    }, 3000);
  }

}
