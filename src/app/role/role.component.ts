import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatashareService} from '../services/datashare.service';
import {UserService} from '../services/user.service';
import {ProfileService} from '../services/profile.service';
import {PostService} from '../services/post.service';
import {LegislatorService} from '../services/legislator.service';
import {ComponentcommunicationService} from '../services/componentcommunication.service';
import { UserComponent } from '../components/user/user/user.component';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent extends UserComponent implements OnInit {

  constructor(router: Router,
    route: ActivatedRoute,
    userService: UserService,
    postService: PostService,
    profileService: ProfileService,
    communicationService: ComponentcommunicationService,
    legislatorsService: LegislatorService,
    datashareService: DatashareService,
    formBuilder: FormBuilder,
    private modalService: NgbModal) { 
      super(router, route, userService, postService, profileService, communicationService, legislatorsService, datashareService, formBuilder);
  }

  ngOnInit(): void {
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
}
