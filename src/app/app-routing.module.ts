import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',redirectTo:'user/signin', pathMatch:'full'
  },
  {
    path:'',loadChildren:()=>import('./signin/signin.module').then(n=>n.SigninModule)
  },
  {
    path:"**",redirectTo:'user/signin'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
