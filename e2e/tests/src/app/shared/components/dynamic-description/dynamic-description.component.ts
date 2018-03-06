import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dynamic-description',
  templateUrl: './dynamic-description.component.html',
  styleUrls: ['./dynamic-description.component.scss']
})
export class DynamicDescriptionComponent implements OnInit {

  @Input() code: string;
  @Input() collection: Array<any>;
  description: string;

  constructor() {}

  ngOnInit() {
    const self = this;
    const foundedItem = self.collection.find(item => item.code === self.code);
    self.description = foundedItem ? foundedItem.description : '';
  }

}
