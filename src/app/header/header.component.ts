import {Component, OnInit, HostListener, isDevMode} from '@angular/core';
import {Router} from '@angular/router';

//import {TypeaheadComponent} from './components/typeahead/typeahead.component';

import {ComponentcommunicationService} from '../services/componentcommunication.service';
import {DatashareService} from '../services/datashare.service';
import {UserService} from '../services/user.service';
import {PostService} from '../services/post.service';
import {SearchService} from '../services/search.service';
import {AlertService} from '../services/alert.service';
import {AuthenticationService} from '../services/authentication.service';

import {Observable, of} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

import {User} from '../../app/models/user';
import { IfStmt } from '@angular/compiler';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  loggedUser = {} as User;
  loggedUsername:string|any;
  isUserLogged: boolean;
  profileSmImage: any = 'assets/images/avatar1.png';
  isImageLoading: boolean = false;
  routerLink:string;

  constructor(private  router: Router,
    private modalService: NgbModal,
    private missionService: ComponentcommunicationService,
    private datashareService: DatashareService,
    private userService: UserService,
    private alertService: AlertService,
    private postService:PostService,
    private searchService:SearchService,
    private authenticationService: AuthenticationService) {


      missionService.getAlert().subscribe(
      mission => {
          console.log('Alert message received ' + mission);
      });



      datashareService.getCurrentUserObservable().subscribe(
      data => {

          if (data && (Object.keys(data).length > 0) && localStorage.getItem('currentUserToken')) {
              data.token = localStorage.getItem('currentUserToken');
              this.loggedUsername = localStorage.getItem('currentUserName');
              this.isUserLogged = true;

              console.log('Change in User object, this.loggedUsername ', this.loggedUsername);
              this.updateUserNavBar();


          } else {
              this.isUserLogged = false;
          }
      });

      missionService.loginChanged$.subscribe(
      data => {
          console.log('Received data from missionService.loginChanged$.subscribe ', data);
          this.isUserLogged = data;
          this.updateUserNavBar();
      });


  }

  ngOnInit(): void {
    //this.updateUserNavBar();
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

  modelPopupComment(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
  selectEvent(item:any) {
    console.log(item.username);
    let routePath= '/user/'+item.username+"/";
    this.router.navigate([routePath]);
  }

  route(name: string) {
    let routePath: string = '/' + name;
    this.router.navigate([routePath]);
  }

  updateUserNavBar() {

    if (this.isUserLogged) {
      this.routerLink = "user/"+this.loggedUsername;
      console.log("this.routerLink ", this.routerLink);
      if (!isDevMode()) {
        let user: User = this.datashareService.getCurrentUser();
        this.getProfileSmImage(this.loggedUsername);
      }else{
        this.profileSmImage = 'assets/images/userprofile.jpg'; 
      }
    }else{
      this.profileSmImage = 'assets/images/avatar1.png';
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

  logout() {

    this.authenticationService.logout();
    //this.missionService.loginChanged(false);
    //this.alertService.success('Logout successful', true);
    this.router.navigate(['/']);

  }  

  loadUser() {
    //e.preventDefault();
    let user: User = this.datashareService.getCurrentUser();

    console.log('logged in user username  - ' + user.username);
    let routePath: string = '/user/' + user.username;
    this.router.navigate([routePath]);
    //return false;
  }
}
