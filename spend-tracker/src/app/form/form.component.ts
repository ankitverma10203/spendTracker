import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/field-type';
import { FormData } from '../model/form-data.model';
import { TrackerInfoDTO } from '../model/tracker-info-dto.model';
import { SpendTrackerDataSenderService } from '../service/spend-tracker-data-sender.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  spendTrackerForm: FormGroup = new FormGroup({});

  constructor(private spendTrackerDataSenderService: SpendTrackerDataSenderService,
    private route: Router,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData) { }

  ngOnInit(): void {
    this.initForm();
  }

  public initForm() {
    this.spendTrackerForm = new FormGroup({});

    this.data.fields.forEach(field => {
      this.spendTrackerForm.addControl(field.name, new FormControl(field.defaultValue));
      if (field.isRequired) {
        this.spendTrackerForm.get(field.name)?.addValidators(Validators.required);
      }
      if (field.type === FieldType.number) {
        this.spendTrackerForm.get(field.name)?.addValidators(Validators.pattern("[0-9]+"));
      }
    });
  }

  isDropdown(field: FieldInfo): boolean {
    return field.type == FieldType.dropDown;
  }

  isSubmitDisabled() {
    return !this.spendTrackerForm.valid;
  }

  onSubmit() {
    console.log("formData: ", this.spendTrackerForm.value);
    let trackerInfo: TrackerInfoDTO = this.trackerInfo();
    this.onNoClick();
    this.spendTrackerDataSenderService.sendSpendTrackerData(trackerInfo).subscribe((details) => {
      console.log("response: ", details);
      // this.spendTrackerForm.patchValue(
      //   { "Amount": 0 }
      // )
      this._snackBar.open("Form submit", "Success", { duration: 3000 });

      this.spendTrackerForm.reset();
      this.route.navigate(['/homepage'])
    });

  }

  public trackerInfo(): TrackerInfoDTO {
    let test: TrackerInfoDTO = new TrackerInfoDTO();
    this.data.fields.forEach((field) => {
      test[field.name] = this.spendTrackerForm.get(field.name)?.value;
    })

    console.log("trackerInfo: ", test);

    return test;
  }

  isDefaultHintHidden(fieldName: string): boolean {
    return !this.isInvalidPatternHintHidden(fieldName) && !this.isRequiredErrorHidden(fieldName);
  }

  isInvalidPatternHintHidden(fieldName: string): boolean {
    return !this.spendTrackerForm.get(fieldName)?.hasError('pattern');
  }

  isRequiredErrorHidden(fieldName: string): boolean {
    return !this.spendTrackerForm.get(fieldName)?.hasError('required');
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
