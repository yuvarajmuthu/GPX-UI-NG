import { Component, HostListener, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-managed',
  templateUrl: './managed.component.html',
  styleUrls: ['./managed.component.scss']
})
export class ManagedComponent implements OnInit {
  navFixed: boolean = false;
  private scrollOffset: number = 200;
  constructor(private alertService: AlertService) { }
  keyword = 'name';
  data = [
    {
      id: 1,
      name: 'Georgia',
      image:'../../../../assets/images/avatar1.png'
    },
     {
       id: 2,
       name: 'Usa',
       image:'../../../../assets/images/avatar1.png'
     },
     {
       id: 3,
       name: 'England',
       image:'../../../../assets/images/avatar1.png'
     }
  ];
  selectArray:any=[]
  isInCircle: boolean = false;

  ngOnInit(): void {
  }
  @HostListener('window:scroll')
  onWindowScroll() {
    this.navFixed = (window.pageYOffset
      || document.documentElement.scrollTop
      || document.body.scrollTop || 0
    ) > this.scrollOffset;
  }
  selectEvent(item:any) {
    console.log(item);
    this.selectArray.push(item)
    console.log(this.selectArray,"array total");
    // do something with selected item
  }

  onChangeSearch(val: string) {
    console.log(val);
    
    // fetch remote data from here
    // And reassign the 'data' which is binded to 'data' property.
  }
  
  onFocused(e:any){
    console.log(e);
    
    // do something when input is focused
  }
  remove(i:any){
    /*
      Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#0db685',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
          if (result.isConfirmed) {
            this.selectArray.splice(i, 1);
              this.alertService.ToastMessage('Deleted', 'Your card has been deleted.', 'success');
          }
      })
*/
      this.alertService.question("User will be removed from this profile.").then((result) => {
        if (result.isConfirmed) {
          this.selectArray.splice(i, 1);
          this.alertService.ToastMessage('Deleted', 'User has been removed from this profile.', 'success');
        }
    })
  }
}
