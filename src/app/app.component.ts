import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, selectIsStatemate } from './store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  isStatemate$: Observable<boolean> = this.store.select(selectIsStatemate);

  constructor(private store: Store<AppState>) {}
}
