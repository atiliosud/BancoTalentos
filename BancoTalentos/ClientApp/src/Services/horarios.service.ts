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

  public createAvailability(Schedule: Horario){
    return this.httpClient.post(`${this.apiURL}/`, Schedule);
  }

  public updateAvailability(Schedule: Horario){
    return this.httpClient.put(`${this.apiURL}/${Schedule.id}`, Schedule);
  }

  public getScheduleByCandidateId(candidateId: number){
    return this.httpClient.get(`${this.apiURL}/${candidateId}`);
  }

  public async getSchedules(){
    return await this.httpClient.get<Horario[]>(`${this.apiURL}/List`).toPromise();
  }
}
