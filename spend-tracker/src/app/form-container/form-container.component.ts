import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { FieldInfo } from '../model/field-info.model';
import { FormData } from '../model/form-data.model';
import { FormDataDTO } from '../model/tracker-info-dto.model';

@Component({
  selector: 'app-form-container',
  templateUrl: './form-container.component.html',
  styleUrls: ['./form-container.component.css']
})
export class FormContainerComponent implements OnInit {

  @Input() public data: FormData = new FormData();
  @Input() public fields: FieldInfo[] = [];
  @Output() public formInputEmitter = new EventEmitter<FormDataDTO>();

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  onSubmitClick(form: FormDataDTO) {
    this.formInputEmitter.emit(form);
  }

}
