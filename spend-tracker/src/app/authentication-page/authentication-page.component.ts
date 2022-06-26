import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { UserFieldNames, FieldType, UserNameKey, LoginPageHeading, RegisterRouteLink, RecordsRouteLink } from '../model/constants';
import { FormData } from '../model/form-data.model';
import { FormDataDTO } from '../model/tracker-info-dto.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.css']
})
export class AuthenticationPageComponent implements OnInit {
  public heading: string = LoginPageHeading;

  public data: FormData = new FormData();

  public fields: FieldInfo[] = [
    {
      name: UserFieldNames.emailId,
      type: FieldType.email,
      defaultValue: "",
      options: [],
      isRequired: true
    },
    {
      name: UserFieldNames.password,
      type: FieldType.password,
      defaultValue: "",
      options: [],
      isRequired: true
    }
  ]
  constructor(private route: Router, private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if (localStorage.getItem(UserNameKey) != null) {
      this.route.navigate([RecordsRouteLink]);
    }
    this.data = {
      heading: this.heading,
      fields: this.fields,
      links: [{
        title: "New User? Click here to register",
        url: RegisterRouteLink
      }]
    }
  }

  public onSubmitClick(loginForm: FormDataDTO) {
    this.userService.isValidUser(loginForm).subscribe(details => {
      console.log("details in Login is valid user: ", details);
      if (details === true) {
        const username = loginForm[UserFieldNames.emailId].toString();
        localStorage.setItem(UserNameKey, username);
        this.route.navigate([RecordsRouteLink]);
        this._snackBar.open("Login", "Success", { duration: 2000 });
      } else {
        this._snackBar.open("Login", "Failed", { duration: 2000 });
      }
    })
  }

}
