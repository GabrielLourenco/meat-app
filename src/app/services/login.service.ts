import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";
import 'rxjs/add/operator/do';
import { MEAT_API } from '../app.api'
import { User } from '../models/user.model'
import { Router } from "@angular/router";


@Injectable()
export class LoginService {

    public user: User

    constructor(private http: HttpClient, private router: Router) {}

    public isLoggedIn(): boolean {
        return this.user !== undefined;
    }

    public login(email: string, password: string): Observable<User> {
        return this.http.post<User>(`${MEAT_API}/login`, {email: email, password: password})
            .do(user => this.user = user)
    }

    public handleLogin(path?: string): void {
        this.router.navigate(['/login', btoa(path)]);
    }

}