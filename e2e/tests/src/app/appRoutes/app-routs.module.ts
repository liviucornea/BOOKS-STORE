import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import {AuthorizationGuard} from '../shared/services/authorize-guard.service';
import {NotAuthorizedComponent} from '../shared/components/not-authorized/not-authorized.component';
import {AuthenticationGuard} from '../shared/services/authentication-guard.service';
import {AppointmentsComponent} from '../appointments/appointments.component';
import {AppointmentEditComponent} from '../appointments/appointment-edit/appointment-edit.component';
import {ConfirmDeactAppointmentEditGuardService} from '../shared/services/confirm-deact-appointment-edit-guard.service';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [ AuthenticationGuard]},
  {path: 'appointments', component: AppointmentsComponent, canActivate: [ AuthenticationGuard]},
  {path: 'appointment/:id/:approvalId', component: AppointmentEditComponent,  canActivate: [ AuthenticationGuard],
          canDeactivate: [ConfirmDeactAppointmentEditGuardService]},
  {path: 'edit-appointment/:id', component: AppointmentEditComponent,  canActivate: [ AuthenticationGuard],
    canDeactivate: [ConfirmDeactAppointmentEditGuardService]},
  {path: 'notAuthorized', component: NotAuthorizedComponent},
  { path: '**', redirectTo: 'appointments' }
];



@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: false } // true <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
