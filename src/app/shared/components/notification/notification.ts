import {Component} from '@angular/core';
import {AlertService} from '../../service/alert.service';


@Component({
  selector: 'app-notification',
  templateUrl: 'notification.html'

})
export class NotificationComponent {
  active = true;

  constructor(private alert: AlertService) {
  };

  closeAlerts(i) {
    this.alert.alerts.splice(i, 1);

  };

  clickOK() {
    this.alert.requestConfirmationAnswer$.emit('OK');
    this.alert.askConfirmation = false;
    this.closeAll();
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
