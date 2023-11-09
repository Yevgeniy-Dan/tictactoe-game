import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject, Subscriber, takeUntil } from 'rxjs';

import { CELL_CLASS_NAMES_MAP, WIN_RULES } from 'src/app/constants/constants';
import {
  AppState,
  selectClearGameBoard,
  selectResetGameState,
} from 'src/app/store';
import {
  changeScore,
  clearGameBoard,
  resetGameState,
} from 'src/app/store/actions/game.actions';
import { Players, sign } from 'src/app/types/game-board';

/**
 * The GameBoardComponent represents a tic-tac-toe game board.
 * It allows players to make moves and tracks the game's state, including wins, losses, draws, and stalemates.
 */
@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent implements OnInit {
  completedSteps: number = 0;
  gameBoard: Map<number, sign> = new Map<number, sign>();
  players: Players = {
    X: [],
    O: [],
  };
  currentPlayer: 'X' | 'O' = 'X';

  classNamesMap: Map<number, string> = CELL_CLASS_NAMES_MAP;

  private unsubscribe$: Subject<void> = new Subject<void>();

  constructor(private store: Store<AppState>) {
    this.setSubscriptionToClearGameBoardEvent();
    this.setSubscriptionToResetGameState();
  }

  ngOnInit(): void {
    this.initializeGameBoard();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initializeGameBoard(): void {
    for (let i = 1; i <= 9; i++) {
      this.gameBoard.set(i, '');
    }
  }

  onCellClick(cellNumber: number): void {
    if (this.gameBoard.get(cellNumber) === '') {
      this.gameBoard.set(cellNumber, this.currentPlayer);
      this.players[this.currentPlayer].push(cellNumber);
      this.completedSteps++;

      const xWin: boolean = this.checkWin(this.players['X']);
      const oWin: boolean = this.checkWin(this.players['O']);

      if (xWin) {
        console.log(`Player X is won.`);

        this.store.dispatch(changeScore({ player: 'X' }));
      } else if (oWin) {
        console.log(`Player O is won.`);
        this.store.dispatch(changeScore({ player: 'O' }));
      } else if (this.isStatemate()) {
        console.log("It's a draw");
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  private checkWin(playerCells: number[]): boolean {
    for (const rule of WIN_RULES) {
      if (rule.every((cell) => playerCells.includes(cell))) {
        return true; // The current player has a winning combination
      }
    }
    return false;
  }

  /**
   *  Checks if the game has reached a potential stalemate.
   * A stalemate occurs when there are 5 or more completed steps,
   * and all possible combinations of X and O moves do not lead to a win for either player.
   *
   * @returns {boolean}  if a stalemate is detected, the function returns false; otherwise, it returns true.
   */
  private isStatemate(): boolean {
    if (this.completedSteps >= 5) {
      const emptyCells = this.findEmptyCells();

      if (emptyCells.length === 0) return true;

      const numberOfPossiblePlacedX = Math.ceil(emptyCells.length / 2);
      const possibleXCombinations: number[][] = this.generateCombinations(
        emptyCells,
        numberOfPossiblePlacedX
      );

      for (const combination of possibleXCombinations) {
        if (this.checkStatemateForPlayer('X', combination)) {
          return false;
        }

        const remainingCellForO = emptyCells.filter(
          (cell) => !combination.includes(cell)
        );

        if (this.checkStatemateForPlayer('O', remainingCellForO)) {
          return false;
        }
      }

      return true;
    }
    return false;
  }

  /**
   * Helper method to check for a stalemate for a specific player
   * @param player The player ('X' or 'O') to check for a potential win or loss.
   * @param combination An array of cell numbers representing the player's moves and possible additional moves to consider.
   * @returns true if the specified player has won or lost the game based on the provided combination; false otherwise.
   */
  private checkStatemateForPlayer(
    player: 'X' | 'O',
    combination: number[]
  ): boolean {
    const completedStepsForPlayer: number[] = [
      ...this.players[player],
      ...combination,
    ].sort();
    return this.checkWin(completedStepsForPlayer);
  }

  /**
   * Helper method to find empty cells in the game board
   * @returns {number[]} empty cells of the current game board
   */
  private findEmptyCells(): number[] {
    const emptyCells: number[] = [];

    for (const [key, value] of this.gameBoard) {
      if (value === '') emptyCells.push(key);
    }

    return emptyCells;
  }

  resetGame(): void {
    this.initializeGameBoard();
    this.players = { X: [], O: [] } as Players;
    this.currentPlayer = 'X';
  }

  /**
   * Helper method to generate possible combinations of cells
   * @param arr An array of numbers from which combinations will be generated.
   * @param k The length of the combinations to generate.
   * @returns An array of arrays, where each inner array represents a unique combination of 'k' elements from the input array 'arr.'
   */
  private generateCombinations(arr: number[], k: number): number[][] {
    const combinations: number[][] = [];

    function backtrack(start: number, currentCombo: number[]) {
      if (currentCombo.length === k) {
        combinations.push(currentCombo.slice());
        return;
      }

      for (let i = start; i < arr.length; i++) {
        currentCombo.push(arr[i]);
        backtrack(i + 1, currentCombo);
        currentCombo.pop();
      }
    }
    backtrack(0, []);
    return combinations;
  }

  private setSubscriptionToClearGameBoardEvent(): void {
    this.store
      .select(selectClearGameBoard)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((toClear) => {
        if (toClear) {
          this.resetGame();
          this.store.dispatch(clearGameBoard({ clearGameBoard: false }));
        }
      });
  }

  private setSubscriptionToResetGameState(): void {
    this.store
      .select(selectResetGameState)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.resetGame();
      });
  }
}
