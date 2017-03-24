import { BOOKSSTOREPage } from './app.po';

describe('books-store App', () => {
  let page: BOOKSSTOREPage;

  beforeEach(() => {
    page = new BOOKSSTOREPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
