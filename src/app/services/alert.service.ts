import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import Swal from 'sweetalert2';

import { Alert, AlertType } from '../models/alert';

import { AbstractService } from './abstract.service';

@Injectable({
    providedIn: 'root'
})
export class AlertService extends AbstractService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        super();
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
            timer: 5000
        });
        successToast.fire(title, message, icon);
    }



    getAlert(): Observable<any> {
        return this.subject.asObservable();
    }

    success(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Success, message, keepAfterRouteChange);
    }

    error(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Error, message, keepAfterRouteChange);
    }

    info(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Info, message, keepAfterRouteChange);
    }

    warn(message: string, keepAfterRouteChange = false) {
        this.alert(AlertType.Warning, message, keepAfterRouteChange);
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
