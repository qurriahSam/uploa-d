import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { ImageFile } from '../model/image-file';

@Directive({
  selector: '[appImageUploader]',
})
export class ImageUploaderDirective {
  @Output() dropFiles: EventEmitter<ImageFile> = new EventEmitter();
  @HostBinding('style.background') backgroundColor;

  constructor() {}
}
