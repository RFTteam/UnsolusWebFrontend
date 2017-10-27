import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    birthday: new FormControl(),
    country: new FormControl(),
    language: new FormControl()
  });
  onSubmit(){
    console.log(this.userForm.value);
  }

  constructor() { }

  ngOnInit() {
  }

}
