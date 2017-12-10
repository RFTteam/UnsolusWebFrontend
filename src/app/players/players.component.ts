import { Component, OnInit } from '@angular/core';

import { User } from '../models/index';
import { Player } from '../models/player.interface';
import { UserService } from '../services/index';
import { PlayerService } from '../services/player.service';
import { NgForm, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'player',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css'],
  providers: [PlayerService]
})
export class PlayersComponent implements OnInit {
  game: string;
  currentPlayer: Player;
  player: Player;
  players: Player[] = [];
  show: number;
  selectedGame: string;
  ranks: string[];
  servers: string[];
  styles: string[];
  motivations: string[];
  roles: string[];
  
  playerForm = new FormGroup({
      game: new FormControl(),
      GamerName: new FormControl(),
      Rank: new FormControl(),
      Role: new FormControl(),
      Style: new FormControl(),
      Server: new FormControl(),
      Motivation: new FormControl()
  });

  constructor(public playerService: PlayerService,public userService: UserService) {
   this.roles=['ADC','Support','Top', 'Jungle','Mid','Fill'];
    this.ranks=['Bronze V','Bronze IV','Bronze III','Bronze II','Bronze I',
                'Silver V','Silver IV','Silver III','Silver II','Silver I',
                'Gold V','Gold IV','Gold III','Gold II','Gold I',
                'Platinum V','Platinum IV','Platinum III','Platinum II','Platinum I',
                'Diamond V','Diamond IV','Diamond III','Diamond II','Diamond I',
                'Master I','Challenger'
    ];
    this.servers=['BR','EUNE','EUW','LAN','LAS','NA','OCE','RU',
                  'TR','JP','SEA','SG/MY','PH','ID','TH','VN','TW','KR','PBE','CN'

    ];
    this.styles=['Aggressive','Passive','Roamer','Ganker','Invader','Farmer'
    ];
    this.motivations=['Become professional','Play for fun','Play in amateur leagues'
    ];
  }

  ngOnInit() {
    this.getMyPlayers();
  }

  onChange(selected) {
    console.log(selected);
    this.selectedGame = selected;
    console.log(this.selectedGame);
  }
  newPlayer(){
    console.log(this.playerForm.value);
    this.playerService.newPlayer(this.playerForm.value)
      .subscribe(
        response => console.log(this.playerForm.value),
        error => console.log(error)
      );
  }
  onUpdate(id: number){
    for(this.player of this.players){
      if(this.player.GamerId == id){
         this.currentPlayer = this.player;
      }
    }
    console.log("GamerId:",id);
    this.playerService.updatePlayer(this.currentPlayer,id)
      .subscribe((play: Player) => {
          //play = this.currentPlayer;
          console.log(this.currentPlayer, id);
      }    
      );
  }

  onDelete(id:number){
    this.playerService.deletePlayer(id)
        .subscribe();
  }

  pageChange(show){
    this.show = show;
    console.log(show);

  }
  getPageChange(){
    return this.show;
  }
  
  playerExists(game){
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
    if(game == 'Dota2'){
      var gameThree = 'Dota2';
      //console.log(gameThree);
      return gameThree;
    }
    
  }

  getMyPlayers(){
    this.playerService.getMyPlayers()
    .subscribe(players => {
        this.players = players;
        console.log("getMyPlayers()");
        console.log(this.players);
      
        //console.log(this.players[0])
    })
  }
  }

  @Component({
    selector: 'allplayer',
    templateUrl: './allplayers.component.html',
    styleUrls: ['./allplayers.component.css'],
    providers: [PlayerService, UserService]
  })

  export class AllPlayersComponent extends PlayersComponent implements OnInit {

    allPlayers: Player[] = [];
    user: User;
    users: User[] = [];
    selectGame;
    selectRank;
    selectRole;
    selectServer;
    selectStyle;
    selectMotivation;
    selectedData;
    constructor(playerService: PlayerService, userService:UserService){
      super(playerService,userService);
      this.selectedData = this.allPlayers;
    }
    ngOnInit() {
      this.getUsers();
      this.getAllPlayers();
    }

    onSelect(val) {
      console.log("val :",val);
      console.log("selectedgame:",this.selectedGame);
      console.log("Rank:",this.selectRank);
      console.log("Role:", this.selectRole);
      if(this.selectedGame != null){
      this.selectedData = this.allPlayers.filter(x => x.game == this.selectedGame);
        if(this.selectRank != null){
          this.selectedData = this.selectedData.filter(x => x.Rank == this.selectRank);
        }
        if(this.selectRole != null){
          this.selectedData = this.selectedData.filter(x => x.Role == this.selectRole);
        }
        if(this.selectServer != null){
          this.selectedData = this.selectedData.filter(x => x.Server == this.selectServer);
        }
        if(this.selectStyle != null){
          this.selectedData = this.selectedData.filter(x => x.Style == this.selectStyle);
        }
        if(this.selectMotivation != null){
          this.selectedData = this.selectedData.filter(x => x.Motivation == this.selectMotivation);
        }
      }
    }

    getUsers(){
      this.userService.getUsers()
          .subscribe(users => {
            this.users = users;
            console.log(users);
          })
    }

    getAllPlayers(){
      this.playerService.getAllPlayers()
      .subscribe(allPlayers => {
          this.allPlayers = allPlayers;
          
          console.log(allPlayers);
      })
    }
  }
