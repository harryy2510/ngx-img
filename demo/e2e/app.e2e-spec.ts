import { NgxImgDemoPage } from './app.po';

describe('ngx-img-demo App', () => {
  let page: NgxImgDemoPage;

  beforeEach(() => {
    page = new NgxImgDemoPage ();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
