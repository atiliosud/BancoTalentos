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

  public async createAvailability(Availability: Disponibilidade){
    return await this.httpClient.post(`${this.apiURL}/`, Availability).toPromise();
  }

  public async updateAvailability(Availability: Disponibilidade){
    return await this.httpClient.put(`${this.apiURL}/${Availability.id}`, Availability).toPromise();
  }

  public async getAvailabilityByCandidateId(candidateId: number){
    return await this.httpClient.get(`${this.apiURL}/${candidateId}`).toPromise();
  }

  public async getAvailabilities(){
    return await this.httpClient.get<Disponibilidade[]>(`${this.apiURL}/List`).toPromise();
  }
}
