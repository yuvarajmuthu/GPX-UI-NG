import { Component, OnInit, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {PostService} from '../../services/post.service';
import {DatashareService} from '../../services/datashare.service';

import {Post} from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() userId: string;
  @Input() requestedBy: string;
  @Input() disableNewPost: boolean = false;
  @Input() selfActivities: boolean = false;
  isShowAllPosts:boolean = false;
  
  posts: Post[] = [];
  postsByPage : Post[]=[];
  pageNumber: number = 1;

  parentPost:any;
  allPosts : Post[] = [];
  isPosts = true;
  postViewDetails=[];

  PostCardData = [
  {
    id: 1,
    url: "../../../assets/profile.png",
    Link:"sonytv",
    Link1:"@sonytv",
    Details:" 16m Sai ke vachanon se judi katha sunne ke baad bhi nahi badla Rishabh ka mann, kya ab Sai ki leela se hoga koi chamatkaar? Jaanne ke liye dekhiye #MereSai Anmol Vachan Adhyay, Mon-Fri, raat 7 baje, sirf Sony par.",
  },
  {
    id: 2,
    url: "../../../assets/images/avatar1.png",
    Link:"Max",
    Link1:"@Paytem",
    Details:" 16m Sai ke vachanon se judi katha sunne a koi chamatkaar? Jaanne ke liye dekhiye #MereSai Anmol Vachan Adhyay, Mon-Fri, raat 7 baje, sirf Sony par.",
  },
  {
    id: 3,
    url: "../../../assets/bg.jpg",
    Link:"Xyz",
    Link1:"@Twitter",
    Details:" Rishabh ka mann, kya ab Sai ki leela se hoga koi chamatkaar? Jaanne ke liye dekhiye #MereSai Anmol Vachan Adhyay, Mon-Fri, raat 7 baje, sirf Sony par.",
  },
  {
    id: 4,
    url: "../../../assets/images/avatar1.png",
    Link:"Opq",
    Link1:"@sony",
    Details:" 1 liye dekhiye #MereSai Anmol Vachan Adhyay, Mon-Fri, raat 7 baje, sirf Sony par.",
  }
];
@ViewChild('largeSlider') editmodalShow: TemplateRef<any>;
  isLiked = false;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private postService: PostService,
    private dataShareService: DatashareService) { 

  }

  ngOnInit(): void {
    if(!this.userId){
      this.userId = this.dataShareService.getLoggedinUsername();
  }
  if(!this.requestedBy){
      this.requestedBy = this.dataShareService.getLoggedinUsername();
  }
  
  this.route
  .queryParams
  .subscribe(params => {
      if(params && params.postId){
          this.isShowAllPosts = false;
          //this.getSharedPost(params.postId);
      }
      else{
          this.isShowAllPosts = true;
          this.getPost('0');
      }
  });
  //this.imageName = '../../images/'+this.party.profileImage;
  console.log('ngOnInit() post.component');
  }

getPost(pageNumber:string): void {
    //let entityId: string;
    //entityId = this.dataShareService.getLoggedinUsername();
    
    console.log('Fetching Activities for ' + this.userId + ' , Pagenumber ' + pageNumber);

    var getPostRequest:any = {};
    getPostRequest['entityId'] = this.userId;//entityId;
    getPostRequest['requestedBy'] = this.requestedBy;
    getPostRequest['pageNumber'] = pageNumber;
    getPostRequest['selfActivities'] = this.selfActivities; 

    this.postService.getActivities(JSON.stringify(getPostRequest)).subscribe((result) => {
        if(result){
            this.postsByPage = result;
            this.posts = this.posts.concat(this.postsByPage);
            this.allPosts = [];
            this.allPosts = result;
        }
        //this.reloadPost(entity, entityType);
    });
}


  //  openModal(largeSlider: any) {
  //   this.modalService.open(largeSlider, { size: 'lg',centered: true });
  // }
  like($event:any){
    console.log("Save button is clicked!", $event);  
    this.isLiked = !this.isLiked
  }
  imageseleted:any
  commentPage(event:any,index:any){
    console.log(event.srcElement.id);
    console.log('image'+index);
    
    if(event.srcElement.id=='link1'){
      alert(event.srcElement.id);
    }
    else if(event.srcElement.id=='link2'){
      alert(event.srcElement.id);
    }
    else if(event.srcElement.id=='like'){
      this.isLiked = !this.isLiked
    }
    else if(event.srcElement.id=='message'){
      console.log("message");
    }
    else if(event.srcElement.id=='reply'){
      console.log("reply");
    }
    else if(event.srcElement.id=='share'){
      console.log("share");
    }
    else if(event.srcElement.id=='image'+index){
      console.log(document.getElementById(event.srcElement.id));
      this.modalService.open(this.editmodalShow, { size: 'lg',centered: true });
      
    }
    else{
      this.router.navigate(['/post/comment']);
    }
  }
  modelPopupComment(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true,windowClass: 'my-class' });
  }
  /*
  commentPage(){
    this.router.navigate(['/post/comment']);
  }*/
  modelPopup(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
}
