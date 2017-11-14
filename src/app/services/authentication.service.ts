import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';


@Injectable()
export class AuthenticationService {
    //private loggedIn: boolean = false;

    constructor( private http: Http ) { 
       // this.loggedIn = !!localStorage.getItem('currentUser');
    }

    isLoggedIn(){
     //   return this.loggedIn;
    }

    register(Username: string, Email: string, Password: string){
       return this.http.post('http://localhost:8000/api/register',
         {Username: Username, Email: Email, Password: Password},
        {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
    }

    login(Email: string, Password: string) {
        /*return this.http.post('http://localhost:8000/api/signin',
        {Email: Email, Password: Password},
        {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
      
        .map(
            (response: Response) => {
            //bejelentkezés sikeres ha van jwt token a válaszban
            const token = response.json().token;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-','+').replace('_','/');
            return JSON.parse(window.atob(base64));
            }
        );*/
    }
           /* if (user && user.token) {
                //eltárolja a felhasználó adatait lokálisan, hogy bejelentkezve maradjon az oldal frissítések között
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.loggedIn = true;
            }
            return user;
    }
    */
    logout(){
        //eltávolítja a felhasználót a lokális tárolóból a kijelentkezéshez
       // localStorage.removeItem('currentUser');
        //this.loggedIn = false;
    }
}