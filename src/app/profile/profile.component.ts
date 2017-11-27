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
  user: User[] = [];
  users: User[] = [];
  editing = false;
  //editValue = '';

  constructor(private userService: UserService){

   }

  ngOnInit(){
    this.getUser();
    this.getUsers(); 
  }

  getUser(){
    this.userService.getUser()
        .subscribe(user =>{
          this.user = user;
        })
        
    }
  

  getUsers(){
    this.userService.getUsers()
        .subscribe(users => {
          this.users = users;

        })
  }

  onEdit(){
    this.editing = true;
   // this.editValue = this.user;
  }
  
  onUpdate(){
    this.userService.updateUser(this.user)
      .subscribe(user => {
          this.user = user;
        //  this.editValue = '';
        }
      );
    this.editing = false;
  }

  onCancel(){
   // this.editValue = '';
    this.editing = false;
  }

}
