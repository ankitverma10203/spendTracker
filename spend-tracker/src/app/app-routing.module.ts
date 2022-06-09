import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';

const routes: Routes = [
  {path:'authentication', component:AuthenticationPageComponent},
  {path:'', redirectTo:'/authentication', pathMatch:'full'},
  {path:'records', component:RecordsPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
