import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {InterFormsService} from '../../services/inter-forms.service';
import {Subscription} from 'rxjs/Subscription';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  menuOptionSubscription: Subscription;
  optionTracker = true;
  optionGrantAccess = true;
  optionNavigateForNew = true;

  constructor(private interFormSvc: InterFormsService,
              private router: Router) {
    const self = this;
    self.menuOptionSubscription = self.interFormSvc.menuOptions.subscribe(data => {
      // leadership roles should not see this menu option
      if (data.toUpperCase() === 'LEADERSHIP') {
        self.optionGrantAccess = false;
      }
      if (data.toUpperCase() === 'NON-APP-USER') {
        self.optionTracker = false;
        self.optionGrantAccess = false;
        self.optionNavigateForNew = false;
      }
      if (data.toUpperCase() === 'APPROVAL') {
        self.optionTracker = false;
        self.optionGrantAccess = false;
        self.optionNavigateForNew = false;
      }
    });
  }

  ngOnInit() {}

  navigateTo(appointmentID: string): void {
    this.router.navigate(['/edit-appointment', appointmentID]);
    // this.router.navigate(['/appointments']);
  }

  ngOnDestroy(): any {
    if (this.menuOptionSubscription) {
      this.menuOptionSubscription.unsubscribe();
    }
  }
}
