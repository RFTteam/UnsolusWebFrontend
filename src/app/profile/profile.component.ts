import { Component, OnInit, Input} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from '../models/index';
import { Language } from '../models/language.interface';
import { Country} from '../models/country.interface';
import { UserService } from '../services/user.service';
import { AuthenticationService} from '../services/authentication.service';

import {IMyDpOptions, IMyDateModel} from 'mydatepicker';

@Component({
  moduleId: module.id,
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [UserService]
})
export class ProfileComponent implements OnInit {
 
  user: User;
  users: User[] = [];
  languages: Language[] = [];
  countries: Country[] = [];
  //editing = false;
  selectedLanguage: string;
  selectedCountry: string;
  selectedDate: string;
  validPassword: string;

  myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'yyyy-mm-dd',
  };

  constructor(private userService: UserService){
    
   }

  ngOnInit(){
    this.getUser();
    //console.log(this.user);
   // this.selectedDate = this.user.Birthday;
    //this.selectedCountry = this.user.country;
    //this.selectedLanguage = this.user.Language;
    
    this.getUsers(); 
    this.getLanguages();
    this.getCountries();
    //console.log(this.languages);
  }
  
  onDateChanged(event: IMyDateModel) {
    //console.log('onDateChanged(): ', event.date, ' - jsdate: ', new Date(event.jsdate).toLocaleDateString(),
    // ' - formatted: ', event.formatted, ' - epoc timestamp: ', event.epoc);
    console.log(event);
    this.selectedDate = event.formatted;
  }
  getCountries(){
    this.userService.getCountries()
    .subscribe(countries=> {
      this.countries = countries;
    })
  }
  getLanguages(){
    this.userService.getLanguages()
        .subscribe(languages => {
          this.languages = languages;
        })
  }
  getUser(){
    this.userService.getUser()
        .subscribe((user: User) =>{
          this.user = user;
          //console.log(user);
          //console.log(user.DateOfBirth);
          
          //console.log(user.language);
          this.selectedCountry = this.user.country;
          //console.log(this.selectedCountry);
          this.selectedDate = this.user.DateOfBirth;
          this.selectedLanguage = this.user.language;
        })
    }
   

  getUsers(){
    this.userService.getUsers()
        .subscribe(users => {
          this.users = users;

        })
  }

  onEdit(){
   // this.editing = true;
   // this.editValue = this.user;
  }
  
  onUpdate(){
    this.userService.updateUser(this.selectedDate, this.selectedCountry, this.selectedLanguage)
      .subscribe((use: User) => {
          this.user.country = this.selectedCountry;
          this.user.language = this.selectedLanguage;
          this.user.DateOfBirth = this.selectedDate;
        }
      );
  }

  onCancel(){
   // this.editValue = '';
   // this.editing = false;
  }

}
