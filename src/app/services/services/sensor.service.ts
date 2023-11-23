import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { SensorModel } from 'src/app/models/sensor-model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  url = 'https://smart-fish-deploy-render.onrender.com/api/v1/'
  local = 'http://localhost:8080/api/v1/'

  sensor: SensorModel = {} as SensorModel;

  constructor(private httpClient: HttpClient) { }

  httpHeader  = {
    headers: new HttpHeaders({ 
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': this.url,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
     })  
  };


  public lastRegistry(): Observable<SensorModel> {
    return this.httpClient.get<SensorModel>(`${this.url}sensor/registry`, this.httpHeader)
      .pipe(
        catchError(error => {
          console.error('Erro durante a solicitação HTTP', error);
          throw error;
        })
      );
  }
}
