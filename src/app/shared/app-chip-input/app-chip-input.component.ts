import {Component, Input, Output, EventEmitter} from '@angular/core';
import {Country} from "../../core/models/country";

@Component({
  selector: 'app-chip-input',
  templateUrl: './app-chip-input.component.html',
  styleUrls: ['./app-chip-input.component.scss']
})
export class AppChipInputComponent {
  @Input() chipData: Country[] = [];
  @Output() remove = new EventEmitter();

  onRemove(item) {
    this.remove.emit(item)
  }
}
