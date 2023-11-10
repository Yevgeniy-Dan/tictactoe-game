import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectIsStatemate } from './store';
import { EMPTY, NEVER, Observable, switchMap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { NicknameDialogComponent } from './components/nickname-dialog/nickname-dialog.component';
import { setPlayerNames } from './store/actions/game.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isStatemate$: Observable<boolean> = this.store.select(selectIsStatemate);

  xNickname: string = '';

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    const dialogRef = this.dialog.open(NicknameDialogComponent, {
      data: { teamName: 'X' },
      width: '400px',
      disableClose: true,
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((xNickname: string) => {
          this.xNickname = xNickname;
          return this.openSecondDialog();
        })
      )
      .subscribe((oNickname) => {
        console.log('The second dialog was closed', oNickname);
        this.store.dispatch(
          setPlayerNames({
            names: {
              X: this.xNickname,
              O: oNickname,
            },
          })
        );
      });
  }

  openSecondDialog(): Observable<any> {
    const secondDialogRef = this.dialog.open(NicknameDialogComponent, {
      data: { teamName: 'O' },
      width: '400px',
      disableClose: true,
    });

    return secondDialogRef.afterClosed();
  }
}
