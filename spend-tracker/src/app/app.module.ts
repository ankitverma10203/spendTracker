import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { RecordsComponent } from './records/records.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TableComponent } from './table/table.component';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { AuthenticationPageComponent } from './authentication-page/authentication-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { UserRegisterPageComponent } from './user-register-page/user-register-page.component';
import { FormContainerComponent } from './form-container/form-container.component';
import {MatMenuModule} from '@angular/material/menu';
import { HomePageComponent } from './home-page/home-page.component';
import { LoginRegisterPageComponent } from './login-register-page/login-register-page.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FormComponent,
    RecordsComponent,
    TableComponent,
    FormDialogComponent,
    AuthenticationPageComponent,
    RecordsPageComponent,
    UserRegisterPageComponent,
    FormContainerComponent,
    HomePageComponent,
    LoginRegisterPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatMenuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }