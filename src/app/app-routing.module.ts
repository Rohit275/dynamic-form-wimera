import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { CreateFormComponent } from './components/create-form/create-form.component';
import { GenerateFormComponent } from './components/generate-form/generate-form.component';
import { HomeComponent } from './components/home/home.component';
import { HomeLayoutComponent } from './layout/home-layout.component';
import { LoginLayoutComponent } from './layout/login-layout.component';
import { ViewFormsComponent } from './components/view-forms/view-forms.component';
import { FormDisplayComponent } from './components/form-display/form-display.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
      },
    ],
  },
  {
    path: 'user/:id',
    component: HomeLayoutComponent,
    children: [
      { path: 'create', component: CreateFormComponent },
      { path: 'home', component: HomeComponent },
      { path: 'form-list/:cname/:csname', component: FormDisplayComponent },
      { path: 'align', component: GenerateFormComponent },
      { path: 'view-form', component: ViewFormsComponent },
    ],
  },
  // { path: 'logged', component: HomeComponent },
  // { path: 'create', component: CreateFormComponent },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
