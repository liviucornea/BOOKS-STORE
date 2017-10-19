import { Component, Injectable, EventEmitter } from '@angular/core';
import { AppNotificationsMSG } from '../configuration/appSettings';



@Injectable()
export class AlertService {
  public requestConfirmationAnswer$: EventEmitter<any>;
  public sendSectionForDelete$: EventEmitter<any>;
  //noinspection TsLint
  public askConfirmation: boolean = false;
  public notificationTitle: string = AppNotificationsMSG.notificationTitle;
  alerts: Array<any> = new Array<any>();

  constructor() {
    this.requestConfirmationAnswer$ = new EventEmitter();
    this.sendSectionForDelete$ = new EventEmitter();
  }

  ok(text: string = 'N/A') {
    this.addAlert(text, 'success');
  }

  warn(text: string = 'N/A') {
    this.addAlert(text, 'warning');
    this.notificationTitle = 'Warning';
  }

  error(text: string = 'N/A') {
    this.addAlert(text, 'danger');
    this.notificationTitle = 'Error';
  }

  addAlert(text: string = 'N/A', type: string = 'success') {
    const alert = new Alert(text, type);
    this.notificationTitle = AppNotificationsMSG.notificationTitle;
    if (this.alerts.find(function (o) { return o.text === text && o.type === type; }) === undefined) {
      this.alerts.push(alert);
    }
  }

  addAlertAndRequestAnswer(text: string = 'N/A', type: string = 'inputRequired', title?: string) {
    this.askConfirmation = true;
    this.notificationTitle = title ? title : AppNotificationsMSG.deletionTitle;
    const alert = new Alert(text, type);
    if (this.alerts.find(function (o) { return o.text === text && o.type === type; }) === undefined) {
      this.alerts.push(alert);
    }
  }
};

export class Alert {
  constructor(public text: string, public type: string) { }
};
