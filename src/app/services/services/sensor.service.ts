import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { SensorModel } from 'src/app/models/sensor-model';

@Injectable({
  providedIn: 'root'
})
export class SensorService {

  url = 'https://smart-fish-deploy-render.onrender.com/api/v1/'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


public lastRegistry(): Observable<SensorModel> {
  return new Observable<SensorModel>(observer => {
    fetch(this.url + 'sensor/registry', {mode: 'no-cors'})
    .then(response => response.json())
    .catch(error => {
      observer.error("Erro ao recuperar o último regsitro")
    })
  })

  this.httpClient.get<SensorModel>(this.url + 'sensor/registry', {mode: 'no-cors'}).subscribe(data => {
    this.response = data;
    console.log('Subscribe excuted.')
  })
  console.log('I will not wait until subscribe is executed..');

  /*
getDataUsingSubscribe() {
    this.httpClient.get<Employee>(this.url).subscribe(data => {
      this.subscribeResult = data;
      console.log('Subscribe executed.')
    });
    console.log('I will not wait until subscribe is executed..');
  }
  */


  }
}
