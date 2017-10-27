import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl(' ',[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    email: new FormControl(),
    password: new FormControl(),
    birthday: new FormControl(null),
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
