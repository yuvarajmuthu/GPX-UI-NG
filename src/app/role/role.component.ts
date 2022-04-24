import { Component, OnInit, OnChanges, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatashareService} from '../services/datashare.service';
import {UserService} from '../services/user.service';
import {ProfileService} from '../services/profile.service';
import {PostService} from '../services/post.service';
import {LegislatorService} from '../services/legislator.service';
import {ComponentcommunicationService} from '../services/componentcommunication.service';
//import { UserComponent } from '../components/user/user/user.component';

import {Role} from '../models/role';
import {User} from '../models/user';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  profileTemplateId:string = 'upRole';
  roles:Role[] = [];
  displayProperties = [];
  currentUser:User;
  eventSubscription: any;
  constructor(public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public postService: PostService,
    public profileService: ProfileService,
    public communicationService: ComponentcommunicationService,
    public legislatorsService: LegislatorService,
    public datashareService: DatashareService,
    public formBuilder: FormBuilder,
    private modalService: NgbModal
    //,@Inject(UserComponent) private parent: UserComponent
    ) { 
      //super(router, route, userService, postService, profileService, communicationService, legislatorsService, datashareService, formBuilder);
      this.eventSubscription = this.communicationService.userdataLoadEvent.subscribe(data => {
        if(data){
          this.currentUser = this.datashareService.getViewingUser();
          this.eventSubscription.unsubscribe();
  
          this.loadData(); 
  
        }
    
      });

  }

  ngOnInit(): void {
    //super.ngOnInit();
    //console.log("profileUserId: ", this.parent.userData.username);

    this.currentUser = this.datashareService.getViewingUser();
    if(this.currentUser.username){
      this.eventSubscription.unsubscribe();

      this.loadData(); 

    }



  }

  loadData() {
    this.loadDisplayProperties();

    this.loadTemplateData();    
  }



  loadDisplayProperties() {
    //TODO
    //profile template for this template shall also loaded instead of getting all the template properties
    

    console.log("Roles template properties1: ", this.currentUser.profileTemplates);



    for (let profileTemplates of this.currentUser.profileTemplates) {
        console.log("Roles template properties2: ", profileTemplates.profileTemplateId);

        if (this.profileTemplateId == profileTemplates['profileTemplateId']) {
            this.displayProperties = profileTemplates['properties'];
            console.log("Role template properties: ", this.displayProperties);
            break;
        }
    }
  }

  loadTemplateData() {
    this.userService.getRoles(this.currentUser.username)
        .subscribe((data) => {
            this.roles = data;
            console.log("Roles ", this.roles);
            //this.changeDetector.detectChanges();
            //this.eventSubscription.unsubscribe();
        });

}

  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Georgia',
      image: '../../assets/profile.png'
    },
     {
       id: 2,
       name: 'Usa',
       image: '../../assets/profile.png'
     },
     {
       id: 3,
       name: 'England',
       image: '../../assets/profile.png'
     }
  ];


  selectEvent(item:any) {
    console.log(item);
    
    // do something with selected item
  }

  onChangeSearch(val: string) {
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    // do something when input is focused
  }
  largeModal(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }

  isProfileInEditMode(){
    this.datashareService.isProfileInEditMode();
  }
}
