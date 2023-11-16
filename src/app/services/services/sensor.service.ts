import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { SensorModel } from 'src/app/models/sensor-model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  url = 'https://smart-fish-deploy-render.onrender.com/api/v1/'
  sensor: SensorModel | undefined;

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  public lastRegistry(): Observable<SensorModel> {
    return this.httpClient.get<SensorModel>(this.url + 'sensor/registry')
      .pipe(
        tap(data => {
          this.sensor = data;
          console.log('Subscribe executed.');
        }),
        catchError(error => {
          console.error('Error during HTTP request:', error);
          throw error;
        })
      );
  }
}
