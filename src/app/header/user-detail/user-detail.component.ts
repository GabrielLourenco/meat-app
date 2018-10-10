import { Component, OnInit } from '@angular/core';
import { LoginService } from 'app/services/login.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'mt-user-detail',
  templateUrl: './user-detail.component.html',
  styles: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  public getUser(): User {
    return this.loginService.user
  }

  public isLoggedIn(): boolean {
    return this.loginService.isLoggedIn()
  }

  public login(): void {
    this.loginService.handleLogin()
  }

  public logout(): void {
    this.loginService.logout()
  }

}
