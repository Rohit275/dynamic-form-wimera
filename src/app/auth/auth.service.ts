import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router: Router) {}

  users: any;

  login(userData: any) {
    this.http
      .post<{ message: string; user: any }>(
        'http://localhost:3000/api/users/login',
        { username: userData.userName, password: userData.password }
      )
      .pipe(
        map((data) => {
          return data;
        })
      )
      .subscribe(
        (userData) => {
          this.users = userData.user;
          // console.log('User Data in service: ', userData);
          // console.log('User Data in service: ', this.users);
          // this.router.navigate(['/user/:id/create', { id: this.users._id }]);
          this.router.navigate(['/user', this.users._id, 'home']);
          // this.usersUpdated.next([...this.users]);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
