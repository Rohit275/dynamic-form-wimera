import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { GenerateFormComponent } from './components/generate-form/generate-form.component';
import { HomeComponent } from './components/home/home.component';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { HttpClientModule } from '@angular/common/http';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { ViewFormsComponent } from './components/view-forms/view-forms.component';
import { FormDisplayComponent } from './components/form-display/form-display.component';
import { SidenavContentsComponent } from './components/navbar/sidenav-contents/sidenav-contents.component';
import { FileUploaderComponent } from './components/file-upload/file-uploader/file-uploader.component';

@NgModule({
  declarations: [
    AppComponent,
    CreateFormComponent,
    GenerateFormComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    LoginLayoutComponent,
    HomeLayoutComponent,
    ViewFormsComponent,
    FormDisplayComponent,
    SidenavContentsComponent,
    FileUploaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    DragDropModule,
    FlexLayoutModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
