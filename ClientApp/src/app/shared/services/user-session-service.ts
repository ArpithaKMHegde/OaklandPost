import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { IUser } from 'src/app/models/user';

@Injectable({
    providedIn: 'root'
})
export class UserSessionService {
    private state: IUserSessionState = {};
    private user$: Subject<IUser | null> = new Subject<IUser | null>();

    constructor(private _router: Router) {
        let storedUser = sessionStorage.getItem("user");
        if (storedUser) {
            let user = JSON.parse(storedUser);
            this.state.user = user;
            this.user$.next(user);
        }
    }

    setSignedInUser(user: IUser) {
        this.state.user = user;
    }

    getSignedInUser() {
        return this.state?.user;
    }

    redirectUserToSignIn(returnUrl: string) {
        this.state.redirectUri = returnUrl;
        this._router.navigateByUrl('/sign-in');
    }

    setSignedInUserAndRedirect(user: IUser, overrideReturnUrl: string | null = null): void {
        if (overrideReturnUrl) {
            this.state.redirectUri = overrideReturnUrl;
        }

        this.state.user = user;
        sessionStorage.setItem("user", JSON.stringify(user));
        if (this.state.redirectUri) {
            const route = this.state.redirectUri;
            this.state.redirectUri = undefined;
            this._router.navigateByUrl(route);
        }
        else {
            this._router.navigateByUrl('/');
        }

        this.user$.next(user);
    }

    logoutUserAndRedirect() {
        sessionStorage.removeItem("user");
        this.state = {};
        this._router.navigateByUrl('');
        this.user$.next(null);
    }

    userChange(): Observable<IUser | null> {
        return this.user$.asObservable();
    }
}

interface IUserSessionState {
    user?: IUser;
    redirectUri?: string;
}
