import {ModuleWithProviders, NgModule} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import {AuthorizationGuard} from './shared/services/authorize-guard.service';
import {NotAuthorizedComponent} from './shared/components/not-authorized/not-authorized.component';
import {AuthenticationGuard} from './shared/services/authentication-guard.service';
import {AppointmentsComponent} from './appointments/appointments.component';
import {AppointmentEditComponent} from './appointments/appointment-edit/appointment-edit.component';


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'appointments', component: AppointmentsComponent, canActivate: [ AuthenticationGuard]},
  {path: 'appointment/:id', component: AppointmentEditComponent,  canActivate: [ AuthenticationGuard]},
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
