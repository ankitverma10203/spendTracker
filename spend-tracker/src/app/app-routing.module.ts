import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecordsPageComponent } from './records-page/records-page.component';

const routes: Routes = [
  {path:'records', component:RecordsPageComponent},
  {path:'', redirectTo:'/records', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
