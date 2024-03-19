import { Component } from '@angular/core';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {AuthService} from "../../services/auth.service";
import {LoginRequest} from "../interface/login-request";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginError:string = "";
  loginForm = this.formBuilder.group({
  username: ["", [Validators.required, Validators.email]],
  password: ['', Validators.required]
  });
  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {}

   get email() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value as LoginRequest)
        .subscribe({
          next: (userData) => {},
          error: (error) => {
            this.loginError = error;
          },
          complete: () => {
            console.info("Login completed");
            this.router.navigate(['home']);
            this.loginForm.reset();
          }
        });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
