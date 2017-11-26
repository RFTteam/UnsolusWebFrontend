import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, UserService } from '../services/index';
import { NgForm, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})

export class RegisterComponent{
    returnUrl: any;
   // loading = false;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private userService: UserService,
        //private alertService: AlertService,
        private authService: AuthenticationService) { }
    

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
    onRegister(form: NgForm){
        this.userService.create(form.value.Username, form.value.Email, form.value.Password)
            .subscribe(
                response => console.log(response),
                error => console.log(error)
        );
        this.router.navigate(['/login']);
    }

}