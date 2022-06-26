import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormData } from '../model/form-data.model';
import { FormDataDTO } from '../model/tracker-info-dto.model';
import { SpendTrackerDataSenderService } from '../service/spend-tracker-data-sender.service';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData, private spendTrackerDataSenderService: SpendTrackerDataSenderService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  public onNoClick(spendTrackerForm: FormDataDTO): void {
    this.dialogRef.close(spendTrackerForm);
    this.spendTrackerDataSenderService.sendSpendTrackerData(spendTrackerForm).subscribe((details) => {
      console.log("response: ", details);
      if (details === true) {
        this._snackBar.open("Information Save", "Success", { duration: 2000 });
      } else {
        this._snackBar.open("Information Save", "Failed", { duration: 2000 });
      }
    });
  }

}
