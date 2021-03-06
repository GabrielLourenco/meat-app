import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'mt-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.css']
})
export class RatingComponent implements OnInit {

  public rates: number[] = [1,2,3,4,5];
  public rate: number = 0;
  public previousRate: number;

  @Output() rated = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  public setRate(r: number): void {
    this.rate = r;
    this.previousRate = undefined;
    this.rated.emit(r)
  }

  public setTemporaryRate(r: number): void {
    if (this.previousRate === undefined) {
      this.previousRate = this.rate
    }
    this.rate = r
  }

  public clearTemporaryRate(): void {
    if (this.previousRate !== undefined) {
      this.rate = this.previousRate;
      this.previousRate = undefined;
    }
  }

}
