import { Injectable } from "@angular/core";
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ShoppingCartService } from "./shopping-cart.service";
import { CartItem } from "../models/cart-item.model";
import { MEAT_API } from "../app.api";
import { Order } from "../models/order.model";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: Http) {}

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
        const headers = new Headers()
        headers.append('Content-Type', 'application/json');

        return this.http.post(`${MEAT_API}/orders`, JSON.stringify(order), new RequestOptions({headers: headers}))
            .map(response => response.json())
    }

}