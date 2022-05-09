import {Component, OnInit, Input, isDevMode} from '@angular/core';
import {Router} from '@angular/router';

import { environment } from '../../../../environments/environment';

import {UserService} from '../../../services/user.service';
import {DatashareService} from '../../../services/datashare.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';

import {User} from '../../../models/user';

@Component({
  selector: 'app-usercard2',
  templateUrl: './usercard2.component.html',
  styleUrls: ['./usercard2.component.scss']
})
export class Usercard2Component implements OnInit {
  @Input() username: any;
  @Input() manageMembers:boolean = false;

  public user:any;
  loggedUser: User;
  loggedUsername: string;
  followersCount: string;

  followCntrlLabel: string = '';
  followCntrlCSS: string = '';
  followStatusCSS: string = '';

  following: boolean = false;
  requestedToFollow: boolean = false;
  followRequestRejected: boolean = false;
  isCircle:string;
  isSelfProfile: boolean = false;
  profileSmImage: any; 
  isImageLoading: boolean = false;
  members = [];

  constructor(private  router: Router,
    private userService: UserService, 
    private datashareService: DatashareService,
    private communicationService: ComponentcommunicationService
    ) { 
           this.isCircle = this.router.url;
           console.log(this.isCircle);
    }

  ngOnInit() {
    this.loggedUsername = this.datashareService.getLoggedinUsername();

    this.userService.getUserData(this.username, this.loggedUsername).subscribe(
        data => {
            this.user = data;
            this.isSelfProfile = this.user['selfProfile'];

            this.members = this.user['members'];

            //profile image
            this.profileSmImage = 'assets/images/avatar1.png'; 
            if (!isDevMode()){
                if(this.user != null && this.user['photoUrl'] != null){
                    this.profileSmImage = this.user['photoUrl'];
                }else{
                    this.getProfileSmImage(this.username);
                }
            }
        }
        );

        if (!isDevMode() && this.loggedUsername) {
            this.getRelationStatus(this.loggedUsername, this.username);
        } else {
            this.followCntrlLabel = 'Join to Follow';
            this.followCntrlCSS = 'btn btn-primary followers-button';
            this.followStatusCSS = 'fa fa-plus-circle';
        }

        this.getFollowersCount(this.username);



    }

    getProfileSmImage(userId: string) {
        this.isImageLoading = true;
        this.userService.getImage(userId).subscribe(data => {
            this.createImageFromBlob(data);
            this.isImageLoading = false;
        }, error => {
            this.isImageLoading = false;
            console.log(error);
        });
    }

    createImageFromBlob(image: Blob) {
        let reader = new FileReader();
        reader.addEventListener('load', () => {
            this.profileSmImage = reader.result;
        }, false);

        if (image) {
            reader.readAsDataURL(image);
        }
    }

    getRelationStatus(entity: string, profileId: string) {

    this.userService.getRelationStatus(entity, profileId)
        .subscribe(
            (result) => {
                console.log('getRelationStatus response ' + result);

                if (result == 'REQUESTED') {
                    this.requestedToFollow = true;
                } else if (result == 'FOLLOWING') {
                    this.following = true;
                } else if (result == 'REJECTED') {
                    this.followRequestRejected = true;
                }
                this.setFollowCntrlLabel();
                this.setFollowCntrlCSS();
                this.setFollowStatusCSS();

            },
            (err) => {
                console.log('Error ', err);
            });
  }

  getFollowersCount(profileId: string) {
    this.userService.getFollowersCount(profileId)
        .subscribe(
            (result) => {
                console.log('getFollowersCount response ' + result);
                this.followersCount = result;

            },
            (err) => {
                console.log('Error ', err);
            }); 
  }

  followEntity() {


    var followURequest:any = {};
    var sourceEntity = {};
    var targetEntity = {};


    followURequest['sourceEntityId'] = this.loggedUsername;
    followURequest['targetEntityId'] = this.username;
    followURequest['status'] = 'REQUESTED';
    console.log('Profile data ' + JSON.stringify(followURequest));

    this.userService.followPerson(JSON.stringify(followURequest))
        .subscribe(
            (result) => {
                console.log('followDistrict response ' + result);

                if (result.status == 'REQUESTED') {
                    this.requestedToFollow = true;
                } else if (result.status == 'FOLLOWING') {
                    this.following = true;
                } else if (result.status == 'REJECTED') {
                    this.followRequestRejected = true;
                }
                this.setFollowCntrlLabel();
                this.setFollowCntrlCSS();
                this.setFollowStatusCSS();

            },
            (err) => {
                console.log('Error ', err);
            });
  }

  setFollowCntrlLabel() {

      if (this.requestedToFollow) {
          this.followCntrlLabel = 'Request Sent';
      } else if (this.following) {
          this.followCntrlLabel = 'Following';
      } else if (this.followRequestRejected) {
          this.followCntrlLabel = 'Request Rejected';
      } else {
          this.followCntrlLabel = 'Follow';
      }


  }

  setFollowStatusCSS() {

      if (this.requestedToFollow) {
          this.followStatusCSS = 'fa fa-exclamation-circle';
      } else if (this.following) {
          this.followStatusCSS = 'fa fa-check-circle';
      } else if (this.followRequestRejected) {
          this.followStatusCSS = 'fa fa-thumbs-down';
      } else {
          this.followStatusCSS = 'fa fa-plus-circle';
      }


  }

  setFollowCntrlCSS() {

      if (this.requestedToFollow) {
          this.followCntrlCSS = 'btn btn-outline-warning glyphicon glyphicon-ok';
      } else if (this.following) {
          this.followCntrlCSS = 'btn btn-outline-success glyphicon glyphicon-ok';
      } else if (this.followRequestRejected) {
          this.followCntrlCSS = 'btn btn-outline-danger glyphicon glyphicon-ok';
      } else {
          this.followCntrlCSS = 'btn btn-outline-primary';
      }

  }

  gotoUser(): void {
    this.router.navigate(['/user', this.username]);
  }

  removMember(): void {
        this.communicationService.manageUserRemoved(this.username);
    }
}
