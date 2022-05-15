import { Component, OnInit, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { ViewFormsComponent } from '../view-forms/view-forms.component';
import { FileUploaderComponent } from '../file-upload/file-uploader/file-uploader.component';

import { ViewformService } from '../view-forms/viewform.service';
import { ComponentService } from '../component.service';
import { NavbarService } from '../navbar/navbar.service';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.css'],
})
export class FormDisplayComponent implements OnInit {
  forms: any[];
  category: any = [];
  cat_name;
  sub_cat_name;
  id;

  isEmpty: boolean = true;

  path: string = "../../assets/images/empty.svg"

  constructor(
    private viewcomponent: ViewformService,
    private componentservice: ComponentService,
    private router: Router,
    private dialog: MatDialog,
    private navService: NavbarService
  ) {
    // console.log('Constructor in form display');
  }

  ngOnInit(): void {

    this.isEmpty = true;

    this.navService.currentCategoryUpdateListner().subscribe((data) => {
      this.cat_name = data;
    });
    this.navService.currentSubCategoryUpdateListner().subscribe((data) => {
      this.sub_cat_name = data;
      this.viewcomponent.getForms(this.cat_name,this.sub_cat_name);
    });

    this.id = this.componentservice.currentId;

    this.viewcomponent.getForms(this.cat_name,this.sub_cat_name);
    this.viewcomponent.getusersUpdateListener().subscribe((formvals) => {
      this.forms = formvals;
      if(formvals.length == 0) {
        this.isEmpty = true;
      } else {
        this.isEmpty = false;
      }
    });

  }

  onCreateNewForm() {
    // console.log(this.cat_name);
    this.router.navigate(['/user', this.id, 'create']);
  }

  onclickForm(id) {
    // console.log('id:', id, this.forms[id], this.id);
    this.componentservice.formValue = this.forms[id].field;
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '70%';
    this.dialog.open(ViewFormsComponent, dialogConfig);
  }

  onUploadFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '50%';
    this.dialog.open(FileUploaderComponent, dialogConfig);
  }
}
