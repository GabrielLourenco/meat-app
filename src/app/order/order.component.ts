import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';

import { tap } from 'rxjs/operators';

import { OrderService } from '../services/order.service';

import { OrderItem } from '../models/order-item.model';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';
import { RadioOption } from '../shared/radio/radio-option.model';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  private emailPattern: RegExp = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  private numberPattern: RegExp = /^[0-9]*$/

  public orderForm: FormGroup

  public delivery: number = 8;

  public orderId: string;

  public paymentOptions: RadioOption[] = [
    new RadioOption('Dinheiro', 'MON'),
    new RadioOption('Cartão de Débito', 'DEB'),
    new RadioOption('Cartão Refeição', 'REF'),
  ]

  constructor(
    private orderService: OrderService,
    private router: Router,
  ) { }

  ngOnInit() {
    // form com validador de emails iguais
    this.orderForm = new FormGroup({
      name: new FormControl('', {
        validators: [Validators.required, Validators.minLength(5)]
      }),
      email: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      emailConfirmation: new FormControl('', [Validators.required, Validators.pattern(this.emailPattern)]),
      address: new FormControl('', [Validators.required, Validators.minLength(5)]),
      number: new FormControl('', [Validators.required, Validators.pattern(this.numberPattern)]),
      optionalAddress: new FormControl(''),
      paymentOption: new FormControl('', [Validators.required]),
    }, {validators: [OrderComponent.equalsEmail], updateOn: 'blur'})
  }

  public static equalsEmail(group: AbstractControl): {[key:string]: boolean} {
    const email = group.get('email');
    const emailConfirmation = group.get('emailConfirmation');

    if (!email || !emailConfirmation) {
      return undefined;
    }
    if (email.value !== emailConfirmation.value){
      return {emailsNotMatch: true};
    }
    return undefined;
  }

  public itemsValue(): number {
    return this.orderService.itemsValue();
  }

  public cartItems(): CartItem[] {
    return this.orderService.cartItems();
  }

  public increaseQty(item: CartItem): void {
    this.orderService.increaseQty(item);
  }

  public decreaseQty(item: CartItem): void {
    this.orderService.decreaseQty(item)
  }

  public removeItem(item: CartItem): void {
    this.orderService.removeItem(item);
  }

  public checkOrder(order: Order): void {
    order.orderItems = this.cartItems()
      .map((item: CartItem) => new OrderItem(item.quantity, item.menuItem.id))
      this.orderService.checkOrder(order).pipe(
        tap((ord) => {
          this.orderId = ord.id
        })
      )
      .subscribe((orderId: Order) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
  }

  public isOrderCompleted(): boolean {
    return this.orderId !== undefined
  }

}
