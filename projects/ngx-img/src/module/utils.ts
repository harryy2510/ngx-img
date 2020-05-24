export const getMimeType = (src?: string) => src ? src.substring('data:'.length, src.indexOf(';base64')) : '';
