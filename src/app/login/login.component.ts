import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/index';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {

    constructor(
        //private route: ActivatedRoute,
        //private router: Router,
        private authService: AuthenticationService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        // reset login status
        this.authService.logout();

        // get return url from route parameters or default to '/'
        //this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
    onLogin(form: NgForm) {  
        this.authService.login(form.value.Email, form.value.Password)
            .subscribe(
                //response => console.log(response),

                tokenData => console.log(tokenData),
                error => console.log(error)
            );
        /*this.loading = true;
        this.authService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });*/
    }
}
