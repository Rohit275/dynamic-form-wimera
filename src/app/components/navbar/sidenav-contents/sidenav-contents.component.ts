import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms';

import { NavbarService } from '../navbar.service';
import { ComponentService } from '../../component.service';
import { FormDisplayComponent } from '../../form-display/form-display.component';

@Component({
  selector: 'app-sidenav-contents',
  templateUrl: './sidenav-contents.component.html',
  styleUrls: ['./sidenav-contents.component.css'],
})
export class SidenavContentsComponent implements OnInit, OnDestroy {

  category: any = [];
  subCategory: any = [];

  activeCategory: any = [];
  type: string = '';

  public id: any;
  private categorySub: Subscription;
  private categorySub2: Subscription;
  private subcategorySub: Subscription;

  panelOpenState = false;

  constructor(
    private navbarService: NavbarService,
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private cmpService: ComponentService,
    private formDisplay: FormDisplayComponent
  ) {}

  ngOnInit(): void {
    // console.log('NgOnInit in sidenav');
    this.navbarService.getCategory();
    this.categorySub = this.navbarService
      .getCategoryUpdateListener()
      .subscribe((categories) => {
        this.category = categories;
      });

    this.id = this.cmpService.currentId;

    this.subcategorySub = this.navbarService
      .getSubCategoryUpdateListener()
      .subscribe((categories) => {
        this.subCategory = categories;
      });

  }

  panelHeader(value) {
    // console.log("Header: ", value)
    this.activeCategory = value;

    this.navbarService.activeCategory = value;

    this.navbarService.getSubCategory(this.activeCategory);
    this.subcategorySub = this.navbarService
      .getSubCategoryUpdateListener()
      .subscribe((categories) => {
        this.subCategory = categories;
      });

    this.navbarService.categoryListener.next(value);
  }

  subSelector(value) {
    // console.log('subSelector: ', value)
    this.navbarService.subcategoryListener.next(value);
    this.router.navigate(['/user', this.id, 'form-list', this.activeCategory.category_name, value.sub_category_name]);
  }

  addCategory(templateRef, type) {
    this.type = type;
    let dialogRef = this.dialog.open(templateRef, {
      width: '30%',
    });
  }

  addSubCategory(value) {

  }

  categoryLog(form: NgForm) {

    if(this.type == 'category') {
      this.navbarService.addCategory(form.value);
    } else {
      this.navbarService.addSubCategory(form.value,this.activeCategory);
    }

    setTimeout(() => {
      this.navbarService.getCategory();
      this.categorySub2 = this.navbarService
        .getCategoryUpdateListener()
        .subscribe((categories) => {
          console.log('Category Log: ', categories);
          this.category = categories;
        });
    });

    let dialogRef = this.dialog.closeAll();
  }

  categorySelect(value) {
    console.log('Current category: ', value);

    this.navbarService.categoryListener.next(value);

    this.router.navigate(['/user', this.id, 'form-list', value.category_name]);
  }

  ngOnDestroy(): void {
    this.categorySub.unsubscribe();
    this.subcategorySub.unsubscribe();
    // this.categorySub2.unsubscribe();
  }
}
