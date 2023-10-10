import { Component } from '@angular/core';
import { ImageFile } from 'src/app/model/image-file';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  file: ImageFile | undefined;

  onDropFile(file: ImageFile): void {
    this.file = file;
  }
}
