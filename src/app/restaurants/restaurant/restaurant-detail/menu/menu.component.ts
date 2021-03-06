import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { MenuItem } from '../../../../models/menu-item.model';
import { RestaurantsService } from '../../../../services/restaurants.service';

@Component({
  selector: 'mt-menu',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {

  public menu: Observable<MenuItem[]>

  constructor(
    private restaurantsService: RestaurantsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.menu = this.restaurantsService.menuOfRestaurant(this.route.parent.snapshot.params['id'])
  }

  public addMenuItem(item: MenuItem) {
    console.log(item);
  }

}
