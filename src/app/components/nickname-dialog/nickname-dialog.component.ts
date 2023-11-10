import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'app-nickname-dialog',
  templateUrl: './nickname-dialog.component.html',
  styleUrls: ['./nickname-dialog.component.css'],
})
export class NicknameDialogComponent {
  nickname: string = '';
  team: 'X' | 'O';

  constructor(
    public dialogRef: MatDialogRef<NicknameDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data: { teamName: 'X' | 'O' }
  ) {
    this.team = data.teamName;
  }

  onSubmit(): void {
    if (this.nickname.trim() !== '') {
      this.dialogRef.close(this.nickname);
    }
  }
}
