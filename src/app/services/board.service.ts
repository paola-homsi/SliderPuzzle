import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private state: any[];
  private size: number;
  constructor() { }

  public InitBoard(boradSize){
    this.size = boradSize;
    let elementsTotal = Math.pow(boradSize, 2);
    let Found = false;
    while(!Found){
      this.state = Array.from(Array(elementsTotal).keys());
      this.state = this.shuffle(this.state)
      Found = this.IsSolvable(this.state, boradSize);
    }
    
    return this.state;
  }
  private shuffle(array) {
    //return [1,2,3,4,5,6,7,8,9,10,11,12,13,14,0,15]
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}
private IsSolvable(array, size){
  let inversions = 0;
  let solvable = false;
  let row = 0;
  let blanRow = -1;
  for(let i =0; i < array.length; i++){

    for(let j = i; j < array.length; j++){
      if(array[i] > array[j])
        inversions++;
    }
    if(i % size === 0) row++;
    if(array[i] == 0)
      blanRow = row;
  }
  if(size % 2 !== 0 && inversions % 2 === 0)
    solvable = true;
  else if(size % 2 === 0 && inversions % 2 !== 0 && blanRow % 2 === 0)
    solvable = true;
  else if (size % 2 === 0 && inversions % 2 === 0 && blanRow % 2 !== 0)
    solvable = true;
  return solvable;
}
  public GetState(){
    return this.state;
  }
  private GetAdjacents(){
    let index =this.state.indexOf(0);
    let adjs = [];
    if(this.isValidIndex(index -1)) //left
      adjs.push(index-1)
    if(this.isValidIndex(index +1)) //right
      adjs.push(index+1)
    if(this.isValidIndex(index- this.size)) //up
      adjs.push(index- this.size)
    if(this.isValidIndex(index+ this.size)) //down
      adjs.push(index+ this.size)
    return adjs;
  }
 
  public CanSwap(number){
    let index = this.state.indexOf(number);
    let adjs = this.GetAdjacents();
    if(adjs.includes(index))
      return true;
    else 
      return false;
  }
  public Swap(number){
    let baseIndex = this.state.indexOf(0); 
    let index = this.state.indexOf(number);
    this.state[baseIndex] = number;
    this.state[index] = 0;
    
  }
  public IsComplete(){
    let isDone = true;
    this.state.forEach((item, index) => {
      if(index < this.state.length -3 && item > this.state[index+1]){
        isDone = false;
      }
    })
    
    return isDone && this.state[this.state.length-1] == 0;
  }
  private isValidIndex(index){
    return index < Math.pow(this.size, 2) && index >= 0;
  }
}
