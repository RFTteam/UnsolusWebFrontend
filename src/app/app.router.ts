import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { Dota2Component } from './dota2/index';
import { LeagueComponent } from './league/index';
import { PlayersComponent } from './players/index';
import { TeamsComponent } from './teams/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';

import { AuthGuard } from './guards/index';

export const router: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full', /*canActivate: [AuthGuard]*/},
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
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);