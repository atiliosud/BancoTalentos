import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Disponibilidade } from '../Models/Disponibilidade';

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeService {
  apiURL = 'api/disponibilidade';

  constructor(private httpClient: HttpClient) {

  }

  public createAvailability(Availability: Disponibilidade){
    return this.httpClient.post(`${this.apiURL}/`, Availability);
  }

  public updateAvailability(Availability: Disponibilidade){
    return this.httpClient.put(`${this.apiURL}/${Availability.id}`, Availability);
  }

  public getAvailabilityByCandidateId(candidateId: number){
    return this.httpClient.get(`${this.apiURL}/${candidateId}`);
  }

  public getAvailabilities(){
    return this.httpClient.get<Disponibilidade[]>(`${this.apiURL}/List`);
  }
}
