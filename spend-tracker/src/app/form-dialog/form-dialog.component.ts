import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormData } from '../model/form-data.model';

@Component({
  selector: 'app-form-dialog',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.css']
})
export class FormDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormData) { }

  ngOnInit(): void {
  }

  public onNoClick(spendTrackerForm: FormGroup): void {
    this.dialogRef.close(spendTrackerForm);
  }

}
