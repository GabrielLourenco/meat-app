import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { LoginService } from "app/services/login.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private loginService: LoginService){}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.loginService.isLoggedIn()){
            const header = {setHeaders: {'Authorization': this.loginService.user.accessToken}};
            const authRequest = request.clone(header);
            return next.handle(authRequest)
        } else {
            return next.handle(request)
        }
    }
}