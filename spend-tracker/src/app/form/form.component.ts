import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/constants';
import { FormData } from '../model/form-data.model';
import { FormDataDTO } from '../model/tracker-info-dto.model';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public spendTrackerForm: FormGroup = new FormGroup({});
  @Input() public data: FormData = new FormData();
  @Output() public formInputEmitter = new EventEmitter<FormDataDTO>();

  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.spendTrackerForm = new FormGroup({});

    this.data.fields.forEach(field => {
      this.spendTrackerForm.addControl(field.name, new FormControl(field.defaultValue));
      if (field.isRequired) {
        this.spendTrackerForm.get(field.name)?.addValidators(Validators.required);
      }
      if (field.type === FieldType.number) {
        this.spendTrackerForm.get(field.name)?.addValidators(Validators.pattern("[0-9]+"));
      }
      if (field.type === FieldType.email) {
        this.spendTrackerForm.get(field.name)?.addValidators(Validators.email);
      }
    });
  }

  public isDropdown(field: FieldInfo): boolean {
    return field.type == FieldType.dropDown;
  }

  public isSubmitDisabled(): boolean {
    return !this.spendTrackerForm.valid;
  }

  public onSubmit(): void {
    console.log("Form Submitted");
    let formData: FormDataDTO = this.trackerInfo();
    this.formInputEmitter.emit(formData);
    // this.spendTrackerForm.reset();
  }

  public trackerInfo(): FormDataDTO {
    let trackerInfo: FormDataDTO = new FormDataDTO();
    this.data.fields.forEach((field) => {
      trackerInfo[field.name] = this.spendTrackerForm.get(field.name)?.value;
    })
    return trackerInfo;
  }

}
