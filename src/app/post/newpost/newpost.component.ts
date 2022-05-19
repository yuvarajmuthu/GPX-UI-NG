import { Component, OnInit, Input, isDevMode } from '@angular/core';

import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

import {DatashareService} from '../../services/datashare.service';
import {UserService} from '../../services/user.service';
import {PostService} from '../../services/post.service';
import {AlertService} from '../../services/alert.service';

import {Post} from '../../models/post';
import {User} from '../../models/user';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-newpost',
  templateUrl: './newpost.component.html',
  styleUrls: ['./newpost.component.scss']
})
export class NewPostComponent implements OnInit {
  @Input() isComment: boolean;
  @Input() parentPostId: string;


  placeholder:string;
  profileSmImage: any = 'assets/images/userprofile.jpg';
  isImageLoading: boolean = false;
  currentUser:User;
  post: Post = new Post();
  postFormGroup: FormGroup;
  postFormData: FormData;


  htmlContent = '';
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
  images : any[] = [];
  isEmojiPickerVisible=false;
  myForm = new FormGroup({
   name: new FormControl('', [Validators.required, Validators.minLength(3)]),
   file: new FormControl('', [Validators.required]),
   fileSource: new FormControl('', [Validators.required])
 });
 public textArea: string = '';
 mentionConfig = {
  mentions: [
      {
          items: [ "Noah", "Liam", "Mason", "Jacob" ],
          triggerChar: '@'
      },
      {
          items: [ "Red", "Yellow", "Green" ],
          triggerChar: '#'
      },
  ]
}
  constructor(
    private datashareService: DatashareService,
    private userService: UserService,
    private postService: PostService,
    private alertService: AlertService,
    private formBuilder: FormBuilder
  ) { 
    //this.postFormGroup = this.formBuilder.group({});


  }

  ngOnInit(): void {
    //this.postFormGroup = this.formBuilder.group({file: ['']});
    //this.postFormData = new FormData();
    this.resetForm();

    this.currentUser = this.datashareService.getViewingUser();

    if(this.isComment){
      this.placeholder = "Please comment here";
    }else{
      this.placeholder = "Whats's happening?";
    }

    if (!isDevMode()){
        if(this.currentUser != null && this.currentUser['photoUrl'] != null){
            this.profileSmImage = this.currentUser['photoUrl'];
        }else{
            //this.getProfileSmImage(this.viewingUser['userId']);
            if(this.currentUser.profileAvatarImgFileId){
                this.getProfileSmImage(this.currentUser.profileAvatarImgFileId);
            }
        }
    }

  }

  resetForm(){
    this.images = [];
    this.postFormData = new FormData();
    this.textArea = '';
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

  get f(){
    return this.myForm.controls;
  }

  removeSelectedFile(index:any){
    this.images.splice(index,1);
    this.postFormData.delete('file');
  }

  fileNamecover: string = "";

  onFileChange(event:any) {
    this.fileNamecover = event.target.files[0].name;
    if (event.target.files && event.target.files[0]) {
        var filesAmount = event.target.files.length;
        for (let i = 0; i < filesAmount; i++) {
                var reader = new FileReader();
   
                reader.onload = (event:any) => {
                  console.log(event.target.result);
                   this.images.push(event.target.result); 
   
                   this.myForm.patchValue({
                      fileSource: this.images
                   });
                }
  
                reader.readAsDataURL(event.target.files[i]);

                this.postFormData.append('file', event.target.files[i]);
                //this.postFormGroup.get('file').setValue(event.target.files[i]);


        }
    }
  }

  autoGrowTextZone(e:any) {
    e.target.style.height = "5px";
    e.target.style.height = (e.target.scrollHeight + 5)+"px";
  }
 
  // textArea: string = '';
 
  addEmoji(event:any) {
     this.textArea = `${this.textArea}${event.emoji.native}`;
     this.isEmojiPickerVisible = false;
  }

  submitPost() {
    this.post.entityId = this.datashareService.getLoggedinUsername();
  
    this.post.postText = this.textArea;
    
    if (this.parentPostId != null) {
        this.post.parentPostId = this.parentPostId;
    }

    this.postFormData.append('post', JSON.stringify(this.post));

    if((!this.textArea || this.textArea.replace('/\s/g', '') === '') &&
         !this.postFormData.has('file')){
      this.alertService.info('Empty Post cannot be sent.', true);
      return;
    }

    this.postService.postComment(this.postFormData)
        .subscribe(
          (data:any) => {
            this.resetForm();

            this.alertService.success('Successfully posted.', true);
        
          },
          (err) => {
            console.log(err);
            this.alertService.ToastErrorMessage('Error', err.message, true);
          }
        );
    }

}

