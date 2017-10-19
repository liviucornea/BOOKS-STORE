import { SkillSynkAngularPage } from './app.po';

describe('skill-synk-angular App', () => {
  let page: SkillSynkAngularPage;

  beforeEach(() => {
    page = new SkillSynkAngularPage();
  });

  it('should display welcome message', done => {
    page.navigateTo();
    page.getParagraphText()
      .then(msg => expect(msg).toEqual('Welcome to Skill Sync App'))
      .then(done, done.fail);
  });
});
