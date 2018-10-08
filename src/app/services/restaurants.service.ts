import { Injectable } from "@angular/core";
import { Http } from "@angular/http";

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from "../models/restaurant.model";
import { MenuItem } from "../models/menu-item.model";

import { MEAT_API } from "../app.api";
import { ErrorHandler } from "../library/app.error-handler"

@Injectable()
export class RestaurantsService {

    constructor(private http: Http) { }

    public returnRestaurantsList(search?: string): Observable<Restaurant[]> {
        return this.http.get(`${MEAT_API}/restaurants`, {params: {q: search}})
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }

    public getRestaurantById(id: string): Observable<Restaurant> {
        return this.http.get(`${MEAT_API}/restaurants/${id}`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }

    public reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }

    public menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/menu`)
            .map(response => response.json())
            .catch(ErrorHandler.handleError);
    }
}