import { CanLoad, Route } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad {

    constructor(private loginService: LoginService) {}

    /* rotas com loadChildren decidir se o módulo a ser carregado pode ser realmente carregado */
    canLoad(route: Route): boolean {
        const loggedIn = this.loginService.isLoggedIn()

        if (!loggedIn) {
            this.loginService.handleLogin(`/${route.path}`)
        }
        return loggedIn
    }
}