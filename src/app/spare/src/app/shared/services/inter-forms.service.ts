import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Logger} from 'angular2-logger/core';

/*
 This service is through application to start and stop spinner , trigger login action and set log level
*/
@Injectable()
export class InterFormsService {
  public spinnerEmitter: Subject<any>;
  public loginActionEmitter: Subject<any>;
  public availableDataSources: Array<any>;

  /*
  Logger levels :
  this._logger.error('This is a priority level 1 error message...');
 		this._logger.warn('This is a priority level 2 warning message...');
 		this._logger.info('This is a priority level 3 warning message...');
 		this._logger.debug('This is a priority level 4 debug message...');
 		this._logger.log('This is a priority level 5 log message...');
  */
  constructor(public _logger: Logger) {
    this.spinnerEmitter = new Subject();
    this.loginActionEmitter = new Subject();
    // set default log level to ERROR
    this._logger.level = this._logger.Level.ERROR;
  }

  public startSpinner(scope?: string, text?: string) {
    const spinner = {
      isSpinnerRunning: true,
      spinnerText: text,
      spinnerScope: scope
    };
    this.spinnerEmitter.next(spinner);
  }

  public stopSpinner() {
    const spinner = {
      isSpinnerRunning: false
    };
    this.spinnerEmitter.next(spinner);
  }

  public runLoginAction(action: any) {
    this.loginActionEmitter.next(action);
  }

}
