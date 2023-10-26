
import { Router } from '@angular/router';
import { ComponentService } from '../services/services/component.service';
import { ComponentModel } from '../models/component-model';
import { Component } from '@angular/core';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(private router: Router, private componentService: ComponentService) {}
  clearAuth(){
    localStorage.removeItem('token');
  }

  doLogout(){
    this.clearAuth();
    this.router.navigate(['./login']);
  }

  public activateServo(){

    const componentModel:ComponentModel = {

      identifier: 'C8:F0:9E:7B:06:60',
      active: true,
      angle: 180,
      time: 2000,
    }

    console.log(this.componentService.activateServo(componentModel));
  }
}
