import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule , ConnectionBackend} from '@angular/http';

// a fake backend elkészítéséhez
//import { fakeBackendProvider } from './helper/index';
//import { MockBackend, MockConnection } from '@angular/http/testing';
//import { BaseRequestOptions } from '@angular/http';

import { routes } from './app.router';
import { AppComponent } from './app.component';

//import { AlertComponent } from './directives/index';
//import { AuthGuard } from './guards/index';
import { AuthenticationService, UserService} from './services/index';

import { Dota2Component } from './dota2/index';
import { LeagueComponent } from './league/index';
import { PlayersComponent } from './players/index';
import { TeamsComponent } from './teams/index';

import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    //AlertComponent,
    PlayersComponent,
    TeamsComponent,
    Dota2Component,
    LeagueComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routes,
    JsonpModule
  ],
  providers: [
   // AuthGuard,
   // AlertService,
    AuthenticationService,
    UserService
    

    // fake backend készítéséhez
    //fakeBackendProvider,
    //MockBackend,
    //BaseRequestOptions
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
