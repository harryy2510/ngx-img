import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxImgModule } from 'ngx-img';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [
    CommonModule,
    NgxImgModule.forRoot(),
    HomeRoutingModule,
  ],
  declarations: [HomeComponent],
})
export class HomeModule {
}
