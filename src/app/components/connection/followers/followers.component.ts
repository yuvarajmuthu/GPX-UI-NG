import { Component, OnInit } from '@angular/core';

import { AlertService } from 'src/app/services/alert.service';
import {UserService} from '../../../services/user.service';
import {DatashareService} from '../../../services/datashare.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';

import {User} from '../../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.scss']
})
export class FollowersComponent implements OnInit {
  userData:User;
  viewingUser:User;
  eventSubscription: any;
  isEditMode:boolean;
  loggedUsername: string = '';
  loggedUser:User;
  followers:string[] = [];

  constructor(private alertService: AlertService,
    private communicationService: ComponentcommunicationService,
    private datashareService: DatashareService,
    private userService: UserService) { 
    this.eventSubscription = communicationService.userdataLoadEvent.subscribe(data => {
      if(data){
        this.viewingUser = datashareService.getViewingUser();
        this.eventSubscription.unsubscribe();

        this.loadData(this.viewingUser.username, 'followers');  

      }
  
    });

    communicationService.userProfileEditChanged$.subscribe(data => {
      this.isEditMode = data;
  
    });    
  }

  ngOnInit(): void {
    //super.ngOnInit();
    this.viewingUser = this.datashareService.getViewingUser();
    this.isEditMode = this.datashareService.isProfileInEditMode();
    this.loggedUsername = this.datashareService.getLoggedinUsername();
    //this.loggedUser = this.datashareService.getCurrentUser();

  
    if(this.viewingUser.username){
      this.eventSubscription.unsubscribe();

      this.loadData(this.viewingUser.username, 'followers'); 

    }

  }
  
  loadData(username:string, action:string){

    this.userService.getConnections(username, action)
    .subscribe((response) => {
      this.followers= response;
      console.log('Followers response data ', this.followers);

      });

  }

}
