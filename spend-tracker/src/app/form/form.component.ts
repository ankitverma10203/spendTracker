import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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

  public spendTrackerForm: FormGroup = new FormGroup({});

  constructor(private spendTrackerDataSenderService: SpendTrackerDataSenderService,
    private _snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<FormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData) { }

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
    });
  }

  public isDropdown(field: FieldInfo): boolean {
    return field.type == FieldType.dropDown;
  }

  public isSubmitDisabled(): boolean {
    return !this.spendTrackerForm.valid;
  }

  public onSubmit(): void {
    console.log("formData: ", this.spendTrackerForm.value);
    let trackerInfo: TrackerInfoDTO = this.trackerInfo();
    this.onNoClick();
    this.spendTrackerDataSenderService.sendSpendTrackerData(trackerInfo).subscribe((details) => {
      console.log("response: ", details);
      this._snackBar.open("Form submit", "Success", { duration: 2000 });
      this.spendTrackerForm.reset();
    });

  }

  public trackerInfo(): TrackerInfoDTO {
    let trackerInfo: TrackerInfoDTO = new TrackerInfoDTO();
    this.data.fields.forEach((field) => {
      trackerInfo[field.name] = this.spendTrackerForm.get(field.name)?.value;
    })
    console.log("trackerInfo: ", trackerInfo);
    return trackerInfo;
  }

  public onNoClick(): void {
    this.dialogRef.close(this.spendTrackerForm);
  }

}
