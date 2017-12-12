import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule, JsonpModule , ConnectionBackend} from '@angular/http';

// a fake backend elkészítéséhez
//import { fakeBackendProvider } from './helper/index';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { BaseRequestOptions } from '@angular/http';

import { routes } from './app.router';
import { AppComponent } from './app.component';

//import { AlertComponent } from './directives/index';
import { AuthGuard } from './guards/index';
import { AuthenticationService, UserService, PlayerService, TeamService} from './services/index';

import { PlayersComponent } from './players/index';
import { AllPlayersComponent } from './players/index';
import { TeamsComponent } from './teams/index';
import { AllTeamsComponent } from './teams/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/profile.component';

import { MyDatePickerModule } from 'mydatepicker';

@NgModule({
  declarations: [
    AppComponent,
    //AlertComponent,
    PlayersComponent,
    AllPlayersComponent,
    TeamsComponent,
    AllTeamsComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    MyDatePickerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    JsonpModule,
    ReactiveFormsModule 
  ],
  providers: [
    AuthGuard,
   // AlertService,
    AuthenticationService,
    UserService,
    PlayerService,
    TeamService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
