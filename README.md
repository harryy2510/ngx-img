<p align="center">
  <h1 align="center">Ngx Img</h1>
  <p align="center">
    <strong>Angular image upload component with cropping, compression, and validation.</strong>
  </p>
  <p align="center">
    <code>drag & drop</code> · <code>multi-crop</code> · <code>base64 or blob output</code> · <code>Angular 4-7</code>
  </p>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/@harryy/ngx-img"><img src="https://img.shields.io/npm/v/@harryy/ngx-img.svg?style=flat-square" alt="npm"></a>
  <a href="https://angular.io"><img src="https://img.shields.io/badge/Angular-4%E2%80%937-DD0031?style=flat-square&logo=angular&logoColor=white" alt="Angular"></a>
  <a href="https://www.typescriptlang.org"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript"></a>
</p>

---

> **Note:** This project is no longer actively maintained. It works with Angular 4 through 7. For newer Angular versions, consider alternatives.

---

## Install

```bash
npm install @harryy/ngx-img --save
```

## Setup

```typescript
import { NgxImgModule } from '@harryy/ngx-img'

@NgModule({
  imports: [NgxImgModule]
})
export class AppModule {}
```

---

## Usage

### Basic upload

```html
<ngx-img (onSelect)="onImageSelected($event)"></ngx-img>
```

### With cropping

```html
<ngx-img
  [config]="{
    fileSize: 2048,
    fileType: ['.png', '.jpg', '.jpeg'],
    quality: 0.8,
    crop: [{ ratio: 1, viewMode: 1 }]
  }"
  (onSelect)="onCropped($event)"
  (onReset)="onRemoved()">
</ngx-img>
```

### With validation

```html
<ngx-img
  [config]="{
    fileSize: 1024,
    minWidth: 200,
    minHeight: 200,
    maxWidth: 2000,
    maxHeight: 2000
  }"
  [errorTexts]="{
    fileSize: 'File must be under {value}KB',
    minWidth: 'Minimum width is {value}px'
  }"
  (onSelect)="handleImage($event)">
</ngx-img>
```

---

## API

### Inputs

| Property | Type | Default | Description |
|---|---|---|---|
| `config` | `object` | see below | Upload and compression config |
| `imgSrc` | `string` | `''` | Initial image source |
| `alt` | `string` | `''` | Alt text |
| `fileName` | `string` | `''` | Display file name |
| `remove` | `boolean` | `true` | Show remove button |
| `errorTexts` | `object` | built-in | Custom validation error messages |
| `text` | `object` | built-in | Custom UI labels |

### Config

```
  PROPERTY       TYPE        DEFAULT                        DESCRIPTION
  --------       ----        -------                        -----------
  fileSize       number      2048                           Max file size (KB)
  minWidth       number      0                              Min image width (px)
  maxWidth       number      0                              Max image width (px)
  minHeight      number      0                              Min image height (px)
  maxHeight      number      0                              Max image height (px)
  fileType       string[]    ['.gif','.jpeg','.png','.jpg'] Allowed file types
  quality        number      0.8                            Compression (0-1)
  output         string      'base64'                       'base64' or 'blob'
  crop           array       --                             Crop configs (enables crop mode)
```

### Crop Config

Each item in the `crop` array:

```
  PROPERTY        TYPE      DESCRIPTION
  --------        ----      -----------
  ratio           number    Aspect ratio constraint
  viewMode        0-3       Cropper view mode
  autoCropArea    0-1       Initial crop area (default 0.8)
  width/height    number    Output canvas dimensions
  fillColor       string    Background fill color
```

### Outputs

| Event | Description |
|---|---|
| `(onChange)` | Fires on file selection (raw File object) |
| `(onSelect)` | Fires after processing (base64 or blob) |
| `(onReset)` | Fires when image is removed |

---

## Features

- Drag-and-drop file upload
- Client-side image compression with quality control
- Multi-crop support (multiple aspect ratios from one image)
- Real-time dimension and size validation
- Customizable error messages with value interpolation (`{value}`)
- Works with Angular 4, 5, 6, and 7

---

## License

MIT
