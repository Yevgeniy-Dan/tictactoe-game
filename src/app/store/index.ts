import { createFeatureSelector, createSelector } from '@ngrx/store';

import { PlayerNames, PlayersScore } from '../types/game-board';

export const gameFeaturesKey = 'game';

export interface GameState {
  players: PlayerNames;
  count: PlayersScore;
  clearGameBoard: boolean;
  resetGame: boolean;
  isStatemate: boolean;
  isCellsBlocked: boolean;
}

export interface AppState {
  game: GameState;
}

export const selectGame = createFeatureSelector<GameState>(gameFeaturesKey);

export const selectGameScore = createSelector(
  selectGame,
  (state: GameState) => state.count
);

export const selectPlayerNames = createSelector(
  selectGame,
  (state: GameState) => state.players
);

export const selectClearGameBoard = createSelector(
  selectGame,
  (state: GameState) => state.clearGameBoard
);

export const selectResetGameState = createSelector(
  selectGame,
  (state: GameState) => state.resetGame
);

export const selectIsStatemate = createSelector(
  selectGame,
  (state: GameState) => state.isStatemate
);

export const selectIsCellsBlocked = createSelector(
  selectGame,
  (state: GameState) => state.isCellsBlocked
);
