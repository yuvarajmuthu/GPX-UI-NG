import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {ProfileService} from '../../../services/profile.service';
import {PostService} from '../../../services/post.service';
import {LegislatorService} from '../../../services/legislator.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';
//import { UserComponent } from '../user/user.component';

import {User} from '../../../models/user';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  isReadMore = true;
  userData:User;
  currentUser:User;
  eventSubscription: any;
  isEditMode:boolean;

  constructor(router: Router,
    route: ActivatedRoute,
    userService: UserService,
    postService: PostService,
    profileService: ProfileService,
    private communicationService: ComponentcommunicationService,
    legislatorsService: LegislatorService,
    private datashareService: DatashareService,
    formBuilder: FormBuilder,
    private modalService: NgbModal) { 
      //super(router, route, userService, postService, profileService, communicationService, legislatorsService, datashareService, formBuilder);
      this.eventSubscription = communicationService.userdataLoadEvent.subscribe(data => {
        if(data){
          this.currentUser = datashareService.getViewingUser();
          this.eventSubscription.unsubscribe();
  
          this.loadData(); 
  
        }
    
      });

      communicationService.userProfileEditChanged$.subscribe(data => {
        this.isEditMode = data;
    
      });
  }

  ngOnInit(): void {
    //super.ngOnInit();
    this.currentUser = this.datashareService.getViewingUser();
    this.isEditMode = this.datashareService.isProfileInEditMode();
    if(this.currentUser.username){
      this.eventSubscription.unsubscribe();

      this.loadData(); 

    }

  }
  
  showText() {
    this.isReadMore = !this.isReadMore
  }
  largeModalAbout(largeDataModalAbout: any) {
    this.modalService.open(largeDataModalAbout, { centered: true });
  }

  loadData(){
    this.userData = this.currentUser;
  }

}
