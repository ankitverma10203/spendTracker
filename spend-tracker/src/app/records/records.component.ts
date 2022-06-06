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
  hasLoaded: boolean = false;

  panelOpenState: boolean[] = [];

  constructor(private spendTrackerDataRetrieverService: SpendTrackerDataRetrieverService) { }

  ngOnInit(): void {
    this.getAllData();
  }

  async getAllData() {
    this.hasLoaded = false;
    await this.delay(5000);
    this.getAllDates();
    this.getTrackerData();
    this.getAllTotalAmount();
    this.hasLoaded = true;
  }

  getAllDates() {
    this.spendTrackerDataRetrieverService.getAllDates().subscribe((details) => {
      console.log(details);
      this.dates = details;
      this.panelOpenState = new Array(this.dates.length).fill(false);
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}

}
