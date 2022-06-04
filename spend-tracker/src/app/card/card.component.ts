import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public heading : String | undefined;

  public fields : String[] = ["Category", "Name", "Amount"];

  constructor() { }

  ngOnInit(): void {
  }

}
