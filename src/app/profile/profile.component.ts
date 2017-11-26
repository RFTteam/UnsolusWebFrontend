import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/index';
import { UserService } from '../services/user.service';
import { AuthenticationService} from '../services/authentication.service';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
  @Input() currentUser : any;
  user: any;
  editing = false;
  editValue = '';

  constructor(private userService: UserService){

   }

  ngOnInit(){
    this.user = this.userService.getUser();
    localStorage.setItem('currentUser', JSON.stringify({
      Email: this.user.Email,
      token: this.user.token,
      id: this.user.id,
      Username: this.user.Username,
      Language: this.user.Language,
      Country: this.user.Country,
      Birthday: this.user.Birthday,
      Password: this.user.Password
    }));  

    console.log(this.currentUser.Username);
    console.log(this.currentUser.token);
    
  }

  onEdit(){
    this.editing = true;
    this.editValue = this.currentUser.Username;
  }

  onUpdate(){
    this.userService.update(this.currentUser.Username, this.currentUser.Email,this.currentUser.Password,this.currentUser.Birthday,this.currentUser.Country,this.currentUser.Language)
      .subscribe(
        (user: User) => {
          this.currentUser = user;
          this.editValue = '';
        }
      );
    this.editing = false;
  }

  onCancel(){
    this.editValue = '';
    this.editing = false;
  }

}
