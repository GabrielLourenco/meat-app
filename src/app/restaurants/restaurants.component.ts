import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'
import { FormGroup, FormControl } from '@angular/forms';

import { RestaurantsService } from '../services/restaurants.service';

import { Restaurant } from '../models/restaurant.model';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';

import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/catch';


@Component({
  selector: 'mt-restaurants',
  templateUrl: './restaurants.component.html',
  animations: [
    trigger('toggleSearch', [
      state('hidden', style({opacity: 0, maxHeight: '0px'})),
      state('visible', style({opacity: 1, maxHeight: '70px', marginTop: '20px'})),
      transition('* => *', animate('250ms 0s ease-in-out'))
    ]),
  ]
})

export class RestaurantsComponent implements OnInit {

  public searchBarState: string = 'hidden';

  restaurants: Restaurant[]

  public searchForm: FormGroup = new FormGroup({
    searchControl: new FormControl(null)
  });

  constructor(private restaurantsService: RestaurantsService) { }

  ngOnInit() {
    this.restaurantsService.returnRestaurantsList().subscribe(list => this.restaurants = list)

    this.searchForm.controls.searchControl.valueChanges
      .debounceTime(1000)
      .distinctUntilChanged()
      .switchMap(searchTerm =>
        this.restaurantsService.returnRestaurantsList(searchTerm)
        .catch( error => Observable.from([])))
      .subscribe(restaurants => this.restaurants = restaurants);
  }

  public toggleSearchBar(): void {
    this.searchBarState = this.searchBarState === 'hidden' ? 'visible' : 'hidden';
  }

}
