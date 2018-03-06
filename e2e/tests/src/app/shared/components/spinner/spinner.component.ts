import {Component, Input, OnDestroy} from '@angular/core';
import {InterFormsService} from '../../services/inter-forms.service';
// import {Subscription} from 'rxjs/Subscription';
// import {Observable} from 'rxjs/Observable';
import {Observable, Subscription} from 'rxjs/Rx';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnDestroy {

  protected currentTimeout: Subscription;
  public isDelayedRunning = false;
  spinnerSubscription: Subscription;
  spinnerText = 'Loading contents...';
  spinnerScope = 'page';

  @Input() public delay = 300;
  public scope = 'card';
  public text = '';

  constructor(private interForm: InterFormsService) {
    this.spinnerSubscription = this.interForm.spinnerEmitter.subscribe((value) => {
      this.isDelayedRunning = value.isSpinnerRunning;
      this.spinnerText = value.spinnerText;
      this.spinnerScope = value.spinnerScope;
    });
  }

  private set isRunning(value: boolean) {
    if (!value) {
      this.cancelTimeout();
      this.isDelayedRunning = false;
    }
    if (this.currentTimeout) {
      return;
    }
    const timer = Observable.timer(5, this.delay);
    const self = this;
    this.currentTimeout = timer.subscribe(t => {
      self.isDelayedRunning = value;
      self.cancelTimeout();
    })

  }


  private cancelTimeout(): void {
    if (this.currentTimeout) {
      this.currentTimeout.unsubscribe();
    }
    this.currentTimeout = undefined;
  }

  ngOnDestroy(): any {
    if (this.spinnerSubscription) {
      this.spinnerSubscription.unsubscribe();
    }
    this.cancelTimeout();
  }

}
