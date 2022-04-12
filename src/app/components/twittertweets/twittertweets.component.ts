import { Component, OnInit, Input, isDevMode } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';

import {DatashareService} from '../../services/datashare.service';
import {UserService} from '../../services/user.service';
import {ProfileService} from '../../services/profile.service';
import {PostService} from '../../services/post.service';
import {LegislatorService} from '../../services/legislator.service';
import {ComponentcommunicationService} from '../../services/componentcommunication.service';

import {User} from '../../models/user';
import {ProfileData} from '../../models/profiledata'

@Component({
  selector: 'app-twittertweets',
  templateUrl: './twittertweets.component.html',
  styleUrls: ['./twittertweets.component.scss']
})
export class TwittertweetsComponent implements OnInit {
  @Input() profileUserId: string;
  twitterId:string;
  twitterHandle:string;

  loggedUsername:string;
  loggedUser = {} as User;
  public userData:User = new User();
  private viewingUser:User = new User();
  public profilesDatas:ProfileData[] = [];
  contactsData = {};
  twitterHandleExist:boolean = false;
  facebookHandle:string;
  data!:any
  constructor(
    private route: ActivatedRoute,

    private userService: UserService,
    private communicationService: ComponentcommunicationService,
    private datashareService: DatashareService) { 

    }
   
  ngOnInit(): void {
      this.loggedUsername = this.datashareService.getLoggedinUsername();

      this.route.params.subscribe((params: Params) => {

          this.profileUserId = params['id'];
          console.log('profileUserId from Twitter page: ', this.profileUserId);

          this.loadComponent(this.profileUserId);

      });
  }

  
  getValue(val: string) {
    console.log(val)
 
    this.data = { sourceType: 'url', url: val }
    
    console.log(this.data)
  }

  loadComponent(id: string) {
    this.loggedUser = this.datashareService.getCurrentUser();

        this.userService.getUserData(this.profileUserId, this.loggedUsername).subscribe(
            data => { 
                this.viewingUser = this.userData = data;

         
                this.profilesDatas = this.userData['profileDatas'];
                console.log('profile data: ', this.userData);

                //identifying the profile selected for this user profile, so those components shall be loaded
               // let compTypes = [];
                for (let profileData of this.profilesDatas) {
                    console.log('loading template component: ', profileData['profileTemplateId']);

                    //retrieving contacts
                    if(profileData['profileTemplateId'] === 'upOtherContacts'){
                        this.contactsData = profileData['data'];
                        this.loadContactsData(this.contactsData);
       
                    }



                }

               

            }
        );


    //}

    
}

isUserLogged() {
  return (this.loggedUser != null && this.loggedUser['token'] != null); // and token expired ?
}

loadContactsData(contactsData:any){
  console.log("contactsData ", contactsData);
  if(contactsData && contactsData['Twitter']){
      // this.twitterHandle = "https://twitter.com/" + contactsData['Twitter'] +"?ref_src=twsrc%5Etfw";
      this.twitterHandle = contactsData['Twitter'] ;
      
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
}
