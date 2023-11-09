import { Action, createReducer, on } from '@ngrx/store';
import * as gameActions from '../actions/game.actions';

import { GameState } from '..';

export const intiialState: GameState = {
  count: {
    X: 0,
    O: 0,
  },
  clearGameBoard: false,
  resetGame: false,
};

export const gameReducer = createReducer(
  intiialState,
  on(gameActions.changeScore, (state, action) => {
    return {
      ...state,
      count: {
        ...state.count,
        [action.player]: state.count[action.player] + 1,
      },
    };
  }),
  on(gameActions.clearGameBoard, (state, action) => {
    return {
      ...state,
      clearGameBoard: action.clearGameBoard,
    };
  }),
  on(gameActions.resetGameState, (state, action) => {
    return {
      ...state,
      clearGameBoard: true,
      count: {
        O: 0,
        X: 0,
      },
    };
  })
);

export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
