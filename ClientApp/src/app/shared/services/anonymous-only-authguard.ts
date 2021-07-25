import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserSessionService } from './user-session-service';

@Injectable({ providedIn: 'root' })
export class AnonymousOnlyAuthGuardService implements CanActivate {
    constructor(public userSessionService: UserSessionService, public router: Router) { }
    canActivate(): boolean {
        const user = this.userSessionService.getSignedInUser()
        if (user) {
            this.router.navigate(['/']);
            return false;
        }
        return true;
    }
}