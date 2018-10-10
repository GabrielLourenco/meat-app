import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { InputComponent } from "./input/input.component";
import { RadioComponent } from "./radio/radio.component";
import { RatingComponent } from "./rating/rating.component";

import { ShoppingCartService } from "../services/shopping-cart.service";
import { RestaurantsService } from "../services/restaurants.service";
import { OrderService } from "../services/order.service";
import { SnackbarComponent } from './messages/snackbar/snackbar.component';
import { NotificationService } from "../services/notification.service";
import { LoginService } from '../services/login.service'

@NgModule({
    declarations: [ InputComponent, RadioComponent, RatingComponent, SnackbarComponent ],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
    exports: [ InputComponent, RadioComponent, RatingComponent, CommonModule, FormsModule, ReactiveFormsModule, SnackbarComponent ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [ ShoppingCartService, RestaurantsService, OrderService, NotificationService, LoginService ]
        }
    }
}