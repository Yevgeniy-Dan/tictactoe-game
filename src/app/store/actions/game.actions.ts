import { createAction, props } from '@ngrx/store';
import { PlayerNames } from 'src/app/types/game-board';

export const setPlayerNames = createAction(
  '[Game Page] Set Players Name',
  props<{ names: PlayerNames }>()
);

export const changeScore = createAction(
  '[Game Page] Change Score',
  props<{ player: 'X' | 'O' }>()
);

export const clearGameBoard = createAction(
  '[Game Page] Clear Game Board',
  props<{ clearGameBoard: boolean }>()
);

export const resetGameState = createAction(
  '[Game Page] Toggle Reset Game State'
);

export const setStatemate = createAction(
  '[Game Score] Set Statemate',
  props<{ isStatemate: boolean }>()
);
