import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';

const routes: Routes = [
  { path: 'login', component: AuthenticationPageComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'register', component: UserRegisterPageComponent },
  {
    path: 'home', component: NavBarComponent, canActivate: [AuthGuard],
    children: [
      { path: 'records', component: RecordsPageComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
