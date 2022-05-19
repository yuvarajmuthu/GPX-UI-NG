import { Component, OnInit, AfterViewInit, Input, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import {PostService} from '../../services/post.service';
import {DatashareService} from '../../services/datashare.service';
import {UserService} from '../../services/user.service';
import {AlertService}  from '../../services/alert.service';

import {Post} from '../../models/post';
import { AngularEditorConfig } from '@kolkov/angular-editor';


@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements AfterViewInit{
  @Input() post: Post;
  @Input() idx: string;
  @Input() isComment : boolean;
  @Input() selfActivities:boolean;
  modalData:Post;
  config: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
  };
  isShowAllPosts:boolean = false;
  
  posts: Post[] = [];
  postsByPage : Post[]=[];
  pageNumber: number = 1;

  parentPost:any;
  allPosts : Post[] = [];
  isPosts = true;
  postViewDetails=[];

  profileSmImage: any = 'assets/profile.png';//'assets/images/avatar1.png';
  isImageLoading: boolean = false;
  postImage: any = 'assets/profile.png';//'assets/images/avatar1.png';
  isPostImageLoading: boolean = false;
  entityId: string;
  numbers: number[] = [];
  todayDate : Date = new Date();
  postText : any;

  liked: boolean = false;
  likedCount:number = 0;
  commentsCount:number = 0;
  imageseleted:any

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
    private dataShareService: DatashareService,
    private userService: UserService,
    private alertService: AlertService
    ) { 

  }

  ngAfterViewInit(){
    this.entityId = this.dataShareService.getLoggedinUsername();
    if (this.post && this.post.postType) {
      //this.postText = this.sanitizer.bypassSecurityTrustHtml(this.post.postText);
      console.log(this.postText);
      if (this.post.postType.indexOf('V') !== -1) {
          this.post['containsVideo'] = true;
      }

      //Get image
      if (this.post.postType.indexOf('I') !== -1) {
          this.post['containsImage'] = true;
          if (!isDevMode() && this.post['relatedFiles']) {
              this.getPostImage(this.post['relatedFiles'][0]);
          }

      }
      if (this.post.postType.indexOf('T') !== -1) {
          this.post['containsText'] = true;
      }
    }

    //Get posted entity image
    if (!isDevMode() && this.post.entityId) {
      this.getProfileSmImage(this.post.entityId);
    }

    //LIKE count
    if(this.post.likedBy){
      this.likedCount = this.post.likedBy.length
    }

    //check if logged in user LIKED the Post
    if(this.entityId && this.post.likedBy && this.post.likedBy.indexOf(this.entityId) != -1){
      this.liked = true;    
    }

    //COMMENT count
    this.getCommentsCount();
   
}

getPost(pageNumber:string): void {
  
}


  //  openModal(largeSlider: any) {
  //   this.modalService.open(largeSlider, { size: 'lg',centered: true });
  // }
  like($event:any){
    console.log("Save button is clicked!", $event);  
    this.isLiked = !this.isLiked
  }

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
      // console.log(document.getElementById(event.srcElement.id));
      // this.modalService.open(this.editmodalShow, { size: 'lg',centered: true });
      
    }
    else{
      // this.router.navigate(['/post/comment']);
    }
  }

  modelPopup(modal: any, post:Post|any) {
    this.modalData = post;
    this.modalService.open(modal, { centered: true});
  }
  modelPopupImage(modal: any) {
    this.modalService.open(modal, { size: 'lg' });
  }
  getCommentsCount() {
    this.postService.getCommentsCount(String(this.post.id))
    .subscribe((data:any) => {
        this.commentsCount = data;
        console.log("Comments count for " + this.post.id + ": " + data);

    },
    (err) => {
      console.log(err);
      this.alertService.ToastErrorMessage('Error', err.message, true);
    });
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

  getPostImage(imageId: string) {
      this.isPostImageLoading = true;
      this.postService.getImage(imageId).subscribe(data => {
          this.createPostImageFromBlob(data);
          this.isPostImageLoading = false;
      }, error => {
          this.isPostImageLoading = false;
          console.log(error);
      });
  }

  createPostImageFromBlob(image: Blob) {
      let reader = new FileReader();
      reader.addEventListener('load', () => {
          this.postImage = reader.result;
      }, false);

      if (image) {
          reader.readAsDataURL(image);
      }
  }
}
