import { Injectable, isDevMode } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Legislator } from './../models/legislator';

import {DatashareService} from '../services/datashare.service';
import {AbstractService} from './abstract.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends AbstractService{
  result:any; 
  resultop:any;
  devMode:boolean;

  serviceUrl:string;// = "http://127.0.0.1:8080/profile/template";
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor (private http: HttpClient, private dataShareService:DatashareService) {
    super();

    this.serviceUrl = dataShareService.getServiceUrl() + "/profile/template";
    this.devMode = isDevMode();

  }
  

  getProfileTemplate(profileTemplateId:string):Observable<any> {    
      let serviceUrl = this.serviceUrl + "/getProfileTemplate/" + profileTemplateId;
      console.log("getProfileTemplate profile.service this.serviceUrl " + serviceUrl);
      let headers      = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON

      return this.http.get(serviceUrl, this.httpOptions)
      .pipe(
        //map((response:Response) => response.json()), 
        //tap(_ => this.log(`fetched getProfileTemplate`)),
        catchError(this.handleError<any>(`Error in getProfileTemplate()`))
      );                            
  }

  getProfileTemplateByCategory(profileTemplateId:string, category:string):Observable<any> {    
    let serviceUrl = this.serviceUrl + "/getProfileTemplate/" + profileTemplateId;
    console.log("getProfileTemplateByCategory profile.service this.serviceUrl " + serviceUrl, " , category ", category);
    //DEV MODE
    if(this.devMode){  
      serviceUrl = '/assets/json/fromService/profileTemplate.json';   
    }
    //serviceUrl = '/assets/json/fromService/profileTemplate.json';   

    return this.http.get(serviceUrl, { responseType: 'json', params: {
      category: category
    } }).pipe(
      //tap(_ => this.log(`fetched getProfileTemplateByCategory`)),
      catchError(this.handleError<any>(`Error in getProfileTemplateByCategory()`))
    );

    
  }

  //list the templates that are available to use, ignores the one that are already used
  getAvailableProfileTemplatesForEntity(entityId:string, category:string):Observable<any> {    
    let serviceUrl = this.serviceUrl + "/getAllProfileTemplates/" + entityId + "/";
    console.log("getAvailableProfileTemplatesForEntity profile.service this.serviceUrl " + serviceUrl);
    //DEV MODE
    if(this.devMode){  
      serviceUrl = '/assets/json/fromService/profileTemplates.json';   
    }
    //serviceUrl = '/assets/json/fromService/profileTemplates.json';   

    return this.http.get(serviceUrl, { responseType: 'json', params: {
      category: category
    } }).pipe(
      //tap(_ => this.log(`fetched getAvailableProfileTemplatesForEntity`)),
      catchError(this.handleError<any>(`Error in getAvailableProfileTemplatesForEntity()`))
    );

    
  }

  getAvailableProfileTemplates(category:string):Observable<any> {    
    let serviceUrl = this.serviceUrl + "/getAllProfileTemplates";
    console.log("getAvailableProfileTemplates profile.service this.serviceUrl " + serviceUrl);
    
    return this.http.get(serviceUrl, { responseType: 'json', params: {
      category: category
    } }).pipe(
      //tap(_ => this.log(`fetched getAvailableProfileTemplates`)),
      catchError(this.handleError<any>(`Error in getAvailableProfileTemplates()`))
    );
}

}
