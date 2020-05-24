import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  imgSrc: any = [];
  activeTab = 4;
  htmlCode1 = `<ngx-img (onSelect)="onSelect($event)" (onReset)="onReset()"></ngx-img>`;
  htmlCode4 = `<ngx-img imgSrc="someBase64String" (onSelect)="onSelect($event)" (onReset)="onReset()"></ngx-img>`;
  htmlCode2 = `<ngx-img (onSelect)="onSelect($event)" (onReset)="onReset()" [config]="{ crop: [ { ratio: 1, autoCropArea: 1 } ] }"></ngx-img>`;
  htmlCode3 = `<ngx-img (onSelect)="onSelect($event)" (onReset)="onReset()" [config]="{ crop: [ { ratio: 1.5 }, { ratio: 1 } ] }"></ngx-img>`;
  optionsHTML = `<ngx-img (onSelect)="onSelect($event)" (onReset)="onReset()" [config]="options"></ngx-img>`;
  options = `{
    imgSrc: '', // base64 encoded image for default preview
    fileSize: 2048, // in Bytes (by default 2048 Bytes = 2 MB)
    minWidth: 0, // minimum width of image that can be uploaded (by default 0, signifies any width)
    maxWidth: 0,  // maximum width of image that can be uploaded (by default 0, signifies any width)
    minHeight: 0,  // minimum height of image that can be uploaded (by default 0, signifies any height)
    maxHeight: 0,  // maximum height of image that can be uploaded (by default 0, signifies any height)
    fileType: ['image/gif', 'image/jpeg', 'image/png'] // mime type of files accepted
    height: 400, // height of cropper
    quality: 0.8, // quality of image after compression
    crop: [  // array of objects for mulitple image crop instances (by default null, signifies no cropping)
      {
        autoCropArea: 0.8, // A number between 0 and 1. Define the automatic cropping area size (percentage).
        ratio: 1, // ratio in which image needed to be cropped (by default null, signifies ratio to be free of any restrictions)
        minWidth: 0, // minimum width of image to be exported (by default 0, signifies any width)
        maxWidth: 0,  // maximum width of image to be exported (by default 0, signifies any width)
        minHeight: 0,  // minimum height of image to be exported (by default 0, signifies any height)
        maxHeight: 0,  // maximum height of image to be exported (by default 0, signifies any height)
        width: 0,  // width of image to be exported (by default 0, signifies any width)
        height: 0,  // height of image to be exported (by default 0, signifies any height)
      }
    ]
  }`;

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home');
  }

  onSelect($event: any) {
    this.imgSrc = [];
    switch (typeof($event)) {
      case 'string':
        this.imgSrc = [$event];
        break;
      case 'object':
        this.imgSrc = $event;
        break;
      default:
    }
  }

  changeTab(i: number) {
    this.imgSrc = [];
    this.activeTab = i;
  }

  reset() {
    this.imgSrc = [];
  }

}
