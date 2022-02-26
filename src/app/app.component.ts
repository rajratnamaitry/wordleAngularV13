import { Component, Input } from '@angular/core';
import { Itiles, LetterState } from './type';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'wordle';
  currentRow : Array<Itiles>  = [];
  board = Array.from({ length: 6 }, () =>
      Array.from({ length: 5 }, () : Itiles => ({
          letter: '',
          state: LetterState.INITIAL
        }))
    )
  currentRowFn(val: Array<Itiles>){
    this.currentRow = val
  }
}
