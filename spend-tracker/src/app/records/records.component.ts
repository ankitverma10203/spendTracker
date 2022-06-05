import { Component, Input, OnInit } from '@angular/core';
import { SpendTrackerDataRetrieverService } from '../service/spend-tracker-data-retriever.service';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  @Input() public fields: any;
  records: any = '';
  dates: any = '';
  totalAmounts: any = '';

  constructor(private spendTrackerDataRetrieverService: SpendTrackerDataRetrieverService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  getAllData() {
    this.getTrackerData();
    this.getAllDates();
    this.getAllTotalAmount();
  }

  getAllDates() {
    this.spendTrackerDataRetrieverService.getAllDates().subscribe((details) => {
      console.log(details);
      this.dates = details;
    })
  }

  getTrackerData() {
    this.spendTrackerDataRetrieverService.getSpendTrackerData().subscribe((details) => {
      console.log(details);
      this.records = details;
    })
  }

  getAllTotalAmount() {
    this.spendTrackerDataRetrieverService.getAllTotalAmount().subscribe((details) => {
      console.log(details);
      this.totalAmounts = details;
    })
  }

}
