import { CanLoad, Route, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { LoginService } from 'app/services/login.service';

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {

    constructor(private loginService: LoginService) {}

    public checkAuthentication(path: string): boolean {
        const loggedIn = this.loginService.isLoggedIn()
        if (!loggedIn) {
            this.loginService.handleLogin(`/${path}`)
        }
        return loggedIn
    }

    /* rotas com loadChildren decidir se o módulo a ser carregado pode ser realmente carregado */
    public canLoad(route: Route): boolean {
        return this.checkAuthentication(route.path)
    }

    public canActivate(activatedRoute: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean {
        return this.checkAuthentication(activatedRoute.routeConfig.path)
    }
}