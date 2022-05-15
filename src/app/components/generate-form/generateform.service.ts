import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { ComponentService } from '../component.service';
import { ViewFormsComponent } from '../view-forms/view-forms.component';
import { ViewformService } from '../view-forms/viewform.service';
@Injectable({
  providedIn: 'root',
})
export class GenerateformService {
  constructor(
    private http: HttpClient,
    private componentService: ComponentService,
    private viewService: ViewformService,
    private router: Router
  ) {}
  id: any = this.componentService.currentId;

  UpdateFormVal(Form) {
    var id = this.componentService.currentId;
    this.http
      .put<{ message: string; user: any }>(
        'http://localhost:3000/api/forms/updateform/' + id,
        Form
      )
      .subscribe((val) => {
        //this.viewService.users.forms = Form;
        //this.viewComponent.ngOnInit();
        console.log('Value Updated Successfully!');
        this.router.navigate(['/user', id, 'view']);
      });
  }

  addForm(Name, data, category, subcategory) {
    this.http
      .post<{ message: string; id: Number; form: any }>(
        'http://localhost:3000/api/forms/addform',
        {
          name: Name,
          fields: data,
          category: category,
          subcategory: subcategory
        }
      )
      .subscribe((respData) => {
        console.log(respData.message);
        console.log(respData.id, this.componentService.currentId);
        this.UpdateFormVal(respData.form);
      });
  }
}
