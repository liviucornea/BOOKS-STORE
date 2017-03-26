import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './shared/service/authentication.guard';
import {AuthorizationGuard} from './shared/service/authorize.guard.service';
import {NotAuthorizedComponent} from './shared/components/not-authorized/not-authorized.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'watchlist', loadChildren: './watchlist/watchlist.module#WatchlistModule'},
/*  { path: 'checkout', loadChildren: './checkout/checkout.module#CheckoutModule',
    canActivate: [AuthorizationGuard],
  },
*/
  {path: 'notAuthorized', component: NotAuthorizedComponent},
  { path: '**', redirectTo: '' }
];

export const appRoutingProviders: any[] = [
  AuthenticationGuard
];


export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
