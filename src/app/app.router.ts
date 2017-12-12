import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { PlayersComponent } from './players/index';
import { AllPlayersComponent } from './players/index';
import { TeamsComponent } from './teams/index';
import { AllTeamsComponent } from './teams/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/profile.component';

import { AuthGuard } from './guards/index';

export const router: Routes = [
    { path: '', redirectTo: '', pathMatch: 'full'},
    { path: 'allplayer', component: AllPlayersComponent, canActivate: [AuthGuard] },
    { path: 'allteams', component: AllTeamsComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'player', component: PlayersComponent },
    { path: 'team', component: TeamsComponent }

];

export const routes: ModuleWithProviders = RouterModule.forRoot(router);