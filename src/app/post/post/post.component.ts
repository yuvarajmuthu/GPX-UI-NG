import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
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
  constructor() { }

  ngOnInit(): void {
  }
  get f(){
    return this.myForm.controls;
  }
  removeSelectedFile(index:any){
    this.images.splice(index,1);
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

}

