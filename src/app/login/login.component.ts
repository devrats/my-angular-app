import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormService } from '../services/form.service';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from "../nav-bar/nav-bar.component";

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  styleUrl : 'login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup<any>;
  registerForm!: FormGroup<any>;
  isLoginMode = true;

  constructor(private authService: AuthService, private formService : FormService, private router: Router) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.formService.login;
    this.registerForm = this.formService.register;
  }

  async handleRegister() {
    try {
      if(this.registerForm.valid){
        const result = await this.authService.register(this.registerForm.value?.email, this.registerForm.value?.password);
        console.log('Registered:', result);
        window.alert('Registration successful');
        this.toggleMode();
      }
    } catch (error) {
      console.error('Registration Error:', error);
    }
  }

  async handleLogin() {
    try {
      if(this.loginForm.valid){
        const result = await this.authService.login(this.loginForm.value?.email, this.loginForm.value?.password);
        console.log('Logged in:', result);
        localStorage.setItem('token', result.token);
        localStorage.setItem('email', result.email);
        this.router.navigate(['/dashboard']);
      }
    } catch (error) {
      console.error('Login Error:', error);
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}