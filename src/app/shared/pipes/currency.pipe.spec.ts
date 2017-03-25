import { CurrencyPipe } from './currency.pipe';
import {TestBed, inject} from '@angular/core/testing';
import { MockModule } from '../../../test/mock.module';


const expect = require('chai').expect;

describe('CurrencyPipe', async() => {
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [ MockModule ]
    });
  });


  it('create an instance', inject([CurrencyPipe], (_currencyPipe: CurrencyPipe) => {
  expect(_currencyPipe).to.exist;

  }));



});
