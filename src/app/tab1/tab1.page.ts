
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
export class Tab1Page {
  autoFeedEnabled = false;
  private alive = true;
  private autoFeedSubscription: Subscription | undefined;
  public dataValue: any;



  constructor(private router: Router, private componentService: ComponentService, private sensorService: SensorService) {this.dataValue}

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
      angle: 180,
      time: 2000,
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
      const interval$ = interval(2000)
        .pipe(
          startWith(0),
          switchMap(() => this.lastRegistry()),
          takeWhile(() => this.alive)
        );

      this.autoFeedSubscription = interval$.subscribe((sensor) => {
        console.log(sensor);
        this.dataValue = sensor;
      });
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
