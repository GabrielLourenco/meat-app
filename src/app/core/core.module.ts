import { NgModule } from "@angular/core";
import { ShoppingCartService } from "../services/shopping-cart.service";
import { RestaurantsService } from "../services/restaurants.service";
import { OrderService } from "../services/order.service";

@NgModule({
    providers: [ ShoppingCartService, RestaurantsService, OrderService]
})
export class CoreModule {}