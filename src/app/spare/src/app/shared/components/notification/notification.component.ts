import {Component, OnInit} from '@angular/core';
import {AlertService} from '../../services/alert.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  active = true;

  constructor(protected alert: AlertService) {
  }

  ngOnInit() {
  }

  closeAlerts(i) {
    this.alert.alerts.splice(i, 1);

  };

  clickOK() {
    this.closeAll();
    this.alert.requestConfirmationAnswer$.emit('OK');
    this.alert.askConfirmation = false;
  };

  clickCancel() {
    this.alert.requestConfirmationAnswer$.emit('CANCEL');
    this.alert.askConfirmation = false;
    this.closeAll();
  }

  closeAll() {
    this.alert.alerts = [];
  }
}
