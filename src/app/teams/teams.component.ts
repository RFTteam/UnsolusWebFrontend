import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

import { Team } from '../models/team.interface';
import { Language } from '../models/language.interface';
import { Country} from '../models/country.interface';
import { UserService } from '../services/user.service';
import { TeamService } from '../services/team.service';

@Component({
  selector: 'team',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css'],
  providers: [TeamService,UserService]
})
export class TeamsComponent implements OnInit {

  team: Team;
  teams: Team[] = [];
  show: number;
  selectedGame: string;
  servers: string[];
  goals: string[];
  languages: Language[] = [];
  countries: Country[] = [];
  teamForm = new FormGroup({
      Teamname: new FormControl(),
      Teamgoal: new FormControl(),
      Server: new FormControl(),
      country: new FormControl(),
      language: new FormControl(),
      game: new FormControl()
  });

  constructor(public teamService: TeamService, public userService: UserService) {
    this.servers=['BR','EUNE','EUW','LAN','LAS','NA','OCE','RU',
    'TR','JP','SEA','SG/MY','PH','ID','TH','VN','TW','KR','PBE','CN'
    ];
    this.goals=['Become professional','Play for fun','Play in amateur leagues'
];
   }

  ngOnInit() {
    this.getLanguages();
    this.getCountries();
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

  onChange(selected) {
    console.log(selected);
    this.selectedGame = selected;
    console.log(this.selectedGame);
  }

  newTeam(){
    console.log(this.teamForm.value);
    this.teamService.newTeam(this.teamForm.value)
      .subscribe(
        response => console.log(this.teamForm.value),
        error => console.log(error)
      );
  }

  pageChange(show){
    this.show = show;
    console.log(show);
  }
  getPageChange(){
    return this.show;
  }
  
  teamExists(game){
    //console.log(game);
    //console.log(this.players);
    if(game == 'Fortnite'){
      var gameOne = 'Fortnite';
      //console.log(gameOne);
      return gameOne;
    }
    if(game == 'LeagueofLegends'){
      var gameTwo = 'LeagueofLegends';
      //console.log(gameTwo);
      return gameTwo;
    }
  }
}

@Component({
  selector: 'allteams',
  templateUrl: './allteams.component.html',
  styleUrls: ['./allteams.component.css'],
  providers: [TeamService,UserService]
})
export class AllTeamsComponent extends TeamsComponent implements OnInit {

  allTeams: Team[] = [];

  selectGame;
  selectServer;
  selectGoal;
  selectCountry;
  selectLanguage;
  selectedData;
  constructor(teamService: TeamService, userService:UserService){
    super(teamService,userService);
    this.selectedData = this.allTeams;
  }

  ngOnInit() {
    this.getAllTeams();
  }
  onSelect(val) {
    console.log("val :",val);
    if(this.selectGame != null){
    this.selectedData = this.allTeams.filter(x => x.game == this.selectGame);
      if(this.selectServer != null){
        this.selectedData = this.selectedData.filter(x => x.Server == this.selectServer);
      }
      if(this.selectCountry != null){
        this.selectedData = this.selectedData.filter(x => x.country == this.selectCountry);
      }
      if(this.selectLanguage != null){
        this.selectedData = this.selectedData.filter(x => x.language == this.selectLanguage);
      }
      if(this.selectGoal != null){
        this.selectedData = this.selectedData.filter(x => x.Teamgoal == this.selectGoal);
      }
    }
  }

  getAllTeams(){
    this.teamService.getAllTeams()
    .subscribe(allTeams => {
        this.allTeams = allTeams;
        
        console.log(allTeams);
    })
  }

}
