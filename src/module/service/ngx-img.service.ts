import {Injectable} from '@angular/core';

@Injectable()
export class NgxImgService {
  compress(src: string, config: any, mime_type?: string) {
    mime_type = mime_type ? mime_type : src.substring("data:image/".length, src.indexOf(";base64"));
    return new Promise((resolve: any, reject: any) => {
      const img = new Image();
      img.src = src;
      img.onerror = () => {
        reject();
      };
      img.onload = () => {
        const cvs = document.createElement('canvas');
        const ctx = cvs.getContext('2d');
        const aspectRatio = img.naturalWidth / img.naturalHeight;

        let maxWidth = config.maxWidth ? config.maxWidth : Infinity;
        let maxHeight = config.maxHeight ? config.maxHeight : Infinity;
        let minWidth = config.minWidth ? config.minWidth : 0;
        let minHeight = config.minHeight ? config.minHeight : 0;

        let width = img.naturalWidth;
        let height = img.naturalHeight;

        if (maxWidth < Infinity && maxHeight < Infinity) {
          if (maxHeight * aspectRatio > maxWidth) {
            maxHeight = maxWidth / aspectRatio;
          } else {
            maxWidth = maxHeight * aspectRatio;
          }
        } else if (maxWidth < Infinity) {
          maxHeight = maxWidth / aspectRatio;
        } else if (maxHeight < Infinity) {
          maxWidth = maxHeight * aspectRatio;
        }

        if (minWidth > 0 && minHeight > 0) {
          if (minHeight * aspectRatio > minWidth) {
            minHeight = minWidth / aspectRatio;
          } else {
            minWidth = minHeight * aspectRatio;
          }
        } else if (minWidth > 0) {
          minHeight = minWidth / aspectRatio;
        } else if (minHeight > 0) {
          minWidth = minHeight * aspectRatio;
        }

        width = Math.min(Math.max(width, minWidth), maxWidth);
        height = Math.min(Math.max(height, minHeight), maxHeight);

        const destX = -width / 2;
        const destY = -height / 2;
        const destWidth = width;
        const destHeight = height;

        cvs.width = width;
        cvs.height = height;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(1, 1);
        ctx.drawImage(
          img,
          Math.floor(destX),
          Math.floor(destY),
          Math.floor(destWidth),
          Math.floor(destHeight),
        );
        ctx.restore();
        resolve(cvs.toDataURL(mime_type, config.quality));
      };
    });
  }
}
