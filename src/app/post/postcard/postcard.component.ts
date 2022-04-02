import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {
  public model = {
    name: 'Hardik',
    description: '<p>This is a sample form using CKEditor 4.</p>'
  };
  images = [
  {
    id: 1,
    url: "../../../assets/profile.png"
  },
  {
    id: 2,
    url: "../../../assets/images/avatar1.png"
  },
  {
    id: 3,
    url: "../../../assets/profile.png"
  },
  {
    id: 4,
    url: "../../../assets/images/avatar1.png"
  }
];
@ViewChild('largeSlider') editmodalShow: TemplateRef<any>;
  isLiked = false;
  constructor(private router: Router,private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  //  openModal(largeSlider: any) {
  //   this.modalService.open(largeSlider, { size: 'lg',centered: true });
  // }
  like($event:any){
    console.log("Save button is clicked!", $event);  
    this.isLiked = !this.isLiked
  }
  commentPage(event:any){
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
    else if(event.srcElement.id=='image'){
      this.modalService.open(this.editmodalShow, { size: 'lg',centered: true });
    }
    else{
      this.router.navigate(['/post/comment']);
    }
  }
}
