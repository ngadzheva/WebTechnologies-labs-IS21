import { Component, OnInit, OnDestroy, OnChanges, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService } from '../shared/services/auth.service';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy, OnChanges {
  isSubmitted: boolean;
  user: { [key: string]: string} = {};
  username: string;
  notMatch: boolean;
  errorMessage!: string;
  signupSubsrciption: Subscription | undefined;

  constructor(private authService: AuthService, private router: Router) { 
    console.log('Create')
    this.username = '';
    this.notMatch = false;
    this.isSubmitted = false;
  }

  ngOnInit() {
    console.log('Init')
  }

  ngOnChanges() {
    console.log('Change username:: ', this.username)
  }

  ngOnDestroy() {
    console.log('Destroy')
    if(this.signupSubsrciption){
      this.signupSubsrciption.unsubscribe();
    }
  }

  mustMatch(){
    if(this.user.password === this.user.confirmPassword){
      this.notMatch = false;
    } else {
      this.notMatch = true;
    }
  }

  onSubmit(){
    console.log(this.username)
    this.signupSubsrciption = this.authService.signup(this.user.userName, this.user.password, this.user.email).subscribe(response => {
      if(response.success){
        this.errorMessage = '';
        this.isSubmitted = true;
        this.router.navigateByUrl('/auth/login');
      } 
    }, error => {
      this.errorMessage = error.error.message;
    });
  }

}
