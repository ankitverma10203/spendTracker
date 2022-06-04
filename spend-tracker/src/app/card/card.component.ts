import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { FieldType } from '../model/field-type';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() public heading: string = "";
  @Input() public fields: any = null;

  constructor() { }

  ngOnInit(): void {
  }

}
