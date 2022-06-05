import { Component, OnInit } from '@angular/core';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/field-type';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.css']
})
export class ContentContainerComponent implements OnInit {

  heading: string = "Add Spend Details";

  public fields: FieldInfo[] = [
    {
      name: "Category",
      type: FieldType.dropDown,
      defaultValue: "",
      options: ["Education", "Food", "Electronics", "Others"],
      isRequired: true
    },
    {
      name: "Message",
      type: FieldType.text,
      defaultValue: "",
      options: [],
      isRequired: true
    },
    {
      name: "Amount",
      type: FieldType.number,
      defaultValue: "",
      options: [],
      isRequired: true
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
