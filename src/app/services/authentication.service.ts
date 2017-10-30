import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    private loggedIn: boolean = false;

    constructor( private http: Http ) { 
        this.loggedIn = !!localStorage.getItem('currentUser');
    }
    
    /**
     * Megnézni, hogy a felhasználó be van-e jelentkezve
     */
    isLoggedIn(){
        return this.loggedIn;
    }

    /**
     * A felhasználó bejelentkeztetése
     * @param username A játékos felhasználóneve
     * @param password A játékos jelszava
     */
    login(username: string, password: string) {
        return this.http.post('/api/authenticate', JSON.stringify({ username: username, password: password }))
        .map((response: Response) => {
            //bejelentkezés sikeres ha van jwt token a válaszban
            let user = response.json();
            if (user && user.token) {
                //eltárolja a felhasználó adatait lokálisan, hogy bejelentkezve maradjon az oldal frissítések között
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.loggedIn = true;
            }
            return user;
        });
    }

    /**
     * A felhasználó kijelentkeztetése
     */
    logout(){
        //eltávolítja a felhasználót a lokális tárolóból a kijelentkezéshez
        localStorage.removeItem('currentUser');
        this.loggedIn = false;
    }
}