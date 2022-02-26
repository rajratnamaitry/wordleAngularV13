import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {Itiles, LetterState} from 'src/app/type'
import { getWordOfTheDay, allWords } from 'src/app/word'
@Component({
  selector: 'app-key-pad',
  templateUrl: './key-pad.component.html',
  styleUrls: ['./key-pad.component.css']
})
export class KeyPadComponent implements OnInit {
  currentRow : Array<Itiles>  = [];
  @Input() board: Array<Array<Itiles>> = [];
  @Output() shakeRowIndexEmit = new EventEmitter()
  answer = getWordOfTheDay()
  rows = [
    'qwertyuiop'.split(''),
    'asdfghjkl'.split(''),
    ['Enter', ...'zxcvbnm'.split(''), 'Backspace']
  ]
  allowInput = true
  allWords: Array<string> = allWords;
  letterStates: any = {};
  currentRowIndex: number = 0; 
  grid: any;
  success: boolean | undefined;
  shakeRowIndex: any;
  message: string | undefined;
  icons: any = {
    [LetterState.CORRECT]: '🟩',
    [LetterState.PRESENT]: '🟨',
    [LetterState.ABSENT]: '⬜',
    [LetterState.INITIAL]: null
  }
  
  constructor() { }

  ngOnInit(): void {
    this.currentRow = this.board[0];
  }
  keyClick (key: string){
    if (!this.allowInput) return
    if (/^[a-zA-Z]$/.test(key)) {
      this.fillTile(key.toLowerCase())
    } else if (key === 'Backspace') {
      this.clearTile()
    } else if (key === 'Enter') {
      this.completeRow()
    }
  }
  fillTile(letter: string) {
    for (const tile of this.currentRow) {
      if (!tile.letter) {
        tile.letter = letter
        break
      }
    }
  }
  clearTile() {
    for (const tile of [...this.currentRow].reverse()) {
      if (tile.letter) {
        tile.letter = '';
        break
      }
    }
  }
  completeRow() {
    if (this.currentRow.every((tile: Itiles) => tile.letter)) {
      const guess = this.currentRow.map((tile : Itiles) => tile.letter).join('')
      if (!this.allWords.includes(guess) && guess !== this.answer) {
        this.shake()
        this.showMessage({ msg: `Not in word list` })
        return
      }
  
      const answerLetters: (string | null)[] = this.answer.split('')
      // first pass: mark correct ones
      this.currentRow.forEach((tile:Itiles, i: number) => {
        if (answerLetters[i] === tile.letter) {
          tile.state = this.letterStates[tile.letter] = LetterState.CORRECT
          answerLetters[i] = null
        }
      })
      // second pass: mark the present
      this.currentRow.forEach((tile:Itiles) => {
        if (!tile.state && answerLetters.includes(tile.letter)) {
          tile.state = LetterState.PRESENT
          answerLetters[answerLetters.indexOf(tile.letter)] = null
          if (!this.letterStates[tile.letter]) {
            this.letterStates[tile.letter] = LetterState.PRESENT
          }
        }
      })
      // 3rd pass: mark absent
      this.currentRow.forEach((tile:Itiles) => {
        if (!tile.state) {
          tile.state = LetterState.ABSENT
          if (!this.letterStates[tile.letter]) {
            this.letterStates[tile.letter] = LetterState.ABSENT
          }
        }
      })
  
      this.allowInput = false
      if (this.currentRow.every((tile:Itiles) => tile.state === LetterState.CORRECT)) {
        // yay!
        setTimeout(() => {
          this.grid = this.genResultGrid()
          this.showMessage(
            { msg: ['Genius', 'Magnificent', 'Impressive', 'Splendid', 'Great', 'Phew'][this.currentRowIndex], time: -1 }          )
          this.success = true
        }, 1600)
      } else if (this.currentRowIndex < this.board.length - 1) {
        // go the next row
        this.currentRowIndex++
        this.currentRow = this.board[this.currentRowIndex];
        setTimeout(() => {
          this.allowInput = true
        }, 1600)
      } else {
        // game over :(
        setTimeout(() => {
          this.showMessage({ msg: this.answer.toUpperCase(), time: -1 })
        }, 1600)
      }
    } else {
      this.shake()
      this.showMessage({ msg: 'Not enough letters' })
    }
  }
  genResultGrid(): any {
    
    return this.board.slice(0, this.currentRowIndex + 1)
    .map((row) => {
      return row.map((tile) => this.icons[tile.state]).join('')
    })
    .join('\n')
  }
  shake() {
    this.shakeRowIndex = this.currentRowIndex;
    this.shakeRowIndexEmit.emit(this.shakeRowIndex)
    setTimeout(() => {
      this.shakeRowIndex = -1
      this.shakeRowIndexEmit.emit(this.shakeRowIndex)
    }, 1000)
  }
  showMessage({ msg, time = 1000 }: { msg: string; time?: number; }) {
    this.message = msg
    if (time > 0) {
      setTimeout(() => {
        this.message = ''
      }, time)
    }
  }
}
