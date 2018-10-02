import { OrderItem } from "./order-item.model";

export class Order {
    constructor(
        public address: string,
        public number: number,
        public optional: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = []) {}

    public id;
}