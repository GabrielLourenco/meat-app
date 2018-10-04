import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'mt-order-sumary',
  templateUrl: './order-sumary.component.html'
})
export class OrderSumaryComponent implements OnInit {

  public rated: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  toRated(){
    this.rated = true
  }

}
