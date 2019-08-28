import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Estado } from '../Models/Estado';

@Injectable({
  providedIn: 'root'
})
export class EstadoService {
  apiURL = 'api/estado';

  constructor(private httpClient: HttpClient) {

  }

  public getStates(){
    return this.httpClient.get<Estado[]>(`${this.apiURL}/List`);
  }
}
