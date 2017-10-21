import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';

export const router: Routes = [
    { path: '', redirectTo: 'players', pathMatch: 'full'},
    { path: 'players', component: PlayersComponent },
    { path: 'teams', component: TeamsComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);