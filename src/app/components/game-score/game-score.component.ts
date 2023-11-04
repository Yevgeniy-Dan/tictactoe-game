import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/game-service.service';
import { PlayersScore } from 'src/app/types/game-board';

@Component({
  selector: 'app-game-score',
  templateUrl: './game-score.component.html',
  styleUrls: ['./game-score.component.css'],
})
export class GameScoreComponent implements OnInit {
  score: PlayersScore = {} as PlayersScore;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.scoreUpdated$.subscribe((newScore) => {
      this.score = { ...newScore };
    });
  }
}
