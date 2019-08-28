import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cidade } from '../Models/Cidade';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CidadeService {
  apiURL = 'api/cidade';

  constructor(private httpClient: HttpClient) {

  }

  public createCity(City: Cidade){
    return this.httpClient.post(`${this.apiURL}/`, City);
  }

  public updateCity(City: Cidade){
    return this.httpClient.put(`${this.apiURL}/${City.id}`, City);
  }

  public getCityById(id: number){
    return this.httpClient.get(`${this.apiURL}/${id}`);
  }

  public async getCities() {
    return await this.httpClient.get<Cidade[]>(`${this.apiURL}/List`).toPromise();
  }
}
