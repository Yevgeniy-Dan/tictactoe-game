import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlayersScore } from '../types/game-board';

export const gameFeaturesKey = 'game';

export interface GameState {
  count: PlayersScore;
  clearGameBoard: boolean;
  resetGame: boolean;
}

export interface AppState {
  game: GameState;
}

export const selectGame = createFeatureSelector<GameState>(gameFeaturesKey);

export const selectGameScore = createSelector(
  selectGame,
  (state: GameState) => state.count
);

export const selectClearGameBoard = createSelector(
  selectGame,
  (state: GameState) => state.clearGameBoard
);

export const selectResetGameState = createSelector(
  selectGame,
  (state: GameState) => state.resetGame
);
