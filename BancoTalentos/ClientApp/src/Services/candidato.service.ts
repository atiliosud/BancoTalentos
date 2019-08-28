import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Candidato } from '../Models/candidato';

@Injectable({
  providedIn: 'root'
})
export class CandidatoService {
  apiURL = 'api/candidato';

  constructor(private httpClient: HttpClient) {

  }

  public async createCandidate(Candidate: Candidato){
    return await this.httpClient.post(`${this.apiURL}/`, Candidate).toPromise();
  }

  public async updateCandidate(Candidate: Candidato){
    return await this.httpClient.put(`${this.apiURL}/${Candidate.id}`, Candidate).toPromise();
  }

  public async getCandidateById(id: number){
    return await this.httpClient.get(`${this.apiURL}/${id}`).toPromise();
  }

  public async getCandidates(){
    return await this.httpClient.get<Candidato[]>(`${this.apiURL}/List`).toPromise();
  }
}
