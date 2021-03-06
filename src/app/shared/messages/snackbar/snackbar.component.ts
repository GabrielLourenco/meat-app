import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations'

import { NotificationService } from '../../../services/notification.service';
import { Observable, timer } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'mt-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css'],
  animations: [
    trigger('snack-visibility', [
      state('hidden', style({opacity: 0, bottom: '0px'})),
      state('visible', style({opacity: 1, bottom: '50px'})),
      transition('hidden => visible', animate('500ms 0s ease-in')),
      transition('visible => hidden', animate('500ms 0s ease-out')),
    ])
  ]
})
export class SnackbarComponent implements OnInit {

  public message: string = 'Hello world'
  public snackVisibility: string = 'hidden'

  constructor(private notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService.notifier
      .pipe(
        tap( (message: string) => {
          this.message = message
          this.snackVisibility = 'visible'
        }),
        switchMap(() => timer(3000))
      ).subscribe(() => this.snackVisibility = 'hidden')
  }

}
