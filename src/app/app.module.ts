import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import * as fromGame from './store/reducers/game.reducer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameBoardComponent } from './components/game-board/game-board.component';

import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';

import { GameScoreComponent } from './components/game-score/game-score.component';
import { ButtonComponent } from './components/button/button.component';
import { NicknameDialogComponent } from './components/nickname-dialog/nickname-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    GameBoardComponent,
    GameScoreComponent,
    ButtonComponent,
    NicknameDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    StoreModule.forRoot({ game: fromGame.reducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
