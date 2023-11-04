import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { PlayersScore } from './types/game-board';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private scoreUpdatedSource = new BehaviorSubject<PlayersScore>({
    X: 0,
    O: 0,
  });
  private statemateSource = new Subject<boolean>();
  private gameBoardIsBlockedSource = new Subject<boolean>();

  scoreUpdated$ = this.scoreUpdatedSource.asObservable();
  statemateUpdated$ = this.statemateSource.asObservable();
  gameBoardIsBlockedUpdated$ = this.gameBoardIsBlockedSource.asObservable();

  updateScore(newScore: PlayersScore) {
    this.scoreUpdatedSource.next(newScore);
    this.gameBoardIsBlockedSource.next(true);
  }

  updateStatemate(value: boolean) {
    this.statemateSource.next(value);
    this.gameBoardIsBlockedSource.next(true);
  }

  updateIsBlockedGameBoard(value: boolean) {
    this.gameBoardIsBlockedSource.next(value);
  }
}
