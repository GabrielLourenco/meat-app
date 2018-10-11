import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";

import { Observable } from "rxjs/Observable"
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Restaurant } from "../models/restaurant.model";
import { MenuItem } from "../models/menu-item.model";

import { MEAT_API } from "../app.api";

@Injectable()
export class RestaurantsService {

    constructor(private http: HttpClient) { }

    public returnRestaurantsList(search?: string): Observable<Restaurant[]> {
        let params: HttpParams;
        if (search) {
            params = new HttpParams().set('q', search);
        }
        return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`, {params: params})
    }

    public getRestaurantById(id: string): Observable<Restaurant> {
        return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`)
    }

    public reviewsOfRestaurant(id: string): Observable<any> {
        return this.http.get(`${MEAT_API}/restaurants/${id}/reviews`)
    }

    public menuOfRestaurant(id: string): Observable<MenuItem[]> {
        return this.http.get<MenuItem[]>(`${MEAT_API}/restaurants/${id}/menu`);
    }
}
