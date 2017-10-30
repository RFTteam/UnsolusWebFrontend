import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../services/index';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html'
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}


/*import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    name: new FormControl("",[Validators.required, Validators.minLength(5), Validators.maxLength(15)]),
    email: new FormControl(),
    password: new FormControl("",[Validators.required, Validators.minLength(5)]),
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
*/