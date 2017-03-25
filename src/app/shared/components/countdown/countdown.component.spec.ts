import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CountdownComponent } from './countdown.component';
import { MockModule } from '../../../../test/mock.module';
import { TranslateService } from 'ng2-translate';
import { Observable } from 'rxjs/Rx';
import * as sinon from 'sinon';

let expect = require('chai').expect;

const seconds = 1000;
const minutes = seconds * 60;
const hours = minutes * 60;
const days = hours * 24;

const startTime = (new Date()).getTime();
const updateInterval = hours * 1;

const generateEndTime = (duration) => {
  return startTime + duration;
}


//let translateService = sinon.stub("dd[d] hh[h] mm[m] ss[s]", "instant");

describe('CountdownComponent', () => {
  let component: CountdownComponent;
  let fixture: ComponentFixture<CountdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CountdownComponent],
      imports: [
        MockModule
      ],
      /*
      providers: [
        {
          provide: TranslateService,
          useValue: {
            instant(key): any {
              return "dd[d] hh[h] mm[m] ss[s]";
            },
            get(key): Observable<any> {
              return Observable.of(key);
            }
          }
        },
      ]
      */
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountdownComponent);
    component = fixture.componentInstance;
    component.updateInterval = updateInterval;

    //hack hack hack. Need to figure out a way to inject the TranslateService
    component['_auctionEndTimeTemplate'] = "dd[d] hh[h] mm[m] ss[s]";
  });

  it('should create', () => {
    expect(component).to.exist;
  });

  it('should end the auction', () => {
    component.timeEndsAt = generateEndTime(seconds * -1);
    fixture.detectChanges();

    component.countDown(startTime);
    expect(component.isAuctionEnded).to.true;
  });

  it('should display seconds only', () => {
    component.timeEndsAt = generateEndTime(seconds * 59);
    fixture.detectChanges();

    component.countDown(startTime);
    expect(component.isAuctionEnded).to.false;
    expect(component.auctionEndTime).to.equal("59s");
  });
    it('should display seconds and minutes', () => {
      component.timeEndsAt = generateEndTime((minutes * 4) + (seconds * 59));
      fixture.detectChanges();

      component.countDown(startTime);  
      expect(component.isAuctionEnded).to.false;
      expect(component.auctionEndTime).to.equal("04m 59s");
    });
  
    it('should display seconds and hours (no minutes)', () => {
      fixture.componentInstance.timeEndsAt = generateEndTime((hours * 2) + (seconds * 59));
      fixture.detectChanges();

      component.countDown(startTime);
      expect(component.isAuctionEnded).to.false;
      expect(component.auctionEndTime).to.equal("02h 00m 59s");
    });
});
