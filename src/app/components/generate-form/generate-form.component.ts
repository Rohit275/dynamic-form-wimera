import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReturnStatement } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../component.service';
import { GenerateformService } from './generateform.service';
import { NavbarService } from '../navbar/navbar.service';

@Component({
  selector: 'app-generate-form',
  templateUrl: './generate-form.component.html',
  styleUrls: ['./generate-form.component.css'],
})
export class GenerateFormComponent implements OnInit {
  Field: any;
  Title: any;
  id: any;
  isSubmitted: boolean = false;
  current_category: any = [];
  current_subcategory: any = [];
  constructor(
    private componentService: ComponentService,
    private generateFormService: GenerateformService,
    private navbarService: NavbarService,
    private router: Router
  ) {
    //console.log(this.route.getCurrentNavigation().extras.state);
  }

  //@Input() Field: any;

  ngOnInit(): void {
    this.id = this.componentService.currentId;
    this.Field = this.componentService.values;
    this.Title = this.Field[0].Title;
    console.log('Field val : ', this.Field);
    this.navbarService.currentCategoryUpdateListner().subscribe((data) => {
      this.current_category = data;
    });
    this.navbarService.currentSubCategoryUpdateListner().subscribe((data) => {
      this.current_subcategory = data;
    });
  }

  isError(name: any) {
    console.log('Name:', name);
    return name.invalid;
  }

  isDragDrop(object: any): object is CdkDragDrop<string[]> {
    return 'previousIndex' in object;
  }

  drop(event: CdkDragDrop<string[]>) {
    // console.log('Field:', this.Field, event.previousIndex, event.currentIndex);
    // moveItemInArray(this.Field, event.previousIndex, event.currentIndex);
    if (this.isDragDrop(event)) {
      moveItemInArray(this.Field, event.previousIndex, event.currentIndex);
    }
  }

  onSubmit(f: NgForm) {
    this.isSubmitted = true;
    console.log('Current category in generate form: ', this.current_category);
    this.generateFormService.addForm(
      this.Title,
      this.Field,
      this.current_category,
      this.current_subcategory,
    );
  }
}
