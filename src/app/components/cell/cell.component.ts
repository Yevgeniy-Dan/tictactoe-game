import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css'],
})
export class CellComponent {
  @Input() value?: string;
  @Output() cellClick = new EventEmitter<void>();

  onClick(): void {
    this.cellClick.emit();
  }
}
