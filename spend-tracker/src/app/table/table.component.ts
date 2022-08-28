import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SpendTrackerDataModiferService } from '../service/spend-tracker-data-modifer.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  @Input() public fields: any = '';
  @Input() public date: any = '';
  @Input() public totalAmounts: any = '';
  @Input() public records: any = '';

  constructor(private spendTrackerDataModiferService: SpendTrackerDataModiferService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void { }

  public deleteRecord(id: string) : void {
    console.log(this.records[this.date][0]);
    this.spendTrackerDataModiferService.deleteRecord(id).subscribe((details) => {
      console.log("response: ", details);
      this._snackBar.open("Record Deletion", "Success", { duration: 2000 });
    });
  }

}
