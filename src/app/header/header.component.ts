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

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isUserLogged: boolean;
  profileSmImage: any = 'assets/images/avatar1.png';
  isImageLoading: boolean = false;

  constructor(private  router: Router,
    private missionService: ComponentcommunicationService,
    private dataShareService: DatashareService,
    private userService: UserService,
    private alertService: AlertService,
    private postService:PostService,
    private searchService:SearchService,
    private authenticationService: AuthenticationService) {


      missionService.getAlert().subscribe(
      mission => {
          console.log('Alert message received ' + mission);
      });



      dataShareService.getCurrentUserObservable().subscribe(
      data => {
          console.log('Change in User object, in app.componen ');
          if (data && (Object.keys(data).length > 0) && localStorage.getItem('currentUserToken')) {
              data.token = localStorage.getItem('currentUserToken');
              this.isUserLogged = true;
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

  updateUserNavBar() {
    if (!isDevMode() && this.isUserLogged) {
        let user: User = this.dataShareService.getCurrentUser();
        this.getProfileSmImage(user.username);
    } else {
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
}
