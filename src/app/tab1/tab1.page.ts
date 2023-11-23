
import { Router } from '@angular/router';
import { ComponentService } from '../services/services/component.service';
import { ComponentModel } from '../models/component-model';
import { Component } from '@angular/core';
import { SensorService } from '../services/services/sensor.service';
import { SensorModel } from '../models/sensor-model';
import { Subscription, firstValueFrom, interval, lastValueFrom, startWith, switchMap, takeWhile } from 'rxjs';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
// export class Tab1Page {

//   constructor(private router: Router, private componentService: ComponentService, private sensorService: SensorService) {}
//   clearAuth(){
//     localStorage.removeItem('token');

//   }

//   doLogout(){
//     this.clearAuth();
//     this.router.navigate(['./login']);
//   }

//   async activate(){

//     const componentModel:ComponentModel = {

//       identifier: 'C8:F0:9E:7B:06:60',
//       active: true,
//       angle: 180,
//       time: 2000,
//     }

//     try {
//       const data = await  lastValueFrom(this.componentService.activate(componentModel));
//       console.log(data);
//     } catch (error) {
//       console.error('Erro durante a solicitação HTTP:', error);
//       throw error;
//     }
//   }

//   async lastRegistry() {
//     try {
//       const data = await firstValueFrom(this.sensorService.lastRegistry());
//       console.log(data);
//     } catch (error) {
//       console.error(error);
//     }
//   }
// }

export class Tab1Page {
  private feedButtonClicked = false;
  autoFeedEnabled = false;
  private alive = true;
  private autoFeedSubscription: Subscription | undefined;

  constructor(private router: Router, private componentService: ComponentService, private sensorService: SensorService) {}

  clearAuth(){
    localStorage.removeItem('token');
  }

  doLogout(){
    this.clearAuth();
    this.router.navigate(['./login']);
  }

  async activate(){

    const componentModel:ComponentModel = {

      identifier: 'C8:F0:9E:7B:06:60',
      active: true,
      angle: 30,
      time: 500,
    }

    try {
      const data = await  lastValueFrom(this.componentService.activate(componentModel));
      console.log(data);
    } catch (error) {
      console.error('Erro durante a solicitação HTTP:', error);
      throw error;
    }
  }

  takeData() {
    this.stopAutoFeed();

    if (this.autoFeedEnabled) {
      const interval$ = interval(1000)
        .pipe(
          startWith(0),
          switchMap(() => this.activate()),
          takeWhile(() => this.alive)
        );

      this.autoFeedSubscription = interval$.subscribe();
    }
  }

  private stopAutoFeed() {
    if (this.autoFeedSubscription) {
      this.autoFeedSubscription.unsubscribe();
    }
  }

  async lastRegistry(): Promise<SensorModel | null> {
    try {
      return await firstValueFrom(this.sensorService.lastRegistry());
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  toggleAutoFeed() {
    this.autoFeedEnabled = !this.autoFeedEnabled;

    if (this.autoFeedEnabled) {
      this.takeData();
    } else {
      this.stopAutoFeed();
    }
  }

  ngOnInit() {
    this.takeData();
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
