import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpResponse, HttpErrorResponse} from '@angular/common/http';

import { User } from '../../../models/user';

import {first, catchError} from 'rxjs/operators';

import {AlertService} from '../../../services/alert.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {DatashareService} from '../../../services/datashare.service';
import {UserService} from '../../../services/user.service';
import {ComponentcommunicationService} from '../../../services/componentcommunication.service';

import { SocialAuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    private user: SocialUser;
    private loggedIn: boolean;
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService,
        private userService: UserService,
        private datashareService: DatashareService,
        private componentcommunicationService: ComponentcommunicationService,
        private extAuthService: SocialAuthService
    ) {
        // redirect to home if already logged in
        // if (this.authenticationService.currentUserValue) {
        //     this.router.navigate(['/']);
        // }
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        /*
        this.route.queryParams.subscribe(       retUrl => {         
            this.returnUrl = retUrl.returnUrl;       
        }     );
        */
        //SUBSCRIBING TO OPENID SUCH AS GOOGLE, FACEBOOK LOGIN EVENTS - authState::SocialUser
        
        this.extAuthService.authState.subscribe((user) => {
            this.user = user;//SocialUser
            this.loggedIn = (user != null);

            if(this.loggedIn){          
                let userObj = new User();

                if(this.user['provider']){
                    let token:string = '';
                    if(this.user['provider'] === 'GOOGLE'){
                        token = this.user['idToken'];
                    }else if(this.user['provider'] === 'FACEBOOK'){
                        token = this.user['authToken'];
                    }
                    //with openid, external token should be converted to application level token
                    //send the token to /tokenVerify using x-id-token headername
                    //response header will have authorization: Bearer token
                   // console.log('response from ' , this.user['provider'], ' with token', token);

                    this.userService.tokenVerify(token, this.user['provider'])
                    .subscribe(response => {


                        userObj.emailId = this.user['email'];
                        userObj.firstName = this.user['firstName'];
                        userObj.lastName = this.user['lastName'];
                        userObj.photoUrl = this.user['photoUrl'];
                        userObj.provider = this.user['provider'];
                        userObj.username = this.user['email'];
                        console.log('response from login ', userObj);
                        localStorage.setItem('currentUserName', userObj.emailId);          

                        this.datashareService.setCurrentUser(userObj);
      
                        this.componentcommunicationService.loginChanged(true);
        
        
                        this.alertService.success('Login successful', true);
                        this.router.navigate([this.returnUrl]);
        
                    });

                }
     
      


            }else if(localStorage.getItem('currentUserToken') != null){
                this.alertService.success('Login successful', true);
                this.router.navigate([this.returnUrl]);
            }

          });
          

    }

// convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }
    flipcss = 'btn-default';

    Flip() {
      if(this.flipcss == 'btn-change') {
        this.flipcss = 'btn-default';
      } else {
        this.flipcss = 'btn-change';
      }
    }
    //inhouse login
    login() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }
        /*console.log(this.loginForm.value);*/
        this.loading = true;
        this.authenticationService.login(this.loginForm.value)
            //.pipe(first())
            .subscribe(
                (response) => {

                    this.alertService.success('Login successful', true);
                    
                    this.loading = false;
                    this.router.navigate([this.returnUrl]);

                },
                (error:HttpErrorResponse) => {
                    console.log("login error ", error);
                    this.alertService.error('Problem with Login : ' + error.error.message);
                    this.loading = false;
                });
                
    }

    loginG() {
        this.authenticationService.signInWithGoogle();
    }

    loginFB() {
        this.authenticationService.signInWithFB();
    }

    loadRegisterComponent() {
        this.router.navigate(['/register']);
    }
}
