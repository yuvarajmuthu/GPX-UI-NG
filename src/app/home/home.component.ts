import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, ParamMap} from '@angular/router';

import {UserService} from '../services/user.service';
import {DatashareService} from '../services/datashare.service';

import {SearchlegislatorsComponent} from '../components/searchlegislators/searchlegislators.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private  router: Router,
    private userService: UserService,
    private datashareService: DatashareService) { }

  ngOnInit() { 
    if(this.datashareService.isUserLogged()){
      this.router.navigate(['/searchLegislator']); 
    }
  }
/*
  getIn(){
      this.router.navigate(['/login']); 
  }
  */
}
