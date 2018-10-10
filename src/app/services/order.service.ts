import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';

import { ShoppingCartService } from "./shopping-cart.service";
import { CartItem } from "../models/cart-item.model";
import { MEAT_API } from "../app.api";
import { Order } from "../models/order.model";
import { LoginService } from "./login.service";

@Injectable()
export class OrderService {
    constructor(private cartService: ShoppingCartService, private http: HttpClient, private loginService: LoginService) {}

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
        let headers = new HttpHeaders();
        if (this.loginService.isLoggedIn()){
            headers = headers.set('Authorization', `Bearer ${this.loginService.user.accessToken}`)
        }
        return this.http.post<Order>(`${MEAT_API}/orders`, order, {headers: headers})
            // .map(response => response.json())
    }

}