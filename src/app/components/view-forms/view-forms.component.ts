//import { Component, OnInit } from '@angular/core';
import { ViewformService } from './viewform.service';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ReturnStatement } from '@angular/compiler';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { NgForm, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ComponentService } from '../component.service';
import { GenerateformService } from '../generate-form/generateform.service';

@Component({
  selector: 'app-view-forms',
  templateUrl: './view-forms.component.html',
  styleUrls: ['./view-forms.component.css'],
})
export class ViewFormsComponent implements OnInit {
  Field: any;
  Title: any;
  id: any;
  isSubmitted: boolean = false;
  constructor(
    private componentService: ComponentService,
    private generateFormService: GenerateformService,
    private router: Router
  ) {
    //console.log(this.route.getCurrentNavigation().extras.state);
  }

  //@Input() Field: any;

  ngOnInit(): void {
    this.id = this.componentService.currentId;
    this.Field = this.componentService.formValue;
    this.Title = 'Hello';
    console.log('Field val : ', this.Field);
  }

  isError(name: any) {
    console.log('Name:', name);
    return name.invalid;
  }

  isDragDrop(object: any): object is CdkDragDrop<string[]> {
    return 'previousIndex' in object;
  }

  drop(event: CdkDragDrop<string[]>) {
    if (this.isDragDrop(event)) {
      moveItemInArray(this.Field, event.previousIndex, event.currentIndex);
    }
  }

  onSubmit(f: NgForm) {
    this.isSubmitted = true;
    // this.generateFormService.addForm(this.Title, this.Field);
  }
}
