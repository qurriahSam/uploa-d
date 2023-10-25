import { Component, OnDestroy } from '@angular/core';
import {
  AngularFireStorage,
  AngularFireStorageReference,
  AngularFireUploadTask,
} from '@angular/fire/compat/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, finalize, map } from 'rxjs';

import { ImageFile } from 'src/app/model/image-file';
import { WarnComponent } from '../warn/warn.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent {
  file: ImageFile | undefined;
  ref!: AngularFireStorageReference;
  upTask!: AngularFireUploadTask;
  uploadProgress!: Observable<number | undefined>;
  downloadURL!: Observable<any>;
  val!: number | undefined;
  copyBtnTxt = 'Copy Link';
  display = 'block';

  constructor(
    private _fireStorage: AngularFireStorage,
    private _snackBar: MatSnackBar
  ) {}

  onDropFile(file: ImageFile): void {
    this.file = file;
    this.fileUpload();
  }

  onFileSelected(e: any): void {
    const file = e.target.files[0];
    if (file) {
      this.file = {
        file: file,
        url: window.URL.createObjectURL(file),
      };
      this.fileUpload();
    }
  }

  private fileUpload() {
    console.log(this.fileValidation(this.file?.file));

    if (this.fileValidation(this.file?.file)) {
      const randomId = Math.random().toString(36).substring(2);

      this.ref = this._fireStorage.ref('/images/' + randomId);
      this.upTask = this.ref.put(this.file?.file);
      this.uploadProgress = this.upTask.percentageChanges();
      this.uploadProgress.subscribe((v) => (this.val = v));

      this.upTask
        .snapshotChanges()
        .pipe(finalize(() => (this.downloadURL = this.ref.getDownloadURL())))
        .subscribe();
      setTimeout(() => {
        this.display = 'block';
      }, 5000);
    } else {
      this.file = undefined;
    }
  }

  async copyToClipboard(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      this.copyBtnTxt = 'Copied';
      setTimeout(() => {
        this.copyBtnTxt = 'Copy Link';
      }, 2000);
    } catch (error) {
      console.error('Failed to copy: ', error);
    }
  }

  back() {
    this.file = undefined;
    this.val = undefined;
    this.display = 'none';
  }

  private fileValidation(filePath: any) {
    let allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

    console.log(filePath);

    if (!allowedExtensions.exec(filePath.name)) {
      this.warnSnackBar();
      return false;
    }
    return true;
  }

  private warnSnackBar() {
    this._snackBar.openFromComponent(WarnComponent, {
      verticalPosition: 'top',
      duration: 5000,
    });
  }
}
