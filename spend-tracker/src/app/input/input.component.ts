import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  @Input() public field: string = "";

  options: string[] = ["Education", "Food", "Electronics", "Others"];

  dropDownFields: string[] = ["Category"];

  constructor() { }

  ngOnInit(): void {
  }

  isDropdown(field: string): boolean {
    return this.dropDownFields.includes(field)
  }

}
