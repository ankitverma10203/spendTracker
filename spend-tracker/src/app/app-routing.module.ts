import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';

const routes: Routes = [
  {
    path: 'user', component: LoginRegisterPageComponent, children: [
      { path: 'login', component: AuthenticationPageComponent },
      { path: 'register', component: UserRegisterPageComponent },
    ]
  },
  { path: '', redirectTo: '/user/login', pathMatch: 'full' },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard],
    children: [
      { path: 'records', component: RecordsPageComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
