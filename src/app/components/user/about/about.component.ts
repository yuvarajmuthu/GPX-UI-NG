import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {FormBuilder} from '@angular/forms';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {ProfileService} from '../../../services/profile.service';
import {PostService} from '../../../services/post.service';
import {LegislatorService} from '../../../services/legislator.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';
import { UserComponent } from '../user/user.component';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent extends UserComponent implements OnInit {
  isReadMore = true
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
    super.ngOnInit();
  }
  
  showText() {
    this.isReadMore = !this.isReadMore
  }
  largeModalAbout(largeDataModalAbout: any) {
    this.modalService.open(largeDataModalAbout, { centered: true });
  }
}
