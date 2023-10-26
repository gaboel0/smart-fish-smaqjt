import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComponentModel } from 'src/app/models/component-model';

@Injectable({
  providedIn: 'root'
})

export class ComponentService {

  url = 'https://smart-fish-deploy-render.onrender.com/api/v1/'

  constructor(private httpClient: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  activateServo(componentModel: ComponentModel): Observable<ComponentModel> {
    console.log("Deu bom familia");
    return this.httpClient.post<ComponentModel>(this.url + 'component/activate', JSON.stringify(componentModel), this.httpOptions);
  }
}
