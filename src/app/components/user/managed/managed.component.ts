import { Component, HostListener, OnInit } from '@angular/core';

//import {GlobalSearchComponent} from '../../../components/global-search/global-search.component';
//import {Usercard2Component} from '../../cards/usercard2/usercard2.component';

import { AlertService } from 'src/app/services/alert.service';
import {UserService} from '../../../services/user.service';
import {DatashareService} from '../../../services/datashare.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';

import {User} from '../../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.scss']
})
export class ManagedComponent implements OnInit {
  userData:User;
  viewingUser:User;
  eventSubscription: any;
  isEditMode:boolean;
  loggedUsername: string = '';
  loggedUser:User;
  managedBy:string[] = [];

  navFixed: boolean = false;
  private scrollOffset: number = 200;
  keyword = 'name'; 
  data = [
    {
      id: 1,
      name: 'Georgia',
      image:'../../../../assets/images/avatar1.png'
    },
     {
       id: 2,
       name: 'Usa',
       image:'../../../../assets/images/avatar1.png'
     },
     {
       id: 3,
       name: 'England',
       image:'../../../../assets/images/avatar1.png'
     }
  ];
  selectArray:any=[]
  isInCircle: boolean = false;

  constructor(private alertService: AlertService,
    private communicationService: ComponentcommunicationService,
    private datashareService: DatashareService,
    private userService: UserService) { 
    this.eventSubscription = communicationService.userdataLoadEvent.subscribe(data => {
      if(data){
        this.viewingUser = datashareService.getViewingUser();
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
    this.viewingUser = this.datashareService.getViewingUser();
    this.isEditMode = this.datashareService.isProfileInEditMode();
    this.loggedUsername = this.datashareService.getLoggedinUsername();
    //this.loggedUser = this.datashareService.getCurrentUser();

  
    if(this.viewingUser.username){
      this.eventSubscription.unsubscribe();

      this.loadData(); 

    }

  }
  
  loadData(){
    this.userData = this.viewingUser;
    this.managedBy = this.userData['members'];

    console.log("this.userData ", this.userData);
  }

  //Admin function - Add / Remove members, Add / Remove Admin option for a member
  isAdmin(){
    console.log("this.viewingUser.administrators - ", this.viewingUser.administrators);
    console.log("this.loggedUsername - ", this.loggedUsername);
    return (this.viewingUser.administrators && (this.viewingUser.administrators.indexOf(this.loggedUsername) > -1));
  }

  @HostListener('window:scroll')
  onWindowScroll() {
    this.navFixed = (window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  selectEvent(item:any) {
    //console.log(item.username);
    console.log(item);
    this.selectArray.push(item)
    console.log(this.selectArray,"array total");
    // do something with selected item

    this.addMember(item.username);

  }

  addMember(userId:string) {
    var request:any = {};
    request['memberUsername'] = userId; //member user
    request['modifiedBy'] = this.loggedUsername; // not required
    request['username'] = this.viewingUser.username;

    console.log('addMember request ' + JSON.stringify(request));

    this.userService.addMember(JSON.stringify(request)).subscribe(
    (result) => {
        this.managedBy = result; 
    },
    (err) => {
        console.log('Error ', err);
    }); 
}

removeMember(userId:string) {
    var request:any = {};
    request['memberUsername'] = userId;
    request['modifiedBy'] = this.loggedUsername;
    request['username'] = this.viewingUser.username;

    console.log('removeMember request ' + JSON.stringify(request));

    this.userService.removeMember(JSON.stringify(request)).subscribe(
    (result) => {
        this.managedBy = result; 
    },
    (err) => {
        console.log('Error ', err);
    }); 
}
  onChangeSearch(val: string) {
    console.log(val);
    
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    console.log(e);
    
    // do something when input is focused
  }
  remove(i:any){
    /*
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0db685',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
            this.selectArray.splice(i, 1);
              this.alertService.ToastMessage('Deleted', 'Your card has been deleted.', 'success');
          }
      })
*/
      this.alertService.question("User will be removed from this profile.").then((result) => {
        if (result.isConfirmed) {
          this.selectArray.splice(i, 1);
          this.alertService.ToastMessage('Deleted', 'User has been removed from this profile.', 'success');
        }
    })
  }
}
