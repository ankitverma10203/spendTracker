import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public heading: string = "";
  @Input() public fields: any = null;

  @ViewChild('recordComp') private recordComp: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      data: { heading: "Add Spend Details", fields: this.fields, addToOldDate: false },
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
