import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpendTrackerDataModiferService } from '../service/spend-tracker-data-modifer.service';

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

  constructor(
    private spendTrackerDataModiferService: SpendTrackerDataModiferService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  public deleteRecord(record: any): void {
    const id: string = record['id'];
    this.spendTrackerDataModiferService
      .deleteRecord(id)
      .subscribe(() => {
        this.records[this.date] = this.records[this.date].filter(
          (rec: any) => rec['id'] != record['id']
        );
        this.totalAmounts[this.date] = this.totalAmounts[this.date] - record['Amount'];
        this._snackBar.open('Record Deletion', 'Success', { duration: 2000 });
      });
  }
}
