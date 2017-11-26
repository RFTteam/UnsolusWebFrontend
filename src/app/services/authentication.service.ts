import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
    model: any;
    private loggedIn: boolean = false;
    public token: string;

    constructor( private http: Http ) { 
        this.loggedIn = !!localStorage.getItem('currentUser');
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
    }

    isLoggedIn(){
        return this.loggedIn;
        
    }

    login(Email: string, Password: string) {
        return this.http.post('http://localhost:8000/api/signin',
        {Email: Email, Password: Password},
        {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})})
        .map(
            (response: Response) => {
            //bejelentkezés sikeres ha van jwt token a válaszban
           let id = response.json().id;
           
            let token = response.json().token;
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace('-','+').replace('_','/');
            this.loggedIn = true;
            if(token){
                this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ Email: Email, token: token, id: id}));  
            }
            return {token: token, decoded: JSON.parse(window.atob(base64))};
            }
        )
        .do(
            tokenData => {
                localStorage.setItem('token', tokenData.token);
                
                
            }
            
        );
      /*  if (user && user.token) {
            //eltárolja a felhasználó adatait lokálisan, hogy bejelentkezve maradjon az oldal frissítések között
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.loggedIn = true;
        }
        return user;*/
    }
           
    
    
    getToken(){
        return localStorage.getItem('token');
    }
    logout(){
        //eltávolítja a felhasználót a lokális tárolóból a kijelentkezéshez
        this.token = null;
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
    }
}