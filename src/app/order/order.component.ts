import { Component, OnInit } from '@angular/core';
import { RadioOption } from '../shared/radio/radio-option.model';
import { OrderService } from '../services/order.service';
import { CartItem } from '../models/cart-item.model';
import { Order } from '../models/order.model';
import { map } from 'rxjs/operator/map';
import { OrderItem } from '../models/order-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'mt-order',
  templateUrl: './order.component.html'
})
export class OrderComponent implements OnInit {

  public delivery: number = 8;

  public paymentOptions: RadioOption[] = [
    new RadioOption('Dinheiro', 'MON'),
    new RadioOption('Cartão de Débito', 'DEB'),
    new RadioOption('Cartão Refeição', 'REF'),
  ]

  constructor(
    private orderService: OrderService,
    private router: Router) { }

  ngOnInit() {
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
      this.orderService.checkOrder(order).subscribe((orderId: Order) => {
        this.router.navigate(['/order-summary'])
        this.orderService.clear()
      })
  }

}
