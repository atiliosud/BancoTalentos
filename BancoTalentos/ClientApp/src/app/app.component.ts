import { Component } from '@angular/core';
import { CandidatoService } from '../Services/candidato.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UDS Test - Banco de Talentos';
  constructor(private apiService: CandidatoService) {}
}
