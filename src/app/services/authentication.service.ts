import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor( private http: Http ) { }

    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        .map((response: Response) => {
            //bejelentkezés sikeres ha van jwt zseton a válaszban
            let user = response.json();
            if (user && user.token) {
                //eltárolja a felhasználó adatait lokálisan, hogy bejelentkezve maradjon az oldal frissítések között
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            return user;
        });
    }

    logout(){
        //eltávolítja a felhasználót a lokális tárolóból a kijelentkezéshez
        localStorage.removeItem('currentUser');
    }
}