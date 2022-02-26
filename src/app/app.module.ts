import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { KeyPadComponent } from './key-pad/key-pad.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    KeyPadComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
