import { Component, Input, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void { }

}
