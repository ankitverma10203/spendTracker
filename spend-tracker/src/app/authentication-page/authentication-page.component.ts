import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/field-type';
import { FormData } from '../model/form-data.model';

@Component({
  selector: 'app-authentication-page',
  templateUrl: './authentication-page.component.html',
  styleUrls: ['./authentication-page.component.css']
})
export class AuthenticationPageComponent implements OnInit {
  public heading: string = "Authentication";

  public data: FormData = new FormData();

  public fields: FieldInfo[] = [
    {
      name: "Username",
      type: FieldType.text,
      defaultValue: "",
      options: [],
      isRequired: true
    },
    {
      name: "Password",
      type: FieldType.password,
      defaultValue: "",
      options: [],
      isRequired: true
    }
  ]
  constructor(private route: Router) { }

  ngOnInit(): void {
    this.data = {
      heading: this.heading,
      fields: this.fields
    }
  }

  onSubmitClick(autenticationForm: FormGroup) {
    this.route.navigate(['/records']);
  }

}
