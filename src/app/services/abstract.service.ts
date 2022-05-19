import {AppInjector} from '../app.module';

import { Observable, of } from 'rxjs';

import { AlertService } from './alert.service';

export class AbstractService {

  alertService = AppInjector.get(AlertService);

  constructor() { 

  }
  
      /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
 
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
 
      // TODO: better job of transforming error for user consumption
      this.logError(`${operation} failed: ${error.message}`);
 
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
 
  public log(message: string) {
    this.alertService.success(message, true);

  }

  public logError(message: string) {
    this.alertService.error(message, true);

  }

  public logInfo(message: string) {
    this.alertService.info(message, true);

  }
  public logWarn(message: string) {
    this.alertService.warn(message, true);

  }

}