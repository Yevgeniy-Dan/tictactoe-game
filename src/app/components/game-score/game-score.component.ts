import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState, selectGameScore, selectPlayerNames } from 'src/app/store';
import { PlayerNames, PlayersScore } from 'src/app/types/game-board';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css'],
})
export class GameScoreComponent {
  gameScore$: Observable<PlayersScore> = this.store.select(selectGameScore);
  playersName$: Observable<PlayerNames> = this.store.select(selectPlayerNames);

  constructor(private store: Store<AppState>) {}
}
