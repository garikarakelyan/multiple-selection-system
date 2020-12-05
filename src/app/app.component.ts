import {
  Component,
  OnInit,
} from '@angular/core';
import items from '../assets/files/countries.json';
import {Country} from "./core/models/country";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public data: Country[] = [];

  ngOnInit() {
    this.data = items.map(item => new Country(item));
  }
}
