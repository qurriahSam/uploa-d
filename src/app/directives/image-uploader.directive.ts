import {
  Directive,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { ImageFile } from '../model/image-file';

enum DropColor {
  Default = '#C6E4F1', // Default color
  Over = '#ACADAD', // Color to be used once the file is "over" the drop box
}

@Directive({
  selector: '[appImageUploader]',
})
export class ImageUploaderDirective {
  @Output() dropFile: EventEmitter<ImageFile> = new EventEmitter();
  @HostBinding('style.background') backgroundColor = DropColor.Default;

  @HostListener('dragover', ['$event']) public dragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Over;
  }

  @HostListener('dragleave', ['$event']) public dragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.backgroundColor = DropColor.Default;
  }

  @HostListener('drop', ['$event']) public drop(e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();
    this.backgroundColor = DropColor.Default;

    let fileList = e.dataTransfer?.files[0];
    let imgFile: ImageFile = {
      file: undefined,
      url: '',
    };

    if (fileList != undefined) {
      imgFile.file = fileList;
      imgFile.url = window.URL.createObjectURL(imgFile.file);
    }

    if (imgFile.file != undefined) {
      this.dropFile.emit(imgFile);
    }
  }

  constructor() {}
}
