import { Routes } from "@angular/router";

import { HomeComponent } from "./home/home.component";
import { RestaurantsComponent } from "./restaurants/restaurants.component";
import { RestaurantDetailComponent } from "./restaurants/restaurant/restaurant-detail/restaurant-detail.component";
import { MenuComponent } from "./restaurants/restaurant/restaurant-detail/menu/menu.component";
import { ReviewsComponent } from "./restaurants/restaurant/restaurant-detail/reviews/reviews.component";
import { OrderSumaryComponent } from "./order-sumary/order-sumary.component";
import { NotFoundComponent } from "./not-found/not-found.component";

export const ROUTES: Routes = [
    {path: '', component: HomeComponent},
    {path: 'about', loadChildren: './about/about.module#AboutModule'},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'restaurants/:id', component: RestaurantDetailComponent,
        children: [
            {path: '', redirectTo: 'menu', pathMatch: 'full'},
            {path: 'menu', component: MenuComponent},
            {path: 'reviews', component: ReviewsComponent}
        ]},
    {path: 'restaurants', component: RestaurantsComponent},
    {path: 'order', loadChildren: './order/order.module#OrderModule'},
    {path: 'order-summary', component: OrderSumaryComponent},
    {path: '**', component: NotFoundComponent}//sempre no final
]