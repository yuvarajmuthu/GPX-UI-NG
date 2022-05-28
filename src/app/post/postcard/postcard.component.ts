import { Component, OnInit, AfterViewInit, Input, TemplateRef, ViewChild, isDevMode } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { NgbModal, NgbModalRef  } from '@ng-bootstrap/ng-bootstrap';

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
export class PostcardComponent implements OnInit{
  @Input() post: Post; //Postcard shown with Post data, no Post loading required
  @Input() postId: string; //Postcard shown with Post data loaded using Post Id - considered isStandaloneMode=true
  @Input() isCommentMode : boolean; //Postcard opened in a modal for Commenting, actions like comment, share, like can be controlled while opened in comment mode
  @Input() isComment : boolean = false; //Postcard shown is a Comment of another Postcard
  @Input() selfActivities:boolean;
  @Input() loadComments:boolean = true; //control loading Comments data for a Postcard
  isStandaloneMode:boolean = false;
  //modalData:Post;
  modalReference: NgbModalRef;

  config: AngularEditorConfig = {
    editable: false,
    showToolbar: false,
  };
  isShowAllPosts:boolean = false;
  
  posts: Post[] = [];
  postsByPage : Post[]=[];
  pageNumber: number = 1;

  commentsCount:number = 0;
  comments: Post[]=[];
  loadMore:boolean = false;

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

  ngOnInit(): void {
    console.log('ngOnInit');

    if(!this.post){
      this.route.params.subscribe((params: Params) => {
        if(params && params['id']){
            this.postId = params['id'];
            this.isStandaloneMode = true;
            console.log('from postcard.component route params changed ' + this.postId);
            this.getPost(this.postId);
          }
      });
    }else{
      this.loadPostData();
    }
  }

  loadPostData(){
    console.log('ngAfterViewInit');
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

    //COMMENT count - not required when Post is opened in Comment mode as the count will not be shown
    //if(!this.isComment)
      this.getCommentsCount();
   
    if(this.isStandaloneMode && this.loadComments){
      this.getComments(this.postId, 0);
    }
  }

  getPost(postId:string){
    this.postService.getPostById(postId)
    .subscribe((data:any) => {
        this.post = data;
        console.log("this.post " + this.post);
        this.loadPostData();
    },
    (err) => {
      console.log(err);
      this.alertService.ToastErrorMessage('Error', err.message, true);
    });    
  }

  getComments(postId:string, pageNumber:number): void {
    //let entityId: string;
    //entityId = this.dataShareService.getLoggedinUsername();

    //console.log('Activities for ' + entityId);

    var getPostRequest:any = {};
    getPostRequest['postId'] = postId;
    getPostRequest['pageNumber'] = pageNumber;

    
    this.postService.getPostComments(JSON.stringify(getPostRequest))
    .subscribe((result) => {
        if(pageNumber == 0){
            this.comments = result;
        }else{
            this.comments = this.comments.concat(result);
        }

        this.managePagination();
      },
      (err) => {
        console.log(err);
        this.alertService.ToastErrorMessage('Error', err.message, true);
      });
}

loadMoreComments() {
    this.pageNumber++;
    this.getComments(String(this.post.id), this.pageNumber);
}

managePagination(){
    if(this.commentsCount > this.comments.length){
        this.loadMore = true;
    }else{
        this.loadMore = false;
    }

}


  //  openModal(largeSlider: any) {
  //   this.modalService.open(largeSlider, { size: 'lg',centered: true });
  // }
  like(){
    //console.log("Save button is clicked!", $event);  

    let entityId = this.dataShareService.getLoggedinUsername();

    var request:any = {};
    request['id'] = String(this.post.id);
    request['entityId'] = entityId;
    request['action'] = !this.isLiked;

    console.log('Post like request ' + JSON.stringify(request));


    //if(!this.liked){    

      this.postService.postLikeaction(JSON.stringify(request))
      .subscribe((data:any) => {
          this.isLiked = !this.isLiked
          //let postResponse = data;
          this.isLiked = data['liked'];
          
          if(data['likedBy']){
              this.likedCount = data['likedBy'].length
          }    

          this.alertService.success('Done.', true);
        
        },
        (err) => {
          console.log(err);
          this.alertService.ToastErrorMessage('Error', err.message, true);
        });
  //}

  }

  openStandalone(event:any){
    if(this.isStandaloneMode)
      return;

    console.log(event.srcElement.id);
    console.log(event.view.getSelection().type);
    
    if(event.srcElement.id=='link1'){
      alert(event.srcElement.id);
    }
    else if(event.srcElement.id=='link2'){
      alert(event.srcElement.id);
    }
    else if(event.srcElement.id=='like'){
      this.isLiked = !this.isLiked
      alert("like");
    }
    else if(event.srcElement.id=='message'){
      // alert("message");
    }
    else if(event.srcElement.id=='reply'){
      alert("reply");
    }
    else if(event.srcElement.id=='share'){
      // alert("share");
    }
    
    else if(event.srcElement.id=='image'){
      // console.log(document.getElementById(event.srcElement.id));
      // this.modalService.open(this.editmodalShow, { size: 'lg',centered: true });
      
    }
    else if(event.srcElement.id=='cardbase'){
      if (event.view.getSelection().type == 'Caret') {
        this.router.navigate(['/post/card', this.post.id]);
        //this.router.navigate(['/post/card', {post:this.post}]);
        //this.router.navigateByUrl('/post/card', {'post':this.post});
      }
    }
  }
  // public handleClick(event:any) {
  //   if (event.view.getSelection().type !== 'Range') {
  //     alert('you clicked');
  //   }
  // }
  modelPopup(modal: any, post:Post|any) {
    //this.modalData = post;
    //this.modal = modal;
    this.modalReference = this.modalService.open(modal, { centered: true});
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
