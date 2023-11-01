import { Component } from '@angular/core';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css'],
})
export class GameBoardComponent {
  gameBoard: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer: 'X' | 'O' = 'X';

  onCellClick(row: number, col: number): void {
    if (this.gameBoard[row][col] === '') {
      this.gameBoard[row][col] = this.currentPlayer;

      const winner: string | null = this.checkForWinner();

      /**TODO: Determine the winnerd count in the state when we define the user components */
      if (winner) {
        console.log(`Player ${winner} is won.`);

        this.resetGame();
      } else if (this.isDraw()) {
        console.log("It's a draw");
        this.resetGame();
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  private checkForWinner(): string | null {
    //Check horizontal rows
    for (let row of this.gameBoard) {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== '') {
        return row[0];
      }
    }

    //Check vertical columns
    for (let col = 0; col < 3; col++) {
      if (
        this.gameBoard[0][col] === this.gameBoard[1][col] &&
        this.gameBoard[0][col] === this.gameBoard[2][col] &&
        this.gameBoard[0][col] !== ''
      ) {
        return this.gameBoard[0][col];
      }
    }

    //Check diagonals
    if (
      this.gameBoard[0][0] === this.gameBoard[1][1] &&
      this.gameBoard[0][0] === this.gameBoard[2][2] &&
      this.gameBoard[0][0] !== ''
    ) {
      return this.gameBoard[0][0];
    }

    if (
      this.gameBoard[0][2] === this.gameBoard[1][1] &&
      this.gameBoard[0][2] === this.gameBoard[2][0] &&
      this.gameBoard[0][2] !== ''
    ) {
      return this.gameBoard[0][2];
    }

    return null;
  }

  resetGame(): void {
    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
  }

  private isDraw(): boolean {
    for (let row of this.gameBoard) {
      for (let cell of row) {
        if (cell === '') return false;
      }
    }

    return true;
  }
}
