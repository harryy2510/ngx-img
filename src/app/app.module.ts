import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HighlightModule, HIGHLIGHT_OPTIONS} from 'ngx-highlightjs';
import {NgxImgModule} from 'ngx-img';

export function getHighlightLanguages() {
  return {
    typescript: () => import('highlight.js/lib/languages/typescript'),
  };
}

import {AppComponent} from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HighlightModule,
    CommonModule,
    NgxImgModule.forRoot()
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        languages: getHighlightLanguages(),
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
