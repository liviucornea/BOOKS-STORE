import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
// import { AuthenticationGuard } from './shared/services/authentication.guard';
import {AuthorizationGuard} from './shared/services/authorize-guard.service';
import {NotAuthorizedComponent} from './shared/components/not-authorized/not-authorized.component';
import {LoginComponent} from './shared/components/login/login.component';
import {SearchComponent} from './search/search.component';
import {AdministratorComponent} from './administrator/administrator.component';
import {AuthenticationGuard} from './shared/services/authentication-guard.service';
import {ReportsComponent} from './reports/reports/reports.component';

const appRoutes: Routes = [
  { path: '', component:  SearchComponent, canActivate: [ AuthenticationGuard, AuthorizationGuard]},
  { path: 'login', component: LoginComponent},
  { path: 'search', component: SearchComponent, canActivate: [ AuthenticationGuard, AuthorizationGuard]},
 //
  { path: 'admin', component: AdministratorComponent, canActivate: [ AuthenticationGuard, AuthorizationGuard]},
  { path: 'reports', loadChildren: './reports/reports.module#ReportsModule'},
  /*  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule',
   canActivate: [AuthorizationGuard],
   './reports/reports.module#ReportsModule'
   },
   */
  {path: 'notAuthorized', component: NotAuthorizedComponent},
  { path: '**', redirectTo: '' }
];



export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
