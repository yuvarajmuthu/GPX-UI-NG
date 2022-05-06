import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//import {AppConstants} from '../../../../app.constant.enum';
import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {AlertService} from '../../../services/alert.service';

@Component({
  selector: 'app-createpageselection',
  templateUrl: './createpageselection.component.html',
  styleUrls: ['./createpageselection.component.scss']
})
export class CreatepageselectionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    //private constants:AppConstants,
    private datashareService: DatashareService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
  }
  loadcreatepage(evt:any, opt:any){
    evt.preventDefault();
    this.router.navigate(['createpage'],{ queryParams: { 'opt': opt } });

  }
}
