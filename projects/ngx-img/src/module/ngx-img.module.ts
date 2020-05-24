import {CommonModule} from '@angular/common';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {NgxImgComponent} from './component/ngx-img.component';
import {NgxImgCropComponent} from './component/ngx-img-crop.component';
import {NgxImgService} from './service/ngx-img.service';

// Export module's public API
export {NgxImgComponent} from './component/ngx-img.component';
export {NgxImgCropComponent} from './component/ngx-img-crop.component';
export {NgxImgService} from './service/ngx-img.service';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [NgxImgComponent, NgxImgCropComponent],
  declarations: [NgxImgComponent, NgxImgCropComponent],
  providers: [NgxImgService]
})
export class NgxImgModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: NgxImgModule,
      providers: [NgxImgService]
    };
  }
}
