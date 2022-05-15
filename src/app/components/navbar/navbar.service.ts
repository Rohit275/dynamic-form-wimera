import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  categories: any = [];
  subCategories: any = [];

  activeCategory: any[] = [];

  private categoryUpdated = new Subject<any[]>();
  private subCategoryUpdated = new Subject<any[]>();

  categoryListener = new BehaviorSubject<any>('');
  subcategoryListener = new BehaviorSubject<any>('');

  constructor(private http: HttpClient) {}

  getCategoryUpdateListener() {
    return this.categoryUpdated.asObservable();
  }

  getSubCategoryUpdateListener() {
    return this.subCategoryUpdated.asObservable();
  }

  currentCategoryUpdateListner() {
    // return this.currentCategoryUpdated.asObservable();
    return this.categoryListener;
  }
  currentSubCategoryUpdateListner() {
    // return this.currentCategoryUpdated.asObservable();
    return this.subcategoryListener;
  }

  getCategory() {
    this.http
      .get<{ message: string; category: any }>(
        'http://localhost:3000/api/category/getCategory'
      )
      .pipe(
        map((cat) => {
          // console.log(cat.category);
          return cat.category;
        })
      )
      .subscribe((data) => {
        // console.log(`Category fetched: ${data}`);
        // console.log('Category fetched: ', data);
        this.categories = data;
        this.categoryUpdated.next([...this.categories]);
      });
  }

  getSubCategory(category) {
    // console.log('In getSubCategory: ', category)
    this.http
      .post<{ message: string; subCategory: any }>(
        'http://localhost:3000/api/category/getSubCategory',
        {category: category}
      )
      .pipe(
        map((cat) => {
          // console.log(cat.category);
          return cat.subCategory;
        })
      )
      .subscribe((data) => {
        // console.log(`Category fetched: ${data}`);
        // console.log('Sub Category fetched: ', data);
        this.subCategories = data;
        this.subCategoryUpdated.next([...this.subCategories]);
      });
  }

  addCategory(value) {
    // console.log(`Name in service ${value.category}`);
    this.http
      .post<{ message: string; category: any }>(
        'http://localhost:3000/api/category/addCategory',
        {
          name: value.category,
        }
      )
      .pipe(
        map((cat) => {
          console.log(cat.category);
          return cat.category;
        })
      )
      .subscribe((respData) => {
        console.log(respData);
        // this.categories = respData;
        // this.categoryUpdated.next([this.categories]);
      });
  }

  addSubCategory(value, category) {
    // console.log("addSubCategory: ", value, category)
    this.http
      .post<{ message: string; category: any }>(
        'http://localhost:3000/api/category/addSubCategory',
        {
          name: value.sub_category,
          category: category
        }
      )
      .pipe(
        map((cat) => {
          console.log(cat.message);
          return cat.category;
        })
      )
      .subscribe((respData) => {
        console.log(respData);
        // this.categories = respData;
        // this.categoryUpdated.next([this.categories]);
      });
  }
}
