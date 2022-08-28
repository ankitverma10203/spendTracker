import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from '../form/form.component';
import { SpendTrackerDataRetrieverService } from '../service/spend-tracker-data-retriever.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  @Input() public fields: any;
  public records: any = '';
  public dates: any = '';
  public totalAmounts: any = '';
  public hasLoaded: boolean = false;
  public currentOpen: number = -1;
  public panelOpenState: boolean[] = [];

  constructor(private spendTrackerDataRetrieverService: SpendTrackerDataRetrieverService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllData();
  }

  public getAllData(): void {
    this.hasLoaded = false;
    this.getAllDates();
    this.getTrackerData();
    this.getAllTotalAmount();
    if(this.currentOpen != -1) {
      this.panelOpenState[this.currentOpen] = false;
    }
    this.hasLoaded = true;
  }

  private getAllDates(): void {
    this.spendTrackerDataRetrieverService.getAllDates().subscribe((dates) => {
      console.log("AllDates: ", dates);
      this.dates = dates;
      this.panelOpenState = new Array(this.dates.length).fill(false);
    })
  }

  private getTrackerData(): void {
    this.spendTrackerDataRetrieverService.getSpendTrackerData().subscribe((trackerData) => {
      console.log("Tracker Data: ", trackerData);
      this.records = trackerData;
    })
  }

  private getAllTotalAmount(): void {
    this.spendTrackerDataRetrieverService.getAllTotalAmount().subscribe((totalAmounts) => {
      console.log("Total Amounts: ", totalAmounts);
      this.totalAmounts = totalAmounts;
    })
  }

  public openDialog(date: string): void {
    const dialogRef = this.dialog.open(FormComponent, {
      width: '600px',
      data: { heading: "Add Spend Details", fields: this.fields , addToOldDate: true, date: date},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log("dialog results: ", result);
      if (result != undefined) {
        this.getAllData();
      }
    });

  }

}
