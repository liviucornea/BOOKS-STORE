import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-container-card',
  templateUrl: './container-card.component.html',
  styleUrls: ['./container-card.component.scss']
})
export class ContainerCardComponent implements OnInit {
   @Input() cardTitle: String;

  constructor() { }

  ngOnInit() {}

}
