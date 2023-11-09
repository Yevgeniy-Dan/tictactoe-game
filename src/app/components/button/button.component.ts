import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store';
import {
  clearGameBoard,
  resetGameState,
} from 'src/app/store/actions/game.actions';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  constructor(private store: Store<AppState>) {}

  clearGameBoard(): void {
    this.store.dispatch(clearGameBoard({ clearGameBoard: true }));
  }

  resetGame(): void {
    this.store.dispatch(resetGameState());
  }
}
