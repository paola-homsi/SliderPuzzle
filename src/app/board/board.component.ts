import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { BoardService } from '../services/board.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  BoardState: any[];
  CanSwap: boolean;
  IsDone: boolean = false;

  constructor(private StateService: BoardService) { }

  ngOnInit(): void {
    this.BoardState = this.StateService.InitBoard(4)
  }
  ngAnimation(){
    console.log('aniated')
  }
  MoveElement(item){
    debugger;
    this.CanSwap = this.StateService.CanSwap(item);
    console.log(`CanSwap item : ${this.CanSwap}`);
    if(this.CanSwap){
      this.StateService.Swap(item);
      this.BoardState = this.StateService.GetState();
      this.IsDone = this.StateService.IsComplete();
      
    }
    
  }
}
