import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions} from '@angular/http';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs';
import { User} from '../models/index';
import { Language } from '../models/language.interface';
import { Country } from '../models/country.interface';
import { AuthenticationService} from '../services/authentication.service';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }
    
    getById(id: number) {
        return this.http.get('http://localhost:8000/api/users/{id}' + id)
                .map((response: Response) => response.json());
    }
    
    create(Username: string, Email: string, Password: string){
        return this.http.post('http://localhost:8000/api/register',
          {Username: Username, Email: Email, Password: Password},
         {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
     }

    getUsers(): Observable<User[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
        let options = new RequestOptions({ headers: headers });
            return this.http.get('http://localhost:8000/api/users?token=' +  currentUser.token ,options)
                .map(this.extract)

        
    }
    getLanguages(): Observable<Language[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8000/api/languages?token=' +  currentUser.token ,options)
        .map(this.extract);
    }
    getCountries(): Observable<Country[]>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
        let options = new RequestOptions({ headers: headers });
        return this.http.get('http://localhost:8000/api/countries?token=' +  currentUser.token ,options)
        .map(this.extract);
    }
    getUser(): Observable<User>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
        let options = new RequestOptions({ headers: headers });
            return this.http.get('http://localhost:8000/api/user?token=' +  currentUser.token ,options)
            .map(this.extract);

        
    }
    updateUser(DateOfBirth: string, Country: string, Language: string){
        let body = JSON.stringify({DateOfBirth: DateOfBirth, Country: Country, Language: Language})
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        let headers = new Headers({ 
            //'Authorization': 'Bearer'+ currentUser.token,
           // 'X-Requested-With' : 'XMLHttpRequest',
            'Content-Type' : 'application/json',
            
           //'Access-Control-Allow-Headers': '*',
            //'Access-Control-Allow-Methods': 'PUT'
        });
        let options = new RequestOptions({ headers: headers });
            return this.http.put('http://localhost:8000/api/user?token=' +  currentUser.token, body ,options)
                .map((response: Response) => {
                    return response.json()})
                .catch(this.handleError);
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