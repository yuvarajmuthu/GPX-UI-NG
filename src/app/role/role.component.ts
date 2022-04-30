import { Component, OnInit, ChangeDetectorRef, OnChanges, Inject } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatashareService} from '../services/datashare.service';
import {UserService} from '../services/user.service';
import {ProfileService} from '../services/profile.service';
import {PostService} from '../services/post.service';
import {LegislatorService} from '../services/legislator.service';
import {ComponentcommunicationService} from '../services/componentcommunication.service';
//import { UserComponent } from '../components/user/user/user.component';

import {Role, Roledata} from '../models/role';
import {User} from '../models/user';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  profileTemplateId:string = 'upRole';
  roles:Role[] = [];
  roleInAction:Role;
  displayProperties = [];
  currentUser:User;
  eventSubscription: any;
  isEditMode:boolean;

  roleForm: FormGroup;


  constructor(public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public postService: PostService,
    public profileService: ProfileService,
    private communicationService: ComponentcommunicationService,
    public legislatorsService: LegislatorService,
    private datashareService: DatashareService,
    private formBuilder: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    private modalService: NgbModal
    //,@Inject(UserComponent) private parent: UserComponent
    ) { 
      //super(router, route, userService, postService, profileService, communicationService, legislatorsService, datashareService, formBuilder);
      this.eventSubscription = communicationService.userdataLoadEvent.subscribe(data => {
        if(data){
          this.currentUser = datashareService.getViewingUser();
          this.eventSubscription.unsubscribe();
  
          this.loadData(); 
          this.createFormGroup(new Role());

  
        }
    
      });

      communicationService.userProfileEditChanged$.subscribe(data => {
        this.isEditMode = data;
    
      });

  }

  ngOnInit(): void {
    //super.ngOnInit();
    //console.log("profileUserId: ", this.parent.userData.username);

    this.currentUser = this.datashareService.getViewingUser();
    this.isEditMode = this.datashareService.isProfileInEditMode();

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

  //role object will be passed from individual Role card
  openModal(roleModal: any, role:any|null) {
    //this.role = role;
    if(role != null)
      this.createFormGroup(role);
    else
      this.createFormGroup(new Role());  

    this.modalService.open(roleModal, { centered: true });
    //this.changeDetector.detectChanges();

  }

  createFormGroup(role:Role) {
    this.roleForm = this.formBuilder.group({});
    this.roleInAction = role;

    if(role.data){
      this.displayProperties.forEach((element, index) => {
          let value = role.data[element['propId']];
          console.log('element[propId] ', element['propId'], ' this.role.data[element[propId]] ', role.data[element['propId']]);
          this.roleForm.setControl(element['propId'], new FormControl(value));
      });
      this.changeDetector.detectChanges();
    }
  }

  getFormData():Roledata{

    //console.log("Object.assign({}, roleForm.value) ", Object.assign({}, this.roleForm.value));
    const result: Roledata = Object.assign({}, this.roleForm.value);
    console.log("Role form data ", result);
    return result;
  }

  saveProfile(){
//    let data = new Role();
//    if(this.roleInAction && this.roleInAction.id){
//        this.data["id"] = this.role['id']; //primary key
//    }
//    this.data["profileTemplateId"] = this.id; //unique key
//    this.data["entityId"] = this.profileUserId; // how about for user updating other passive profile ?
    this.roleInAction.data = this.getFormData();
    console.log("Data " + JSON.stringify(this.roleInAction));
    this.userService.updateProfileData(this.roleInAction).subscribe((response) => {
      
      console.log('Role updated sucessfully');
      //this.isProfileInEditMode = false;
      //this.role = this.data["data"];
      this.changeDetector.detectChanges();

    } 
    );

  }

}
