import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import items from '../assets/files/countries.json';
import {Country} from "./core/models/country";
import {fromEvent, ReplaySubject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  public countriesList: Country[] = [];
  public data: Country[] = [];
  public enteredCountries: Country[] = []
  public alreadyExist: boolean = false;
  public noResult: boolean = false;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  private unsubscribe$ = new ReplaySubject<void>(1);

  ngOnInit() {}

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(600),
    ).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        (event: KeyboardEvent) => {
          let country = event['srcElement']['value'].toLowerCase();
          if (country.length) {
            this.onSearch(this.data, country);
          } else {
            this.initData();
          }
        }
      );

    fromEvent(this.searchInput.nativeElement, 'focus').pipe(
      debounceTime(600),
    ).pipe(
      takeUntil(this.unsubscribe$)
    )
      .subscribe(
        (event: KeyboardEvent) => {
          this.initData();
        }
      );
  }

  initData() {
    this.data = items.map(item => new Country(item));
    this.countriesList = [...this.data];
  }

  onSearch(data, searchWord: string) {
    this.countriesList = this.data.filter(
      datum => (datum.name.toLowerCase().indexOf(searchWord) > -1));
  }

  onSelect(item) {
    if(!this.enteredCountries.includes(item)) {
      this.enteredCountries.push(item);
      this.alreadyExist = false;
      this.searchInput.nativeElement.value = '';
    } else {
      this.alreadyExist = true;
    }
  }

  onRemoveItem(item) {
    this.enteredCountries = this.enteredCountries.filter(single => {
      return single.id !== item.id;
    })
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
