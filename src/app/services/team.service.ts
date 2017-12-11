import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { User} from '../models/index';
import { Team } from '../models/team.interface';
import { Language } from '../models/language.interface';
import { Country } from '../models/country.interface';
import { AuthenticationService} from '../services/authentication.service';

@Injectable()
export class TeamService {
    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }
    
    newTeam(team: Team){
        let body = JSON.stringify({
            Teamname: team.Teamname,
            Teamgoal: team.Teamgoal,
            Server: team.Server,
            Country: team.country,
            Language: team.language,
            Gamename: team.game
         })
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000/api/team?token=' + currentUser.token,body, options)
             .map((response: Response) => {
                 return response.json()});
    }

    getAllTeams(): Observable<Team[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
            return this.http.get('http://localhost:8000/api/teams?token=' +  currentUser.token ,options)
                .map(this.extract)
    }

    getMyTeams(): Observable<Team[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8000/api/myteams?token=' +  currentUser.token ,options)
        .map(this.extract)

    }

    getTeamMembers(id:number){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.get(`http://localhost:8000/api/teammembers/${id}/?token=` + currentUser.token, options)
             .map((response: Response) => {
                 return response.json()});
    }
    joinTeam(id:number){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(`http://localhost:8000/api/teammember/${id}/?token=` + currentUser.token, options)
             .map((response: Response) => {
                 return response.json()});
    }
    leaveTeam(id:number){
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({
            'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json'
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.delete(`http://localhost:8000/api/teammember/${id}/?token=` + currentUser.token, options)
             .map((response: Response) => {
                 return response.json()});
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