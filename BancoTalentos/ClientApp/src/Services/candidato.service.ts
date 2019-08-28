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

  public createCandidate(Candidate: Candidato){
    return this.httpClient.post(`${this.apiURL}/`, Candidate);
  }

  public updateCandidate(Candidate: Candidato){
    return this.httpClient.put(`${this.apiURL}/${Candidate.id}`, Candidate);
  }

  public getCandidateById(id: number){
    return this.httpClient.get(`${this.apiURL}/${id}`);
  }

  public getCandidates(){
    return this.httpClient.get<Candidato[]>(`${this.apiURL}/List`);
  }
}
