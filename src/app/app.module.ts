import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AppChipInputComponent} from "./shared/app-chip-input/app-chip-input.component";
import {FormsModule} from "@angular/forms";
import {MultipleDropdownComponent} from "./shared/multiple-dropdown/multiple-dropdown.component";
import {ClickOutsideModule} from "ng-click-outside";

@NgModule({
  declarations: [
    AppComponent,
    AppChipInputComponent,
    MultipleDropdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ClickOutsideModule
  ],
  exports: [
    AppChipInputComponent,
    MultipleDropdownComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
