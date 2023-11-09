import { createAction, props } from '@ngrx/store';

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
