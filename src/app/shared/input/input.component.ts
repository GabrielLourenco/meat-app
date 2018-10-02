import { Component, OnInit, Input, ContentChild, AfterContentInit } from '@angular/core';
import { NgModel } from '@angular/forms'

@Component({
  selector: 'mt-input-container',
  templateUrl: './input.component.html'
})
export class InputComponent implements OnInit, AfterContentInit {

  @Input() public label: string;
  @Input() public errorMessage: string;

  public input: any;

  @ContentChild(NgModel) model: NgModel

  constructor() { }

  ngAfterContentInit(): void {
    this.input = this.model
    if (this.input === undefined) {
      throw new Error('Esse componente precisa ser uma diretiva ngModel')
    }
  }
  ngOnInit() {
  }

  public hasSuccess(): boolean {
    return this.input.valid && (this.input.dirty || this.input.touched )
  }

  public hasError(): boolean {
    return this.input.invalid && (this.input.dirty || this.input.touched )
  }

}
