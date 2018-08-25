import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params  } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterValidation } from './register-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegisterValidation.MatchPassword // your validation method
    });
  }

  // tryFacebookLogin(){
  //   this.authService.doFacebookLogin()
  //   .then(res =>{
  //     this.router.navigate(['/user']);
  //   }, err => console.log(err)
  //   )
  // }

  // tryTwitterLogin(){
  //   this.authService.doTwitterLogin()
  //   .then(res =>{
  //     this.router.navigate(['/user']);
  //   }, err => console.log(err)
  //   )
  // }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res =>{
      this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      // this.errorMessage = "";
      // this.successMessage = "Your account has been created";
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      // this.errorMessage = err.message;
      // this.successMessage = "";
    })
  }

  onSubmit() {
    console.log(this.registerForm);
  }

}
