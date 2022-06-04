import { Component, OnInit } from '@angular/core';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/field-type';

@Component({
  selector: 'app-content-container',
  templateUrl: './content-container.component.html',
  styleUrls: ['./content-container.component.css']
})
export class ContentContainerComponent implements OnInit {

  heading: string = "Heading";

  public fields: FieldInfo[] = [
    {
      name: "Category",
      type: FieldType.dropDown,
      defaultValue: "Education",
      options: ["Education", "Food", "Electronics", "Others"]
    },
    {
      name: "Message",
      type: FieldType.text,
      defaultValue: "",
      options: []
    },
    {
      name: "Amount",
      type: FieldType.number,
      defaultValue: "",
      options: []
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
