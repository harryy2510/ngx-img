import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  imgSrc: any = [];

  constructor(private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Home | ngx-img');
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

  reset() {
    this.imgSrc = [];
  }

}
