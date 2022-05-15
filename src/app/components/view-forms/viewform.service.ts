import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ComponentService } from '../component.service';

@Injectable({
  providedIn: 'root',
})
export class ViewformService {
  users: any;
  private usersUpdated = new Subject<any[]>();

  getusersUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  constructor(
    private http: HttpClient,
    private componentService: ComponentService
  ) {}

  getForms(cat, sub) {

    let catID = cat._id;
    let subID = sub._id;

    // console.log('Cat Id: ', catID)

    var Userid = this.componentService.currentId;
    this.http
      .post<{ message: string; user: any }>(
        'http://localhost:3000/api/forms/getforms',
        { id: Userid, category: cat, subcategory: sub }
      )
      .subscribe(
        (userData) => {
          // console.log('GET Forms service:',userData)
          this.users = userData.user;
          // console.log('Before If (cat): ',this.users.category )

          // this.users = this.users.map((val)=> {
          //   if(val.category == catID && val.subCategory == subID) {
          //     return val
          //   } else {
          //     console.log('Nothing')
          //   }
          // })
          // console.log('After map: ', this.users)
          // console.log('GET Forms service: ', this.users)

          this.usersUpdated.next(this.users);
        },
        (err) => {
          console.log(err);
        }
      );
  }
}
