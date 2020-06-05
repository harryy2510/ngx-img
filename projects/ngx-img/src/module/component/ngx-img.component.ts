import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input, OnChanges,
  OnDestroy,
  OnInit,
  Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {NgxImgService} from '../service/ngx-img.service';

@Component({
  selector: 'ngx-img',
  templateUrl: './ngx-img.component.html',
  styleUrls: ['./ngx-img.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxImgComponent implements OnInit, OnDestroy, OnChanges {
  @Input() alt = '';
  @Input() fileName = '';
  @Input() imgSrc = '';
  @Input() remove = true;
  @ViewChild('fileInput') fileInput: any;
  @Input() config: {
    fileSize?: number,
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number,
    fileType?: string[],
    height?: number,
    quality?: number,
    crop?: any,
    output?: 'base64' | 'blob'
  };
  @Input() errorTexts: {
    fileSize?: string,
    minWidth?: string,
    maxWidth?: string,
    minHeight?: string,
    maxHeight?: string,
    imageFormat?: string,
    fileType?: string
  };
  @Input() text: {
    default?: string,
    _default?: string,
    button?: string,
    try_again?: string,
    replace?: string,
    reset?: string,
    error?: string
  };

  hasPreview = false;
  hasError = false;
  isLoading = false;
  _config: {
    fileSize?: number,
    minWidth?: number,
    maxWidth?: number,
    minHeight?: number,
    maxHeight?: number,
    fileType?: string[],
    height?: number,
    quality?: number,
    crop?: any,
    output?: 'blob' | 'base64'
  } = {
    fileSize: 2048,
    minWidth: 0,
    maxWidth: 0,
    minHeight: 0,
    maxHeight: 0,
    fileType: ['.gif', '.jpeg', '.png', '.jpg'],
    quality: 0.8,
    output: 'base64'
  };
  _text: {
    default?: string,
    _default?: string,
    button?: string,
    try_again?: string,
    replace?: string,
    reset?: string,
    error?: string
  } = {
    default: 'Drag and drop',
    _default: 'Drag and drop or click',
    button: 'Choose File',
    try_again: 'Try Again',
    replace: 'Drag and drop or click to replace',
    reset: 'Remove',
    error: 'Oops, something wrong happened.'
  };
  _errorTexts: {
    fileSize?: string,
    minWidth?: string,
    maxWidth?: string,
    minHeight?: string,
    maxHeight?: string,
    imageFormat?: string,
    fileType?: string
  } = {
    fileSize: 'The file size is too big ({{ value }} max).',
    minWidth: 'The image width is too small ({{ value }}}px min).',
    maxWidth: 'The image width is too big ({{ value }}}px max).',
    minHeight: 'The image height is too small ({{ value }}}px min).',
    maxHeight: 'The image height is too big ({{ value }}}px max).',
    imageFormat: 'The image format is not allowed ({{ value }} only).',
    fileType: 'The file type is not allowed.'
  };
  errors: any = [];
  file: any;
  mode = 'upload';
  @Output() onChange: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onReset: EventEmitter<any> = new EventEmitter();

  constructor(private _service: NgxImgService, private _ref: ChangeDetectorRef) {
    this.reset();
  }

  ngOnInit() {
    this._text = Object.assign(this._text, this.text);
    this._errorTexts = Object.assign(this._errorTexts, this.errorTexts);
    this._config = Object.assign(this._config, this.config);
    this.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.imgSrc && changes.imgSrc.isFirstChange()) {
      if (this.imgSrc) {
        this.hasPreview = true;
        if (this.config && this.config.crop) {
          this.mode = 'crop';
        }
        this.markForCheck();
      }
    }
  }

  fileChangeListener(e: any) {
    this.hasError = false;
    this.errors = [];
    if (!e.target.files.length) {
      this.reset();
      return false;
    }

    this.file = e.target.files[0];
    if (!this.validate()) {
      this.hasError = true;
      this.reset();
      return false;
    }

    this.fileName = this.file.name;
    this.onChange.emit(this.file);

    if (this.file.type.split('/')[0] === 'image') {
      this.isLoading = true;
      const reader: FileReader = new FileReader();
      reader.onloadend = (ev: any) => {
        this.imgSrc = ev.target.result;
        this.fileName = this.file.name;
        this.hasPreview = true;
        this.isLoading = false;
        if (this._config.crop) {
          this.mode = 'crop';
          this.markForCheck();
        } else {
          this._service.compress(this.imgSrc, this._config).then((res: any) => {
            this.onSelectEvent(res);
            this.markForCheck();
          })
            .catch(() => {
              this.onSelectEvent(this.imgSrc);
              this.markForCheck();
            });
        }
      };
      reader.readAsDataURL(this.file);
      this.markForCheck();
    }
    this.markForCheck();
  }

  reset() {
    this.mode = 'upload';
    this.file = null;
    this.imgSrc = '';
    this.fileName = '';
    this.hasPreview = false;
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
    this.onReset.emit();
    this.markForCheck();
  }

  validate() {
    this.errors = [];
    if (this._config.fileType.length !== 0 &&
      this._config.fileType.indexOf(this.file.type) === -1 && this._config.fileType.indexOf(`.${this.file.name.split('.').pop()}`) === -1) {
      this.errors = [...this.errors, this._errorTexts.fileType];
    }

    if (this._config.fileSize !== 0 && (this.file.size / 1024) > this._config.fileSize) {
      this.errors = [...this.errors, this._errorTexts.fileSize.replace('{{ value }}', this.sizeToByte(this._config.fileSize))];
    }

    if (this._config.minWidth !== 0 && this._config.minWidth >= this.file.width) {
      this.errors = [...this.errors, this._errorTexts.minWidth.replace('{{ value }}', this._config.minWidth.toString())];
    }

    if (this._config.maxWidth !== 0 && this._config.maxWidth <= this.file.width) {
      this.errors = [...this.errors, this._errorTexts.maxWidth.replace('{{ value }}', this._config.maxWidth.toString())];
    }

    if (this._config.minHeight !== 0 && this._config.minHeight >= this.file.height) {
      this.errors = [...this.errors, this._errorTexts.minHeight.replace('{{ value }}', this._config.minHeight.toString())];
    }

    if (this._config.maxHeight !== 0 && this._config.maxHeight <= this.file.height) {
      this.errors = [...this.errors, this._errorTexts.maxHeight.replace('{{ value }}', this._config.maxHeight.toString())];
    }

    return !this.errors.length;
  }

  sizeToByte(size: number): string {
    const units = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let i = 0;
    while (size >= 1024) {
      size /= 1024;
      ++i;
    }
    return size.toFixed(1) + ' ' + units[i];
  };

  onSelectEvent(data: any) {
    this.onSelect.emit(data);
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
