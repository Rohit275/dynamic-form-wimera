import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;
  path: string = '../../assets/images/sign-in.svg';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {}

  onLogin(form: NgForm) {
    // console.log(form.value);
    this.authService.login(form.value);
  }
}
