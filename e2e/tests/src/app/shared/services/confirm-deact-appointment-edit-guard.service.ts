import {Injectable} from '@angular/core';
import {CanDeactivate} from '@angular/router';
import {AppointmentEditComponent} from '../../appointments/appointment-edit/appointment-edit.component';
import {AlertService} from './alert.service';

@Injectable()
export class ConfirmDeactAppointmentEditGuardService
  implements CanDeactivate<AppointmentEditComponent> {

  constructor(private alert: AlertService) {
  }

  canDeactivate(target: AppointmentEditComponent) {
    const self = this;
    if (target.hasChanges()) {
      self.alert.addAlertAndRequestAnswer('Changes not saved.  Click on the Save button to save your changes.', 'warning', 'Cancel');
      return self.alert.requestConfirmationAnswer$.map(item => {
        self.alert.askConfirmation = false;
        if (item !== 'OK') {
          return true;
        }
        return false;
      });
    }else {
      return true;
    }
  }




}
