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

  public async createCity(City: Cidade){
    return await this.httpClient.post(`${this.apiURL}/`, City).toPromise();
  }

  public async updateCity(City: Cidade){
    return await this.httpClient.put(`${this.apiURL}/${City.id}`, City).toPromise();
  }

  public async getCityById(id: number){
    return await this.httpClient.get(`${this.apiURL}/${id}`).toPromise();
  }

  public async getCities() {
    return await this.httpClient.get<Cidade[]>(`${this.apiURL}/List`).toPromise();
  }
}
