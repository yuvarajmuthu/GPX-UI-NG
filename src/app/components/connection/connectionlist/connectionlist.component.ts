import { Component, OnInit, ChangeDetectorRef, HostListener } from '@angular/core';

import {User} from '../../../models/user'; 
import {Connection} from '../../../models/connection';

import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';

import { ConnectionrequestComponent } from '../connectionrequest/connectionrequest.component';

@Component({
  selector: 'app-connectionlist',
  templateUrl: './connectionlist.component.html',
  styleUrls: ['./connectionlist.component.scss']
})
export class ConnectionlistComponent implements OnInit {
  navFixed: boolean = false;
  private scrollOffset: number = 10;
  loggedUser:User;
  connectionRequest:Connection[]; 
  connectionsEntityId:any[];
  action:string = 'approvalPending';
  approvalPendingCount: String;
  requestSentCount: String;
  followersCount: string;
  followingsCount: string;
 
  constructor(private userService:UserService, 
    private dataShareService:DatashareService,
    private communicationService: ComponentcommunicationService, 
    private changeDetector : ChangeDetectorRef) { 
      console.log("constructor() connectionrequest.component");
      communicationService.connectionRequestCancelChanged$.subscribe(
        data => {
            console.log('Received message for connectionRequestCancel communicationService.connectionRequestCancelChanged$', data);

        });

        communicationService.connectionAcceptChanged$.subscribe(
          data => {
            console.log('Received message for connectionAccept communicationService.connectionAcceptChanged$', data);
  
          });
    }

  ngOnInit() {
    console.log("ngOnInit() connectionrequest.component");

    this.loggedUser = this.dataShareService.getCurrentUser();
    console.log("loggedUser - ", this.loggedUser);
    //this.loadConnections('approvalPending');
    this.loadConnections(this.action);
    this.getFollowersCount(this.loggedUser.username);
    this.getFollowingsCount(this.loggedUser.username);
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    this.navFixed = (window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  loadConnections(action:string){
   this.action = action;

    this.userService.getConnections(this.loggedUser.username, action)
    .subscribe((response) => {
      this.connectionsEntityId= response;

      if(action === 'approvalPending'){
        this.approvalPendingCount = new String(this.connectionsEntityId.length);
      }
      else if(action === 'requestSent'){
        this.requestSentCount = new String(this.connectionsEntityId.length);
      }
      console.log('ConnectionRequests response data ', this.connectionsEntityId);
    });
  }

  getFollowersCount(username: string) {
    this.userService.getFollowersCount(username)
        .subscribe( 
            (result) => {
                console.log('getFollowersCount response ' + result);
                this.followersCount = result;

            },
            (err) => {
                console.log('Error ', err);
            });
  }

  getFollowingsCount(username: string) {
    this.userService.getFollowingsCount(username)
        .subscribe( 
            (result) => {
                console.log('getFollowingsCount response ' + result);
                this.followingsCount = result;

            },
            (err) => {
                console.log('Error ', err);
            });
  }
  
}
