import { Component } from '@angular/core';
import { GameService } from './game-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isStatemate: boolean = false;
  isBlocked: boolean = false;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.statemateUpdated$.subscribe((value) => {
      this.isStatemate = value;
    });

    this.gameService.gameBoardIsBlockedUpdated$.subscribe((value) => {
      this.isBlocked = value;
    });
  }
}
