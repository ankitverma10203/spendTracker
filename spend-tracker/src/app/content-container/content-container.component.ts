import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.css']
})
export class ContentContainerComponent implements OnInit {

  heading: String = "Heading";

  constructor() { }

  ngOnInit(): void {
  }

}
