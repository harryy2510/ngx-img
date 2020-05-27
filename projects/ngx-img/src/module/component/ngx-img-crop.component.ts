import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewEncapsulation,
  ElementRef
} from '@angular/core';
import Cropper from 'cropperjs';
import {NgxImgService} from '../service/ngx-img.service';
import {getMimeType} from '../utils';

@Component({
  selector: 'ngx-img-crop',
  templateUrl: './ngx-img-crop.component.html',
  styleUrls: ['./ngx-img-crop.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class NgxImgCropComponent implements OnInit, OnDestroy {
  @Input() config: any = {};
  @Input() imgSrc: any;
  @Output() onCrop: EventEmitter<any> = new EventEmitter();
  @Output() onReset: EventEmitter<any> = new EventEmitter();
  _text = {
    reset: 'Remove'
  };

  _config: any = {
    crop: [
      {
        ratio: null,
        viewMode: 0,
      }
    ]
  };
  timer: any = [];
  cropper: any = [];
  imgData: any = [];

  constructor(private _service: NgxImgService, private _elementRef: ElementRef, private _ref: ChangeDetectorRef) {
  }

  ngOnInit() {
    this._config = Object.assign(this._config, this.config);
    this.cropper = [];
    this.imgData = [];
    this.initializeCrop();
  }

  initializeCrop() {
    setTimeout(() => {
      const mimeType = getMimeType(this.imgSrc);
      this._config.crop.forEach((opt: any, i: number) => {
        const el: any = this._elementRef.nativeElement.querySelector('#ngx-crop-img-' + i);
        const options: any = {};
        if (opt.width) {
          options.width = opt.width;
        }
        if (opt.height) {
          options.height = opt.height;
        }
        if (opt.minWidth) {
          options.minWidth = opt.minWidth;
        }
        if (opt.minHeight) {
          options.minHeight = opt.minHeight;
        }
        if (opt.maxWidth) {
          options.maxWidth = opt.maxWidth;
        }
        if (opt.maxHeight) {
          options.maxHeight = opt.maxHeight;
        }
        if (opt.fillColor) {
          options.fillColor = opt.fillColor;
        }
        this.cropper[i] = new Cropper(el, {
          aspectRatio: opt.ratio,
          viewMode: opt.viewMode || 0,
          autoCropArea: opt.autoCropArea || 0.8,
          crop: () => {
            if (this.timer[i]) {
              clearTimeout(this.timer[i]);
            }
            this.timer[i] = setTimeout(() => {
              this.onCropEvent(i, this.cropper[i].getCroppedCanvas(options).toDataURL(mimeType));
              this.markForCheck();
            }, 500);
          }
        });
        this.markForCheck();
      });
      this.markForCheck();
    }, 100);
  }

  onCropEvent(i: number, data: any) {
    this._service.compress(data, this._config).then((res: any) => {
      this.imgData[i] = res;
      const img = this.imgData.length === 1 ? this.imgData[i] : this.imgData;
      this.onCrop.emit(img);
      this.markForCheck();
    })
    .catch(() => {
      this.imgData[i] = data;
      const img = this.imgData.length === 1 ? this.imgData[i] : this.imgData;
      this.onCrop.emit(img);
      this.markForCheck();
    });
  }

  reset() {
    this.cropper.forEach((el: any) => {
      if (el) {
        el.destroy();
      }
    });
    this.cropper = [];
    this.imgData = [];
    this.imgSrc = '';
    this.onReset.emit();
    this.markForCheck();
  }

  public markForCheck() {
    setTimeout(() => {
      if (!this._ref['destroyed']) {
        this._ref.markForCheck();
        this._ref.detectChanges();
      }
    });
    setTimeout(() => {
      if (!this._ref['destroyed']) {
        this._ref.markForCheck();
        this._ref.detectChanges();
      }
    }, 300);
  }

  ngOnDestroy() {
    this.reset();
    this._ref.detach();
  }
}
