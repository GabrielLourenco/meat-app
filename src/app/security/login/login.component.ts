import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'app/services/login.service';
import { NotificationService } from 'app/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public navigateTo: string

  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  })

  constructor(
    private loginService: LoginService,
    private notificationService: NotificationService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.navigateTo = this.activatedRoute.snapshot.params['to'] || btoa('/');
  }

  public login(): void {
    this.loginService.login(this.loginForm.value.email, this.loginForm.value.password)
      .subscribe( user => this.notificationService.notify(`Bem vindo, ${user.name}`),
                  response => this.notificationService.notify(response.error.message),
                  () => this.router.navigate([ atob(this.navigateTo) ]))
  }

}
