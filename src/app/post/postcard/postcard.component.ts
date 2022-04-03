import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-postcard',
  templateUrl: './postcard.component.html',
  styleUrls: ['./postcard.component.scss']
})
export class PostcardComponent implements OnInit {
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
}
