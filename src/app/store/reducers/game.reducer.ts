import { Action, createReducer, on } from '@ngrx/store';
import * as gameActions from '../actions/game.actions';

import { GameState } from '..';
import { PlayerNames } from 'src/app/types/game-board';

export const intiialState: GameState = {
  players: {} as PlayerNames,
  count: {
    X: 0,
    O: 0,
  },
  clearGameBoard: false,
  resetGame: false,
  isStatemate: false,
  isCellsBlocked: false,
};

export const gameReducer = createReducer(
  intiialState,
  on(gameActions.setPlayerNames, (state, action) => {
    return {
      ...state,
      players: { ...action.names },
    };
  }),
  on(gameActions.changeScore, (state, action) => {
    return {
      ...state,
      count: {
        ...state.count,
        [action.player]: state.count[action.player] + 1,
      },
      players: {
        ...state.players,
        [state.players[action.player]]: state.count[action.player] + 1,
      },
      isCellsBlocked: true,
    };
  }),
  on(gameActions.clearGameBoard, (state, action) => {
    return {
      ...state,
      clearGameBoard: action.clearGameBoard,
      isCellsBlocked: false,
    };
  }),
  on(gameActions.resetGameState, (state) => {
    return {
      ...state,
      clearGameBoard: true,
      count: {
        O: 0,
        X: 0,
      },
      isCellsBlocked: false,
    };
  }),
  on(gameActions.setStatemate, (state, { isStatemate }) => {
    return {
      ...state,
      isStatemate,
      isCellsBlocked: true,
    };
  })
);

export function reducer(state: GameState | undefined, action: Action) {
  return gameReducer(state, action);
}
