import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {
  constructor(private _translate: TranslateService) { }

  transform(value: any, args?: any): any {
    const lang = this._translate.currentLang;

    if (value && !isNaN(value) && value > 0) {
      let result;
      if (lang === 'en') {
        result = '$' + parseFloat(value).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1,');
      }
      // TODO add other currency format
      return result;
    }
    return 'N/A';
  }


}
