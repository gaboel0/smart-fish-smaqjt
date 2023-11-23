import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';
import { ComponentModel } from 'src/app/models/component-model';

@Injectable({
  providedIn: 'root'
})
export class ComponentService {

  url = 'https://smart-fish-deploy-render.onrender.com/api/v1/'
  local = 'http://localhost:8080/api/v1/'


  component: ComponentModel = {} as ComponentModel;

  constructor(private httpClient: HttpClient) {}

   httpHeader  = {
    headers: new HttpHeaders({ 
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': this.url,
      'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
     })  
  };


  public activate(componentModel: ComponentModel): Observable<any> {
    return this.httpClient.post<ComponentModel>(`${this.url}component/activate`, componentModel, this.httpHeader)
      .pipe(
        tap(data => {
          // this.component = data;
          console.log('Subscribe executado.');
        }),
        catchError(error => {
          console.error('Erro durante a solicitação HTTP:', error);
          throw error;
        })
      );
  }
}
