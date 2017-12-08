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
    
  }

  ngOnInit() {
   

  }

  private loadAllUsers(){
  
  }

 
  }

