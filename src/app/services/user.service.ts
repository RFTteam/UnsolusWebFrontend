import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs';
import { User } from '../models/index';
import { AuthenticationService} from '../services/authentication.service';

@Injectable()
export class UserService {
    constructor(
        private http: Http,
        private authService: AuthenticationService
    ) { }
    
    getAll() {
       
        return this.http.get('http://localhost:8000/api/users', this.jwt())
            .map((response: Response) => response.json());
    }
    
    getById(id: number) {
        return this.http.get('http://localhost:8000/api/users/{id}' + id)
                .map((response: Response) => response.json());
    }
    
    create(Username: string, Email: string, Password: string){
           
        return this.http.post('http://localhost:8000/api/register',
          {Username: Username, Email: Email, Password: Password},
         {headers: new Headers({'X-Requested-With': 'XMLHttpRequest'})});
     }

    getUser(): Observable<any>{
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
       // const token = this.authService.getToken();
       // let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
        //let options = new RequestOptions({ headers: headers });
            return this.http.get('http://localhost:8000/api/user?token=' +  currentUser.token)
                .map((response: Response) =>{
                     <User>response.json();
                    
            }
        )
    }
    
       update(Username: string,
              Email: string,
              Password: string,
              Birthday: string,
              Country: string,
              Language: string
        ){
           let currentUser = JSON.parse(localStorage.getItem('currentUser'));
           const headers = new Headers({'Content-Type': 'application/json'});
           return this.http.put('http://localhost:8000/api/user?token=' +  currentUser.token,
            {headers:headers})
                .map(
                    (response: Response) => response.json()
                    
                );
       }
    /*
       delete(_id: string) {
           return this.http.delete('/users/' + _id);
       }
    */
    private jwt() {
        // create authorization header with jwt token
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser.token) {
            let headers = new Headers({ 'Authorization': 'Bearer' + currentUser.token });
            return new RequestOptions({ headers: headers });
        }
    }
}