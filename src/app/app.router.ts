import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Dota2Component } from './dota2/dota2.component';
import { LeagueComponent } from './league/league.component';
import { PlayersComponent } from './players/players.component';
import { TeamsComponent } from './teams/teams.component';
import { RegisterComponent } from './register/register.component';

export const router: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: 'dota2', component: Dota2Component,
        children: [
            {path: 'players', component: PlayersComponent },
            { path: 'teams', component: TeamsComponent }
    ] },
    { path: 'league', component: LeagueComponent,
        children: [
            {path: 'players', component: PlayersComponent },
            { path: 'teams', component: TeamsComponent }
    ] },
    { path: 'register', component: RegisterComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);