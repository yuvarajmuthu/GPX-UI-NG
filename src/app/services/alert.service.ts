import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Alert, AlertType } from '../models/alert';

import { AbstractService } from './abstract.service';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        
/*        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
      router.events.subscribe(event => {
          if (event instanceof NavigationStart) {
              if (this.keepAfterRouteChange) {
                  // only keep for a single route change
                  this.keepAfterRouteChange = false;
              } else {
                  // clear alert messages
                  this.clear();
              }
          }
      });
*/    }

    ToastMessage(title: any, message: any, icon: any) {
        const successToast = Swal.mixin({
            toast: true,
            position: 'bottom-end',
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1300
        });
        successToast.fire(title, message, icon);
    }



    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        //this.alert(AlertType.Success, message, keepAfterRouteChange);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
    }

    error(message: string, keepAfterRouteChange = false) {
        //this.alert(AlertType.Error, message, keepAfterRouteChange);
        Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
    }

    info(message: string, keepAfterRouteChange = false) {
        //this.alert(AlertType.Info, message, keepAfterRouteChange);
        Swal.fire({
            position: 'top-end',
            icon: 'info',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
    }

    warn(message: string, keepAfterRouteChange = false) {
        //this.alert(AlertType.Warning, message, keepAfterRouteChange);
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: message,
            showConfirmButton: false,
            timer: 1500
          })
    }

    question(message: string, keepAfterRouteChange = false) {
        return Swal.fire({
            title: 'Are you sure?',
            text: message,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#0db685',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
    }


    alert(type: AlertType, message: string, keepAfterRouteChange = false) {
        this.keepAfterRouteChange = keepAfterRouteChange;
        this.subject.next(<Alert>{ type: type, message: message });
    }

    clear() {
        // clear alerts
        //this.subject.next();
    }
}
