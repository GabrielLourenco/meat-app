import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ShoppingCartService } from './shopping-cart.service';
import { CartItem } from '../models/cart-item.model';
import { MEAT_API } from '../app.api';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: HttpClient) {}

    public itemsValue(): number {
        return this.cartService.total()
    }

    public cartItems(): CartItem[] {
        return this.cartService.items
    }

    public increaseQty(item: CartItem): void {
        this.cartService.increaseQty(item);
    }

    public decreaseQty(item: CartItem): void {
        this.cartService.decreaseQty(item);
    }

    public removeItem(item: CartItem): void {
        this.cartService.removeItem(item);
    }

    public clear(): void {
        this.cartService.clear();
    }

    public checkOrder(order: Order): Observable<Order> {
        return this.http.post<Order>(`${MEAT_API}/orders`, order)
            // .map(response => response.json())
    }

}
