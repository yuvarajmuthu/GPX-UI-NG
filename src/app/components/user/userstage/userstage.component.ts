import { Component, HostListener, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-userstage',
  templateUrl: './userstage.component.html',
  styleUrls: ['./userstage.component.scss']
})
export class UserstageComponent implements OnInit {

  navFixed: boolean = false;
  private scrollOffset: number = 450;
  SectionName=''
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
    dropdownList:Array<any> = [];
    selectedItems:Array<any> = [];
    dropdownSettings = {};
  constructor(private modalService: NgbModal) { }
  
  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


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
  largeModal(largeDataModal: any) {
    this.modalService.open(largeDataModal, { centered: true });
  }
  
  OpenSection(SectionModel: any,Section:any) {
    this.modalService.open(SectionModel, { centered: true });
    this.SectionName=Section
  }
  // showText() {
  //   this.isReadMore = !this.isReadMore
  // }
  @HostListener('window:scroll')
  onWindowScroll() {
    this.navFixed = (window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  // largeModalAbout(largeDataModalAbout: any) {
  //   this.modalService.open(largeDataModalAbout, { centered: true });
  // }

  fileNameProfile: string = "";
  onChangeProfile(event:any) {
    this.fileNameProfile = event.target.files[0].name;
  }
  fileNamecover: string = "";
  onChangecover(event:any) {
    this.fileNamecover = event.target.files[0].name;
  }
}
