import { Component, inject } from '@angular/core';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-warn',
  templateUrl: './warn.component.html',
  styleUrls: ['./warn.component.scss'],
})
export class WarnComponent {
  warnBarRef = inject(MatSnackBarRef);
}
