import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup,FormControl,Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {AppConstants} from '../../app.constant.enum';
//import {CKEditor4} from 'ckeditor4-angular/ckeditor'; 
import { AngularEditorConfig } from '@kolkov/angular-editor';

import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {AlertService} from '../../services/alert.service';
import {ProfileService} from '../../services/profile.service';
import {DatashareService} from '../../services/datashare.service';

//import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import {Route} from '@angular/router';

import {User} from '../../models/user';
import { ProfileData } from 'src/app/models/profiledata';
import { ProfileTemplate } from 'src/app/models/profileTemplate';

@Component({
  selector: 'app-createpage',
  templateUrl: './createpage.component.html',
  styleUrls: ['./createpage.component.scss']
})
export class CreatepageComponent implements OnInit {
  desc: string = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    enableToolbar: true,
      showToolbar: false,
    height: '5rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
  public editorData = '';
    
  //public onChange(event: CKEditor4.EventInfo) {
  //    console.log(event.editor.getData());
  //}

  //userCreationForm = new FormGroup({});
  userCreationForm: FormGroup;

  profileTemplate:ProfileTemplate=new ProfileTemplate();
  profileTemplateData:ProfileData=new ProfileData();

  biodataTemplate:ProfileTemplate=new ProfileTemplate();
  biodataTemplateData:ProfileData=new ProfileData();

  profileDatasList:ProfileData[] = [];



  user = new User();
  searchUsers:any;
  keyword = 'firstName';
  roleList:any;

  createLegislatorPageForm = new FormGroup({
    category: new FormControl(this.constants.USERCATEGRORY_LEGISLATURE),
    userType: new FormControl(''),
    username: new FormControl('', Validators.required),
    full_name: new FormControl('', Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    description: new FormControl(''),
    party: new FormControl(''),
    district: new FormControl(''),
    type: new FormControl(''),//may not be required
    state: new FormControl(''),
    accessRestriction: new FormControl('')
  });
  
  createPersonPageForm = new FormGroup({
    category: new FormControl(this.constants.USERCATEGRORY_USER), 
    username: new FormControl('', Validators.required),
    full_name: new FormControl('', Validators.required),
    firstName: new FormControl(''),
    lastName: new FormControl(''),    
    description: new FormControl(''),
    accessRestriction: new FormControl('')
  });

  createDistrictPageForm = new FormGroup({
    category: new FormControl(this.constants.USERCATEGRORY_LEGISLATIVE_DISTRICT), 
    username: new FormControl('', Validators.required),
    full_name: new FormControl('', Validators.required),
    description: new FormControl(''),
    accessRestriction: new FormControl('')
  });

  createPartyPageForm = new FormGroup({
    category: new FormControl(this.constants.USERCATEGRORY_POLITICAL_PARTY),
    username: new FormControl('', Validators.required),
    full_name: new FormControl('', Validators.required),
    description: new FormControl(''),
    accessRestriction: new FormControl('')
  });

  createGroupPageForm = new FormGroup({
    category: new FormControl(this.constants.USERCATEGRORY_GROUP),
    username: new FormControl('', Validators.required),
    full_name: new FormControl('', Validators.required),
    description: new FormControl(''),
    accessRestriction: new FormControl('')
  });

  //isCreatepage4user: boolean = true;
  page:string = 'user';
  upRoleProfileTemplateId:string = 'upRole';
  userType:string='';
  category:string='';
  profileTemplateIdDefault:string = '';
  modelPage:string;

  constructor(private route: ActivatedRoute,
    //@Inject(MAT_DIALOG_DATA) 
    //public data: {division: string, category:string},
    private router: Router,
    private constants:AppConstants,
    private datashareService: DatashareService,
    private userService: UserService,
    private alertService: AlertService,
    private postService: PostService,
    //public dialogRef: MatDialogRef<CreatepageComponent>,
    private profileService: ProfileService,
    private formBuilder: FormBuilder,
    ) {
      //this.category = this.data.category;
     }

     autoGrowTextZone(e:any) {
      e.target.style.height = "5px";
      e.target.style.height = (e.target.scrollHeight + 5)+"px";
    }

  selectedParty(userDetails:any){
    console.log('Party ', userDetails);
    //this.userCreationForm['party'] = userDetails;
   }

   selectedState(userDetails:any){
    //this.userCreationForm['state'] = userDetails;     
    console.log('State ', userDetails);
   }

   selectedDistrict(userDetails:any){
    //this.userCreationForm['district'] = userDetails;     
    console.log('District  ', userDetails);
   }

   selectedRole(userDetails:any){
    //this.userCreationForm['type'] = userDetails;     
    console.log('Role ', userDetails);
   }

  ngOnInit() {
    this.route
    .queryParams
    .subscribe(params => {
      let page = params['opt'];
      if(page == 'district'){
       this.category = this.constants.USERCATEGRORY_LEGISLATIVE_DISTRICT;
       this.userCreationForm = this.createDistrictPageForm;

       this.profileTemplateIdDefault = 'upEvent';

      }else if(page == 'person'){
        this.category = this.constants.USERCATEGRORY_USER;
        this.userCreationForm = this.formBuilder.group({});

        this.userCreationForm = this.createPersonPageForm;
        this.profileTemplateIdDefault = 'upDefault';
      }else if(page == 'legislator'){
        this.category = this.constants.USERCATEGRORY_LEGISLATURE;
        this.userCreationForm = this.createLegislatorPageForm;

        this.profileTemplateIdDefault = 'upDefault';//should be upDefault, once code is refactored
      }else if(page == 'party'){
        this.category = this.constants.USERCATEGRORY_POLITICAL_PARTY;
        this.userCreationForm = this.createPartyPageForm;
        this.profileTemplateIdDefault = 'upDefault';
      }else if(page == 'group'){
        this.category = this.constants.USERCATEGRORY_GROUP;
        this.userCreationForm = this.createGroupPageForm;
        this.profileTemplateIdDefault = 'upDefault';
      }

      this.loadProfileTemplate(this.profileTemplateIdDefault, this.category);
      
      if(this.category === this.constants.USERCATEGRORY_LEGISLATURE){
        this.loadProfileTemplate(this.upRoleProfileTemplateId, this.category);
      }

    });
  }
/*
  onChangeSearch(e){
    this.postService.getTagUsers(e)
    .subscribe((data:any) => {
        this.searchUsers = data;
    });
  }
*/
  createUser(){
    let members:Array<string> = [];
    let settings:any = {};

    this.user = Object.assign({}, this.userCreationForm.value);

    //generate template data for upDefault
    this.generateProfileTemplateData(this.profileTemplateIdDefault);
    //generate template data for upRole
    if(this.category === this.constants.USERCATEGRORY_LEGISLATURE){
      this.generateProfileTemplateData(this.upRoleProfileTemplateId);
    }
/*
    if(this.biodataTemplateData){
      profileDatasList.push(this.biodataTemplateData);
    } 

    if(this.profileTemplateData){
      profileDatasList.push(this.profileTemplateData);
    }  
*/
    this.user.profileDatas = this.profileDatasList;
    this.user.status = 'ACTIVE'; // since a User is creating a page, should the page be in ACTIVE status ?

    settings['accessRestriction'] = this.user.accessRestriction;
    this.user['settings'] = settings;

    if (this.datashareService.isUserLogged()) {
      members.push(this.datashareService.getLoggedinUsername());
      this.user['members'] = members;
    }


    console.log('Creating User with info ', this.user);

    this.userService.registerUser(this.user)
    .subscribe(
        data => {
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/user', data['username']]);
        },
        error => {
            console.log("Error during registration process ", error);
            this.alertService.error(error['error'], true); 

        });


  }

    //OBSOLETE ?
  generateBioProfileTemplateData(profileTemplateId:string){
    if(this.biodataTemplate){
      this.biodataTemplateData = new ProfileData();
      let data:any={};
      let propId:string='';
      let properties:[] = this.biodataTemplate['properties'];
      for (let property of properties) {
        if(this.userCreationForm.value[property['propId']]){
          //console.log("userCreationForm " + property['propId'] + " ", this.userCreationForm.get(property['propId']).value);
          console.log("userCreationForm " + property['propId'] + " ", this.userCreationForm.value[property['propId']]);
          propId = property['propId'];
          data[propId] = this.userCreationForm.value[property['propId']];
        }
      }
      
      if(this.userCreationForm.get('username')){
        //this.biodataTemplateData.entityId = this.userCreationForm.get('username').value;
      }

      this.biodataTemplateData.profileTemplateId = profileTemplateId;
      //this.biodataTemplateData['entityType'] = this.biodataTemplate['type'];

      this.biodataTemplateData.data = data;
    }
  }

  generateProfileTemplateData(profileTemplateId:string){
    if(this.profileTemplate){
      this.profileTemplateData=new ProfileData();
      let data:any={};
      let propId:string="";
      let properties:[] = [];

      if(this.upRoleProfileTemplateId === profileTemplateId){
        properties = this.profileTemplate['properties'];
      }else{
        properties = this.biodataTemplate['properties'];
      }
      
      console.log("Generating ProfileTemplateData...");
      for (let property of properties) {
        if(this.userCreationForm.value[property['propId']]){
          console.log("userCreationForm " + property['propId'] + " ", this.userCreationForm.value[property['propId']]);
          propId = property['propId'];
          data[propId] = this.userCreationForm.value[property['propId']];
        }
      }
      this.profileTemplateData['entityId'] = this.user.username;
      this.profileTemplateData['profileTemplateId'] = profileTemplateId;

      this.profileTemplateData['data'] = data;
      this.profileDatasList.push(this.profileTemplateData);
    }
  }

  //OBSOLETE ?
  loadBioDataTemplate(profileTemplateId:string, category:string){
    this.profileService.getProfileTemplateByCategory(profileTemplateId, category)
    .subscribe((response) => {
        this.biodataTemplate = response;

    });
  }
  
  loadProfileTemplate(profileTemplateId:string, category:string){
    this.profileService.getProfileTemplateByCategory(profileTemplateId, category)
    .subscribe((response) => {
      if(this.upRoleProfileTemplateId === profileTemplateId){
        this.profileTemplate = response;
      }else{
        this.biodataTemplate = response;
      }

    });
  }

  loadcreatepage(evt:any, opt:any){
    evt.preventDefault();
    this.router.navigate(['createpage'],{ queryParams: { 'opt': opt } });

  }

}
