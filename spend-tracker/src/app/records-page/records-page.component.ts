import { Component, OnInit } from '@angular/core';
import { FieldInfo } from '../model/field-info.model';
import { FieldType } from '../model/field-type';

@Component({
  selector: 'app-records-page',
  templateUrl: './records-page.component.html',
  styleUrls: ['./records-page.component.css']
})
export class RecordsPageComponent implements OnInit {
  public heading: string = "Spends";

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
