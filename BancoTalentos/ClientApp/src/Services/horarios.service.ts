import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Horario } from 'src/Models/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  apiURL = 'api/horario';

  constructor(private httpClient: HttpClient) {

  }

  public async createAvailability(Schedule: Horario){
    return await this.httpClient.post(`${this.apiURL}/`, Schedule).toPromise();
  }

  public async updateAvailability(Schedule: Horario){
    return await this.httpClient.put(`${this.apiURL}/${Schedule.id}`, Schedule).toPromise();
  }

  public async getScheduleByCandidateId(candidateId: number){
    return await this.httpClient.get(`${this.apiURL}/${candidateId}`).toPromise();
  }

  public async getSchedules(){
    return await this.httpClient.get<Horario[]>(`${this.apiURL}/List`).toPromise();
  }
}
