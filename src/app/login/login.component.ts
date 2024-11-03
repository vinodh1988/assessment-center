import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private login: LoginService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if the token already exists

    const token = sessionStorage.getItem('access_token');
    if (token) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      this.http.post<any>('http://15.207.18.117:5000/login', { username, password }).subscribe(
        response => {
          
          sessionStorage.setItem('access_token', response.access_token);
          this.login.setStatus(true)
          this.router.navigate(['/home']);
        },
        error => {
          this.loginError = true;
          console.error('Login failed', error);
        }
      );
    }
  }
}
