<p align="center">
  <img height="256px" width="256px" style="text-align: center;" src="https://cdn.rawgit.com/harryy2510/ngx-img/master/demo/src/assets/logo.svg">
</p>

# ngx-img - Angular Image Upload &amp; Crop

[![npm version](https://badge.fury.io/js/ngx-img.svg)](https://badge.fury.io/js/ngx-img)
[![Build Status](https://travis-ci.org/harryy2510/ngx-img.svg?branch=master)](https://travis-ci.org/harryy2510/ngx-img)
[![Coverage Status](https://coveralls.io/repos/github/harryy2510/ngx-img/badge.svg?branch=master)](https://coveralls.io/github/harryy2510/ngx-img?branch=master)
[![dependency Status](https://david-dm.org/harryy2510/ngx-img/status.svg)](https://david-dm.org/harryy2510/ngx-img)
[![devDependency Status](https://david-dm.org/harryy2510/ngx-img/dev-status.svg?branch=master)](https://david-dm.org/harryy2510/ngx-img#info=devDependencies)

## Demo

View in action at https://harryy2510.github.io/ngx-img

## Dependencies
* [Angular](https://angular.io) (*requires* Angular 4 or higher, tested with 4.4.6)

## Installation
Install above dependencies via *npm*. 

Now install `ngx-img` via:
```shell
npm install --save ngx-img
```

---
##### SystemJS
>**Note**:If you are using `SystemJS`, you should adjust your configuration to point to the UMD bundle.
In your systemjs config file, `map` needs to tell the System loader where to look for `ngx-img`:
```js
map: {
  'ngx-img': 'node_modules/ngx-img/bundles/ngx-img.umd.js',
}
```
---

Once installed you need to import the main module:
```js
import { NgxImgModule } from 'ngx-img';
```
The only remaining part is to list the imported module in your application module. The exact method will be slightly
different for the root (top-level) module for which you should end up with the code similar to (notice ` NgxImgModule .forRoot()`):
```js
import { NgxImgModule } from 'ngx-img';

@NgModule({
  declarations: [AppComponent, ...],
  imports: [NgxImgModule.forRoot(), ...],  
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

Other modules in your application can simply import ` NgxImgModule `:

```js
import { NgxImgModule } from 'ngx-img';

@NgModule({
  declarations: [OtherComponent, ...],
  imports: [NgxImgModule, ...], 
})
export class OtherModule {
}
```

## Usage



## License

Copyright (c) 2017 Hariom Sharma. Licensed under the MIT License (MIT)

