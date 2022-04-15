import { Component, Input, isDevMode } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {FormBuilder} from '@angular/forms';

import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {ProfileService} from '../../../services/profile.service';
import {PostService} from '../../../services/post.service';
import {LegislatorService} from '../../../services/legislator.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';

import {User} from '../../../models/user';
import {ProfileData} from '../../../models/profiledata'
import { ProfileTemplate } from 'src/app/models/profileTemplate';


@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})
export class UserComponent{


    @Input() profileUserId: string = '';
    isEditDescIcon = false;
    isEditDesc = false;
    legisId: string = '';
    activeTemplate: string="upOffices";
    //activeTemplatName:string = "Office";
    showDropDown : boolean = false;
    showLessDescription : boolean = false;
    showDescriptionSlider : boolean = false;
    isInCircle: boolean;
    twitterId:string;
    twitterHandle:string = '';
    twitterHandleExist:boolean = false;
    facebookHandle:string = '';

    public isCollapsed: boolean = false;
    public isCMCollapsed: boolean = false;
    public isPartiesCollapsed: boolean = false;
    public isProfilePrivate: boolean = false;
    public isProfileTemplate: boolean = false;
    public connections = [];
    templateType = [];
    userData:User = new User();
    //private viewingUser:User = new User();
    public profileTemplates = [];
    availableProfileTemplates:ProfileTemplate[] = [];
    public profilesDatas:ProfileData[] = [];
    public isLegislator = false;
    operation: string = '';
    profileImage: string = '';
    profileSmImage: any; 
    bannerImage: any;
    isImageLoading: boolean = false;
    isProfileCollapsed: boolean = false;
    isActivityCollapsed: boolean = true;
    isTwitterActivityCollapsed: boolean = true;
    isFollowersCollapsed: boolean = true;
    isFollowingsCollapsed: boolean = true;
    isMembersCollapsed: boolean = true;
    isManagedByCollapsed:boolean = true;
    isSettingsCollapsed:boolean = true;
    externalUser:boolean;
    biodata:any=null;
    biodataTemplate={};
    contactsData = {};


    //displayName:string='';

    entityType:string='';
    category:string='';
    activities: number = 0;
    //private populationComponent: TemplatePopulationComponent;
    profileEditOption: string;

    following: boolean = false;
    connected: boolean = false;
    requestedToFollow: boolean = false;
    requestAwaiting: boolean = false;
    followRequestRejected: boolean = false;

    currentUser = {} as User;
    loggedUser = {} as User;
    loggedUsername: string = '';
    isSelfProfile: boolean = false;
    //isProfileManaged: boolean = false;
    isEditable: boolean = false;

    postFormData: FormData;
    editLabel: string = '';
    inEditMode:boolean = false;
    followersCount:number = 0;
    followers: User[] = [];
    managedBy:string[] = [];
    members:string[] = [];
    followingsCount:number = 0;
    followings = [];
    selectedProfileSmImage: File;
    profileSmImageChanged: boolean = false;
    profileTabSelected: boolean = true;
    activitiesTabSelected: boolean = false;
    activitiesData: boolean = false;
    settings: boolean = false;
    isShowSettings: boolean = false;
    tap: boolean = false;
    profileData: boolean = true;
    folow: boolean = false;
    followersActiveCss: boolean = false;
    followingsActiveCss: boolean = false;
    managedByActive:boolean = false;

    followCntrlLabel: string = '';
    connectCntrlLabel: string = '';
    followCntrlCSS: string = '';
    followStatusCSS: string = '';

    uploadForm: any = this.formBuilder.group({
        file: ['']
    });

  constructor(public router: Router,
    public route: ActivatedRoute,
    public userService: UserService,
    public postService: PostService,
    public profileService: ProfileService,
    public communicationService: ComponentcommunicationService,
    public legislatorsService: LegislatorService,
    public datashareService: DatashareService,
    public formBuilder: FormBuilder
    ) { 

    }

  ngOnInit(): void {
      //reset
      this.userData = new User();
      this.bannerImage = 'assets/images/user-banner1.jpg';
      this.profileSmImage = 'assets/images/avatar1.png'; 
      this.biodata = {};
      
      this.uploadForm = this.formBuilder.group({
        file: ['']
    });
      this.loggedUsername = this.datashareService.getLoggedinUsername();

      this.route.params.subscribe((params: Params) => {
          this.communicationService.userProfileChanged(false);

          this.profileUserId = params['id'];
          console.log('from user.component route params changed ' + this.profileUserId);

          this.loadComponent(this.profileUserId);

      });
  }

    editProfile() {
        this.datashareService.editProfile(true);
        this.communicationService.userProfileChanged(true);

    }

cancelEditProfile() {

    this.datashareService.editProfile(false);
    this.communicationService.userProfileChanged(false);


}

isProfileEditable() {
    if(this.isSelfProfile){
        this.isEditable = true;
    }else{
        this.userService.isProfileEditable(this.profileUserId, this.loggedUsername).subscribe(
            (result) => {
                this.isEditable = result; 
            },
            (err) => {
                console.log('Error ', err);
            }); 

    }
}

isProfileInEditMode(){
    return this.inEditMode;
}

  isUserLogged() {
    return (this.loggedUser != null && this.loggedUser['token'] != null); // and token expired ?
  }

  loadComponent(id: string) {
    this.loggedUser = this.datashareService.getCurrentUser();

    //this.viewingUser['userId'] = this.profileUserId;
    //this is allowed even for non-logged in user 
    // this.loadBioData();
    
    if (!isDevMode() && this.isUserLogged()) {
        this.getRelationStatus(this.loggedUser.username, this.profileUserId);
    } else {
        this.connectCntrlLabel = 'Connect';
        this.followCntrlLabel = 'Follow';
        this.followCntrlCSS = 'btn btn-primary followers-button';
        this.followStatusCSS = 'fa fa-plus-circle';
    }

    this.getFollowersCount(this.profileUserId);
    this.getFollowingsCount(this.profileUserId);
    //this.getFollowers(this.profileUserId);

    //if(this.isUserLogged()){
        //this.isProfileEditable();

        this.userService.getUserData(this.profileUserId, this.loggedUsername).subscribe(
            data => { 
                this.userData = data;

                //this.userData.description = 'Tst desc';
                console.log('User data from service: ', this.userData);

                this.isSelfProfile = this.userData['selfProfile'];
                //this.isProfileManaged = this.userData['profileManaged'];
                this.entityType =  this.userData['userType'];
                this.category = this.userData['category'];
                this.managedBy = this.userData['members'];
                this.isProfileEditable();

                //description
                if(this.userData.description && this.userData.description.length > 100){
                    this.showLessDescription = true;
                    this.showDescriptionSlider = true;
                }

                //Settings
                this.isShowSettings = this.userData['showSettings'];
                if(this.userData['settings'] && this.userData.settings['accessRestriction']){
                    //this.settingsForm.setValue(this.userData.settings);
                    this.isProfilePrivate = this.userData.settings['accessRestriction'];
                }
               
                //load profile small image

                this.profileSmImage = 'assets/images/userprofile.jpg'; 

                if (!isDevMode()){
                    if(this.userData != null && this.userData['photoUrl'] != null){
                        this.profileSmImage = this.userData['photoUrl'];
                    }else{
                        //this.getProfileSmImage(this.viewingUser['userId']);
                        if(this.userData.profileAvatarImgFileId){
                            this.getProfileSmImage(this.userData.profileAvatarImgFileId);
                        }
                    }
                }

                //getting the available profile templates for this user type - publicUser
                //this.profilesTemplates = this.viewingUser['profileTemplates'] = data['profile'];
                // console.log("profile templates: ", this.profilesTemplates);

                //getting the data for this user profile
                //this.profilesData = this.viewingUser['profilesData'] = this.userData['profileData'];
                this.profileTemplates = this.userData['profileTemplates'];
                //this.viewingUser['profileTemplates'] = this.profileTemplates;

                //list the templates that are available to use, ignores the one that are already used
                this.profileService.getAvailableProfileTemplatesForEntity(this.userData['username'], this.category).subscribe(
                    data => {
                        this.availableProfileTemplates = data;
                        console.log('*****availableProfileTemplates: ', this.availableProfileTemplates);

                    });

                this.profilesDatas = this.userData['profileDatas'];
                console.log('profile data: ', this.userData);

                //identifying the profile selected for this user profile, so those components shall be loaded
               // let compTypes = [];
                for (let profileData of this.profilesDatas) {
                    console.log('loading template component: ', profileData['profileTemplateId']);
                    //check if the template has been already added, add only if not exist
                  //if (compTypes.indexOf(profileData['profileTemplateId']) < 0) {
                  //      compTypes.push(profileData['profileTemplateId']);


                    //}

                    //retrieving contacts
                    if(profileData['profileTemplateId'] === 'upOtherContacts'){
                        this.contactsData = profileData['data'];
                        this.loadContactsData(this.contactsData);
                        /*
                        if(this.contactsData && this.contactsData['Twitter']){
                            this.twitterHandle = "https://twitter.com/" + this.contactsData['Twitter'] +"?ref_src=twsrc%5Etfw";

                        }
                        console.log('this.twitterHandle ', this.twitterHandle);

                        if(this.contactsData && this.contactsData['Facebook']){
                            this.facebookHandle = this.contactsData['Facebook'];
                        }
                        */
                    }

                    //any group/committee members
                    if(profileData['profileTemplateId'] === 'upMember' &&
                        profileData['data'] &&
                        profileData['data']['bioguide']){
                        this.members.push(profileData['data']['bioguide']);
                    }

                }

                if(this.members && this.members.length > 0){
                    this.userData['members'] = this.members;
                }
/*
                if(this.twitterHandle && this.twitterHandle.trim().length > 0){
                    this.twitterHandleExist = true;
                }
*/
               // if (compTypes.length > 0) {
               //     this.templateType = compTypes;
               // }

                this.loadBioDataTemplate(this.category);
                //setting here so it can be accessed globally

                this.datashareService.setViewingUser(this.userData);//required for sharing the viewing user info to other user components
                //console.log('this.dataShareService.getViewingUser() ' + JSON.stringify(this.datashareService.getViewingUser()));
                
                if(this.isUserLogged() && !this.isSelfProfile){
                    this.check4CircleStatus();
                }

                //setting Activities page as default view
                //this.showActivities();
            }
        );


    //}

    
}

loadBioDataTemplate(category:string){
    this.profileService.getProfileTemplateByCategory('upDefault', category)
    .subscribe((response) => {
        this.biodataTemplate = response;

    });  
    }

    
    add2Circle() {

        if(!this.isUserLogged()){
            this.router.navigate(['login']);
        }else{
            var request:any = {};
            request['username'] = this.loggedUsername;
            request['modifiedBy'] = this.loggedUsername;
            request['circlememberUsername'] = this.profileUserId;

            console.log('add2Circle request ' + JSON.stringify(request));

            this.userService.add2Circle(JSON.stringify(request)).subscribe(
            (result) => {
                this.isInCircle = true; 
            },
            (err) => {
                console.log('Error ', err);
            }); 
        }

    }
    
    removeFromCircle() {
        
        if(!this.loggedUsername){
            this.router.navigate(['login']);
        }else{
            var request:any = {};
            request['username'] = this.loggedUsername;
            request['modifiedBy'] = this.loggedUsername;
            request['circlememberUsername'] = this.profileUserId;

            console.log('removeFromCircle request ' + JSON.stringify(request));

            this.userService.removeFromCircle(JSON.stringify(request)).subscribe(
            (result) => {
                this.isInCircle = false; 
            },
            (err) => {
                console.log('Error ', err);
            }); 
        }

    }

   
    check4CircleStatus() { 
        this.userService.isInCircle(this.profileUserId, this.loggedUsername).subscribe(
            (result) => {
                this.isInCircle = result; 
            },
            (err) => {
                console.log('Error ', err);
            }); 

    }

    onProfileSmImageSelected(event:any) {
        console.log('file object ', event);
        let reader = new FileReader();
//      let formData = new FormData();  


        if (event.target.files && event.target.files[0]) {
            this.selectedProfileSmImage = event.target.files[0];
            this.uploadForm.get('file').setValue(this.selectedProfileSmImage);

            reader.readAsDataURL(this.selectedProfileSmImage);
            reader.onload = (event) => {
                this.profileSmImage = event?.target?.result;
            };
            this.profileSmImageChanged = true;

            this.saveProfile();
        }
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

//show the connect option only for active profile
connectionAction() {
    if (this.loggedUser == null || !this.loggedUser.username) {
        let routePath: string = '/login';
        let returnUrl: string = '/user/' + this.profileUserId + '?follow';
        this.router.navigate(['login'], {queryParams: {returnUrl: returnUrl}});
    }

    var followURequest:any = {};
    //var sourceEntity = {};
    //var targetEntity = {};



    followURequest['sourceEntityId'] = this.loggedUser ? this.loggedUser.username : '';//this.datashareService.getCurrentUserId();
    followURequest['targetEntityId'] = this.profileUserId;
    followURequest['status'] = 'REQUESTED';
    
    console.log('Profile data ' + JSON.stringify(followURequest));

    this.userService.connectUser(JSON.stringify(followURequest))
        .subscribe(
            (result) => {
                console.log('followDistrict response ' + result);

                if (result.status == 'REQUESTED') {
                    this.requestedToFollow = true;
                } else if (result.status == 'CONNECTED') {
                    this.connected = true;
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

followAction() {
    if (this.loggedUser == null || !this.loggedUser.username) {
        let routePath: string = '/login';
        let returnUrl: string = '/user/' + this.profileUserId + '?follow';
        this.router.navigate(['login'], {queryParams: {returnUrl: returnUrl}});
    }

    var followURequest:any = {};
    //var sourceEntity = {};
    //var targetEntity = {};



    followURequest['sourceEntityId'] = this.loggedUser ? this.loggedUser.username : '';//this.datashareService.getCurrentUserId();
    followURequest['targetEntityId'] = this.profileUserId;
    followURequest['status'] = 'FOLLOWING';
    
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
saveProfile() {
    console.log(this.userData.role);
    console.log('Saving user.component Profile');
    //if image got change, submit that image
    if (this.profileSmImageChanged) {
        const uploadFormData = new FormData();

        //uploadFormData.append("file", this.selectedProfileSmImage, this.selectedProfileSmImage.name);
        uploadFormData.append('file', this.uploadForm.get('file').value);
        uploadFormData.append('post', JSON.stringify(this.datashareService.getViewingUser()));

        this.userService.updateUserSmProfileImage(uploadFormData)
            .subscribe(data => {
                console.log('User profile image got uploaded successfully, ', this.datashareService.getViewingUser());
            });
    }
}

getRelationStatus(entity: string, profileId: string) {

  this.userService.getRelationStatus(entity, profileId)
      .subscribe(
          (result) => {
              console.log('getRelationStatus response ' + result);

              if (result == 'REQUESTED') {
                  this.requestedToFollow = true;
              } else if (result == 'AWAITING') {
                  this.requestAwaiting = true;
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

    setFollowCntrlLabel() {
        if (this.following) {
            //show dropdown button with Following/Unfollow            
            this.followCntrlLabel = 'Following';
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
getFollowersCount(profileId: string) {
  this.userService.getFollowersCount(profileId)
      .subscribe(
          (result) => {
              console.log('getFollowersCount response ' + result);
              this.followersCount =  Number(result);

          },
          (err) => {
              console.log('Error ', err);
          }); 
}

getFollowingsCount(profileId: string) {
  this.userService.getFollowingsCount(profileId)
      .subscribe( 
          (result) => {
              console.log('getFollowingsCount response ' + result);
              this.followingsCount = Number(result);

          },
          (err) => {
              console.log('Error ', err);
          });
}

  loadContactsData(contactsData:any){
    console.log("contactsData ", contactsData);
    if(contactsData && contactsData['Twitter']){
        this.twitterHandle = "https://twitter.com/" + contactsData['Twitter'] +"?ref_src=twsrc%5Etfw";
        
        this.twitterHandleExist = true;
    }
    console.log('this.twitterHandle ', this.twitterHandle);

    if(contactsData && contactsData['Facebook']){
        this.facebookHandle = contactsData['Facebook'];
    }
}

addtwitterhandle(){
  let request:any = {};

  console.log(this.twitterId);
  request['entityId'] = this.loggedUsername;
  request['profileTemplateId'] = 'upOtherContacts';
  request['key'] = 'Twitter';
  request['value'] = this.twitterId;

  this.userService.updateProfileDataSelective(request)
  .subscribe((response) => {
      console.log("response from adding twitter id ", response);

      if(response && response['data']){
          console.log("response['data] ", response['data']);
          this.loadContactsData(response['data']);
      }
      
  });  
  }

  //load the template based on tab selection
  loadTemplate(type: string) {

     console.log(type);
 }

     //add the Profile based on user selection
    addProfileData(profileTemplateParam: any) {
    
        console.log(profileTemplateParam);

    }
}
