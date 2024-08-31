import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SigninComponent } from './signin/signin.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { PrimengModule } from '../primeng/primeng.module';


const route:Routes = [
  {
    path:"user/signin" , component:SigninComponent
  }
]


@NgModule({
  declarations: [
    SigninComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(route),
    PrimengModule,
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class SigninModule { }
