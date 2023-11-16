import { Router } from '@angular/router';
import { ComponentService } from '../services/services/component.service';
import { ComponentModel } from '../models/component-model';
import { Component } from '@angular/core';
import { SensorService } from '../services/services/sensor.service';
import { SensorModel } from '../models/sensor-model';
import { firstValueFrom } from 'rxjs';
import { interval, Subscription } from 'rxjs';
import { takeWhile, switchMap, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
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

  public activateServo(){
    const componentModel: ComponentModel = {
      identifier: 'C8:F0:9E:7B:06:60',
      active: true,
      angle: 180,
      time: 2000,
    }

    console.log(this.componentService.activateServo(componentModel));
  }

  takeData() {
    this.stopAutoFeed();

    if (this.autoFeedEnabled) {
      const interval$ = interval(2000)
        .pipe(
          startWith(0),
          switchMap(() => this.lastRegistry()),
          takeWhile(() => this.alive)
        );

      this.autoFeedSubscription = interval$.subscribe((sensor) => {
        if (sensor) {
          console.log(sensor);
        }

        if (!this.feedButtonClicked && sensor) {
          this.feedButtonClicked = true;
          console.log("Dados do Botão FEED:", sensor);
        }
      });
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
