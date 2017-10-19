import { browser, by, element } from 'protractor';

export class SkillSynkAngularPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('app-root h5')).getText();
  }
}
