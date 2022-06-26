import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from '../form-dialog/form-dialog.component';
import { FieldInfo } from '../model/field-info.model';
import { CategoryFieldOptions, FieldType, RecordFieldNames, RecordPageHeading } from '../model/constants';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {
  public heading: string = RecordPageHeading;

  public fields: FieldInfo[] = [
    {
      name: RecordFieldNames.category,
      type: FieldType.dropDown,
      defaultValue: "",
      options: CategoryFieldOptions,
      isRequired: true
    },
    {
      name: RecordFieldNames.message,
      type: FieldType.text,
      defaultValue: "",
      options: [],
      isRequired: true
    },
    {
      name: RecordFieldNames.amount,
      type: FieldType.number,
      defaultValue: "",
      options: [],
      isRequired: true
    }
  ]

  @ViewChild('recordComp') private recordComp: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: '600px',
      data: { heading: "Add Spend Details", fields: this.fields }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("dialog results: ", result);
      if (result != undefined) {
        this.recordComp.getAllData();
      }
    });
  }

}
