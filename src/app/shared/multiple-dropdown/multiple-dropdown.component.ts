import {
  AfterViewInit,
  Component,
  ElementRef, Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {fromEvent, ReplaySubject} from "rxjs";
import {debounceTime, takeUntil} from "rxjs/operators";
import {Country} from "../../core/models/country";

@Component({
  selector: 'app-multiple-dropdown',
  templateUrl: './multiple-dropdown.component.html',
  styleUrls: ['./multiple-dropdown.component.scss']
})

export class MultipleDropdownComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() chipData = [];
  public data: Country[] = [];
  public enteredCountries: Country[] = []
  public clicked: boolean = false;
  public alreadyExist: boolean = false;
  public noResult: boolean = false;
  @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
  private unsubscribe$ = new ReplaySubject<void>(1);


  ngOnInit() {
    if (this.chipData && this.chipData.length) {
      this.initData()
    }
  }

  initData() {
    this.data = [...this.chipData];
  }

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
            this.onSearch(this.chipData, country);
          } else {
            this.initData();
            this.noResult = false;
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
          this.clicked = true
        }
      );
  }

  onSearch(data, searchWord: string) {
    this.data = this.chipData.filter(
      datum => (datum.name.toLowerCase().indexOf(searchWord) > -1));
    if (!this.data.length) {
      this.noResult = true
    }
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

  onClickedOutside(e) {
    if (e.target.className !== 'multiple-select__search-input') {
      this.clicked = false
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
