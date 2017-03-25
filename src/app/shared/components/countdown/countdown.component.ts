import { Component, OnInit, Input, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { Observable, Subscription } from 'rxjs/Rx';
import * as moment from 'moment';
import 'moment-duration-format';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.css']
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input() timeEndsAt = 1609372800000;
  @Input() updateInterval = 1000;

  private _auctionEndTimeTemplate;
  private _duration;
  private countSubscritpion: Subscription;

  public auctionEndTime;
  public isAuctionEnded;

  constructor (
    private cd: ChangeDetectorRef,
    private translateService: TranslateService
  ) {
    this._auctionEndTimeTemplate = this.translateService.instant('layout.auctionFormat');
  }

  ngOnInit() {
    this.registerTimer();
  }

  registerTimer() {
    // check if a valid time
    if (!isNaN(this.timeEndsAt)) {
      this.tick(); //first tick
      this.countSubscritpion = Observable.interval(this.updateInterval).subscribe((x) => {
        this.tick();
      });
    }
  }

  tick() {
    this.countDown((new Date()).getTime());
    this.cd.markForCheck();
  }

  public countDown(fromTime) {
    this._duration = moment.duration(this.timeEndsAt - fromTime);
    this.auctionEndTime = this._duration.format(this._auctionEndTimeTemplate),
    this.isAuctionEnded = (this._duration.asSeconds() <= 0)
  }

  ngOnDestroy() {
    if (this.countSubscritpion) {
      this.countSubscritpion.unsubscribe();
    }
  }
}
