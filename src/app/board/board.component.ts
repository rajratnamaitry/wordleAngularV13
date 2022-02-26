import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itiles } from '../type';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit, AfterViewInit {

  constructor() { }
  @Input() board: Array<Array<Itiles>> = [];
  @Input() shakeRowIndex: number = 0;
  @Input() currentRowIndex: number = 0;
  ngOnInit(): void {

  }
  ngAfterViewInit(): void {

  }
}
