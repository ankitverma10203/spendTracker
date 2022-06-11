import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { FieldNames, FieldType } from '../model/field-type';
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
        title: "Already Registered? Click here to login",
        url: "/login"
      }]
    }
  }

  public onSubmitClick(userData: FormDataDTO) {
    this.userService.saveUser(userData).subscribe(details => {
      console.log("details in Login is valid user: ", details);
      if (details === true) {
        this.route.navigate(['/login']);
      }
      this._snackBar.open("Form submit", "Success", { duration: 2000 });
    })
  }

}
