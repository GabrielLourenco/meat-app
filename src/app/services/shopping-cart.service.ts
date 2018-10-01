import { MenuItem } from "../models/menu-item.model";
import { CartItem } from "../models/cart-item.model";

export class ShoppingCartService {
    items: any[] = [];

    public clear(): void {
        this.items = []
    }

    public addItem(item: MenuItem): void {
        let foundItem = this.items.find((mItem) => mItem.menuItem.id === item.id)
        if (foundItem) {
            foundItem.quantity = foundItem.quantity + 1
        } else {
            this.items.push (new CartItem(item))
        }
    }

    public removeItem(item: any): void {
        this.items.splice(this.items.indexOf(item), 1)

    }

    public total(): number {
        return this.items.map(item => item.value()).reduce((prev,value) => prev + value, 0);
    }
}