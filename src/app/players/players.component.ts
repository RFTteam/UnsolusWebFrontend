import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { UserService } from '../services/index';

@Component({
  moduleId: module.id,
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
  
})
export class PlayersComponent implements OnInit {
  currentUser: User;
  users: User[] = [];

  constructor(private userService: UserService) {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
     // console.log(this.currentUser.Username);
  }

  ngOnInit() {
    this.loadAllUsers();

  }

  private loadAllUsers(){
    this.userService.getAll()
        .subscribe(users => {
          this.users = users;
     });
  }

 
  }

