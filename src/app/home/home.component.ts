import { Component, Input, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { UserService } from '../services/user.service';
import { DatashareService } from '../services/datashare.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private router: Router,
    private userService: UserService,
    private datashareService: DatashareService, private zone: NgZone) { }


  ngOnInit() {
    if (this.datashareService.isUserLogged()) {
      this.router.navigate(['/searchLegislator']);
    }
  }


}
