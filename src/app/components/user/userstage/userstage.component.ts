import { Component, HostListener, OnInit } from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';


import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {ProfileService} from '../../../services/profile.service';
import {PostService} from '../../../services/post.service';
import {LegislatorService} from '../../../services/legislator.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';


import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-userstage',
  templateUrl: './userstage.component.html',
  styleUrls: ['./userstage.component.scss']
})
export class UserstageComponent extends UserComponent implements OnInit{

  navFixed: boolean = false;
  private scrollOffset: number = 280;
  SectionName=''
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
    dropdownList:Array<any> = [];
    selectedItems:Array<any> = [];
    dropdownSettings = {};

  constructor(private modalService: NgbModal,
    router: Router,
    route: ActivatedRoute,
    userService: UserService,
    postService: PostService,
    profileService: ProfileService,
    communicationService: ComponentcommunicationService,
    legislatorsService: LegislatorService,
    datashareService: DatashareService,
    formBuilder: FormBuilder) { 
      super(router, route, userService, postService, profileService, communicationService, legislatorsService, datashareService, formBuilder);
  }
  
  ngOnInit() {
    super.ngOnInit();

    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };

  }
  color:string = 'bx-star';

changeStyle($event:any){
  this.color = $event.type == 'mouseover' ? 'bxs-star' : 'bx-star';
}
/*  
  getUserData(){
    console.log("userstage this.userData ", this.userData);
    return this.userData.displayName;
  }
*/
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


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
  largeModalProfile(largerProfile: any) {
    this.modalService.open(largerProfile, { centered: true });
  }
  
  OpenSection(SectionModel: any,Section:any) {
    this.modalService.open(SectionModel, { centered: true });
    this.SectionName=Section
  }

  // showText() {
  //   this.isReadMore = !this.isReadMore
  // }
  @HostListener('window:scroll')
  onWindowScroll() {
    this.navFixed = (window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  // largeModalAbout(largeDataModalAbout: any) {
  //   this.modalService.open(largeDataModalAbout, { centered: true });
  // }

  fileNameProfile: string = "";
  onChangeProfile(event:any) {
    this.fileNameProfile = event.target.files[0].name;
  }
  fileNamecover: string = "";
  onChangecover(event:any) {
    this.fileNamecover = event.target.files[0].name;
  }
}
