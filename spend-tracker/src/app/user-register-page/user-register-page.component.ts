import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { UserFieldNames, FieldType, UserNameKey, RecordsRouteLink, LoginRouteLink } from '../model/constants';
import { FormData } from '../model/form-data.model';
import { FormDataDTO } from '../model/tracker-info-dto.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-user-register-page',
  templateUrl: './user-register-page.component.html',
  styleUrls: ['./user-register-page.component.css']
})
export class UserRegisterPageComponent implements OnInit {

  public heading: string = "Register";

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
    if(localStorage.getItem(UserNameKey) != null) {
      this.route.navigate([RecordsRouteLink]);
    }
    this.data = {
      heading: this.heading,
      fields: this.fields,
      links: [{
        title: "Already Registered? Click here to login",
        url: LoginRouteLink
      }]
    }
  }

  public onSubmitClick(userData: FormDataDTO) {
    this.userService.saveUser(userData).subscribe(details => {
      console.log("details in Login is valid user: ", details);
      if (details === true) {
        this.route.navigate([LoginRouteLink]);
        this._snackBar.open("Registration", "Success", { duration: 2000 });
      } else {
        this._snackBar.open("Registration - UserAlreadyExists", "Failed", { duration: 2000 });
      }
    })
  }

}
