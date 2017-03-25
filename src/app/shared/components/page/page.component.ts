import { Component, OnInit, OnChanges, HostBinding, Input, trigger, state, style, animate, transition } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: 'page.component.html',
  styleUrls: ['page.component.css'],
  host: {'[style.display]': '"block"'},
  animations: [
    trigger('routeAnimation', [
      state('*', style({ opacity: 1 })),
      transition('void => *', [
        style({  opacity: 0 }),
        animate(400)
      ]),
      transition('* => void', animate(300, style({ transform: 'translateX(-100%)', opacity: 0 })))
    ])
  ]
})
export class PageComponent implements OnInit {
  @HostBinding('@routeAnimation') routeAnimation = true;

  constructor() { }

  ngOnInit() {
  }

}
