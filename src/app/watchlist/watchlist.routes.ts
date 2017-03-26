import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WatchlistComponent } from './watchlist.component';

const watchlistRoutes: Routes = [
  { path: '', component: WatchlistComponent }
];

export const watchlistRouting: ModuleWithProviders = RouterModule.forChild(watchlistRoutes);
