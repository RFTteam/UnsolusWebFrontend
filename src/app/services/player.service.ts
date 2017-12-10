import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { Player } from '../models/player.interface';

import { AuthenticationService} from '../services/authentication.service';

@Injectable()
export class PlayerService {
    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }
    
    newPlayer(Player: Player){
        let body = JSON.stringify({
            Gamename: Player.game,
            Gamername: Player.GamerName,
            Rank: Player.Rank,
            Role: Player.Role,
            Style: Player.Style,
            Server: Player.Server,
            Motivation: Player.Motivation
         })
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000/api/player?token=' + currentUser.token,body, options)
             .map((response: Response) => {
                 return response.json()});
    }
    updatePlayer(player: Player, id: number){
        //let Id = JSON.stringify(id);
        let body = JSON.stringify({
            Gamename: player.game,
            Gamername: player.GamerName,
            Rank: player.Rank,
            Role: player.Role,
            Style: player.Style,
            Server: player.Server,
            Motivation: player.Motivation
         });
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(`http://localhost:8000/api/player/${id}/?token=` + currentUser.token,body, options)
             .map((response: Response) => {
                 return response.json()});
    }
    
    deletePlayer(id:number){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(`http://localhost:8000/api/player/${id}/?token=` + currentUser.token, options)
             .map((response: Response) => {
                 return response.json()});
    }

    getMyPlayers(): Observable<Player[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8000/api/myaccounts?token=' +  currentUser.token ,options)
        .map(this.extract)

    }
    getAllPlayers(): Observable<Player[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
            return this.http.get('http://localhost:8000/api/players?token=' +  currentUser.token ,options)
                .map(this.extract)
    }
    private extract(response: Response){
        let body = response.json();
        return body || [];
    }

    private handleError(err: HttpErrorResponse){
        let errorMessage = '';
        if (err.error instanceof Error) {
            errorMessage = `An error occured: ${err.error.message}`;
        } else {
            errorMessage = `Server returned code: ${err.status},
            error message is: ${err.message}`;
        }
        return Observable.throw(errorMessage);
    }
}