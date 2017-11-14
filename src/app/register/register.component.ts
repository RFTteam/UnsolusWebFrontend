import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService, UserService } from '../services/index';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {
    
   // loading = false;

    constructor(
        //private router: Router,
        //private userService: UserService,
        //private alertService: AlertService,
        private authService: AuthenticationService) { }
    
    ngOnInit(){

    }

    onRegister(form: NgForm) {
        this.authService.register( form.value.Username,form.value.Email,form.value.Password)
            .subscribe(
                response => console.log(response),
                error => console.log(error)
            );
    }
}