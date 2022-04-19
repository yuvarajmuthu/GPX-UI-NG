import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {SearchService} from '../../services/search.service';

@Component({
  selector: 'app-global-search',
  templateUrl: './global-search.component.html',
  styleUrls: ['./global-search.component.scss']
})
export class GlobalSearchComponent implements OnInit {

  @Input() placeholder: string;
  @Input() category:string;
  @Input() inputvalue:string;
  @Input() from:string;
  @Output() valueChange = new EventEmitter();
  @Output() valueSelect = new EventEmitter();
  @Output() valueSave = new EventEmitter();

  keywordUser = 'full_name';
  selectedUser:any;
  selectedDetails:any;
  searchUsers:any;

  constructor(private searchService:SearchService) { }

  ngOnInit() {
    this.selectedUser = this.inputvalue;
  }

  onChangeSearch(e:any){
    this.valueChanged(e);
    this.searchService.getUsers(e)
    .subscribe((data:any) => {
        this.searchUsers = data;
    });
   }

   onValueSelect(selectedDetails:string){
    this.selectedDetails = selectedDetails;
    this.valueSelect.emit(selectedDetails);
 }

   valueChanged(selectedDetails:string){
      this.selectedDetails = selectedDetails;
      this.valueChange.emit(selectedDetails);
   }

   onFocused(e:any){
    // do something when input is focused
  }

   editProfile(evt:any){
     if(this.selectedDetails == '' || this.selectedDetails == null || this.selectedDetails == undefined){
        this.selectedDetails = {};
        this.selectedDetails['full_name'] = this.selectedUser;
     }
    this.valueSave.emit(this.selectedDetails);
   }
   

}
