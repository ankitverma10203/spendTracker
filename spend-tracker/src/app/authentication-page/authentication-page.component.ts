import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { FieldNames, FieldType } from '../model/field-type';
import { FormData } from '../model/form-data.model';
import { FormDataDTO } from '../model/tracker-info-dto.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.css']
})
export class AuthenticationPageComponent implements OnInit {
  public heading: string = "Login";

  public data: FormData = new FormData();

  public fields: FieldInfo[] = [
    {
      name: FieldNames.emailId,
      type: FieldType.email,
      defaultValue: "",
      options: [],
      isRequired: true
    },
    {
      name: FieldNames.password,
      type: FieldType.password,
      defaultValue: "",
      options: [],
      isRequired: true
    }
  ]
  constructor(private route: Router, private userService: UserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    if(localStorage.getItem('username') != null) {
      this.route.navigate(['/home/records']);
    }
    this.data = {
      heading: this.heading,
      fields: this.fields,
      links: [{
        title: "New User? Click here to register",
        url: "/register"
      }]
    }
  }

  public onSubmitClick(loginForm: FormDataDTO) {
    this.userService.isValidUser(loginForm).subscribe(details => {
      console.log("details in Login is valid user: ", details);
      if (details === true) {
        const username = loginForm[FieldNames.emailId].toString();
        localStorage.setItem("username", username);
        localStorage.setItem("isLoggedIn", "true");
        this.route.navigate(['/home/records']);
      }
      this._snackBar.open("Form submit", "Success", { duration: 2000 });
    })
  }

}
