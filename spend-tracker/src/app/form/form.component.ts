import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/field-type';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  
  @Input() public heading: string = "";
  @Input() public fields: FieldInfo[] = [];
  
  spendTrackerForm: FormGroup = new FormGroup({});

  // public fieldNames : string[] = ["Category", "Message", "Amount"];
  // options: string[] = ["Education", "Food", "Electronics", "Others"];

  // dropDownFields: string[] = ["Category"];

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.spendTrackerForm = new FormGroup({});

    this.fields.forEach(field => {
      this.spendTrackerForm.addControl(field.name, new FormControl());
    });
  }

  isDropdown(field: FieldInfo): boolean {
    return field.type == FieldType.dropDown;
  }

  onSubmit() {
    console.log(this.spendTrackerForm.value);
  }

}
