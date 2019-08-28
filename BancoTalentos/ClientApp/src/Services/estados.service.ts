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

  public async getStates(){
    return await this.httpClient.get<Estado[]>(`${this.apiURL}/List`).toPromise();
  }
}
