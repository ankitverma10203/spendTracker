import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpendTrackerDataModiferService } from '../service/spend-tracker-data-modifer.service';
import { FormComponent } from '../form/form.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  @Input() public fields: any = '';
  @Input() public date: any = '';
  @Input() public totalAmounts: any = '';
  @Input() public records: any = '';
  @Output() public recordUpdated: EventEmitter<any> = new EventEmitter();

  constructor(
    private spendTrackerDataModiferService: SpendTrackerDataModiferService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  public deleteRecord(record: any): void {
    const id: string = record['_id'];
    this.spendTrackerDataModiferService.deleteRecord(id).subscribe(() => {
      this.records[this.date] = this.records[this.date].filter(
        (rec: any) => rec['_id'] != record['_id']
      );
      this.totalAmounts[this.date] =
        this.totalAmounts[this.date] - record['Amount'];
      this._snackBar.open('Record Deletion', 'Success', { duration: 2000 });
    });
  }

  public openDialog(date: string, record: any): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      data: {
        heading: 'Add Spend Details',
        fields: this.fields,
        addToOldDate: true,
        date: date,
        record: record,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('dialog results: ', result);
      if (result != undefined) {
        this.recordUpdated.emit(record['_id']);
      }
    });
  }
}
