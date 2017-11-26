import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, AuthenticationService } from '../services/index';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-login',
    
    templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
    returnUrl: any;
    loggedIn = false;
    authentication_error = false;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthenticationService,
        //private alertService: AlertService
    ) { }

    ngOnInit() {
        // reset login status
        this.loggedIn = this.authService.isLoggedIn();
        this.authService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    
    onLogin(form: NgForm) {  
      
        this.authService.login(form.value.Email, form.value.Password)
            .subscribe(
                tokenData => console.log(tokenData),
                error => console.log(error)
                
            );
            this.router.navigate(['']);
    }

    

    logout(){
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
