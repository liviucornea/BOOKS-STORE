import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportsComponent} from './reports/reports.component';
import {AuthorizationGuard} from '../shared/services/authorize-guard.service';
import {AuthenticationGuard} from '../shared/services/authentication-guard.service';



const reportsRoutes: Routes = [
  { path: 'reports', component: ReportsComponent,  canActivate: [ AuthenticationGuard, AuthorizationGuard] }
];

export const reportstRouting: ModuleWithProviders = RouterModule.forChild(reportsRoutes);
