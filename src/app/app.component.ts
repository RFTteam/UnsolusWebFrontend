import { Component} from '@angular/core';
import { AuthenticationService, UserService } from './services/index';
import { Router} from '@angular/router';

@Component({
  selector: 'app-root',
  moduleId: module.id,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'app';

  constructor(
    private userService: UserService,
    private authService: AuthenticationService,
    private router: Router
  ) { }

  /**
  * Be van jelentkezve a felhasználó?
  */
  get isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  /**
   * Kijelentkezés
   */
  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
