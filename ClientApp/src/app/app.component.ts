import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from './models/user';
import { UserSessionService } from './shared/services/user-session-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  public userType: UserType = "anonymous";
  public _isUserSignedIn = false;
  public _userInfo: IUser = { id: '', firstName: '', lastName: '', email: '' } as IUser;

  constructor(private userSessionService: UserSessionService, private router: Router) { }

  ngOnInit() {
    this.setupNavigation();
    this.userSessionService.userChange().subscribe(x => {
      this.refreshValues();
    });
    this.refreshValues();
  }
  refreshValues() {
    this.checkIfUserIsSignedIn();
    this.setupNavigation();
    this.showUserInfo();
  }

  setupNavigation() {
    const user = this.userSessionService.getSignedInUser();
    if (user != undefined) {
      if (user.admin) {
        this.userType = "admin";
      }
      else {
        this.userType = "client";
      }
    }
    else {
      this.userType = "anonymous";
    }
  }

  checkIfUserIsSignedIn(): void {
    if (this.userSessionService.getSignedInUser() != undefined) {
      this._isUserSignedIn = true;
      this.showUserInfo();
    } else {
      this._isUserSignedIn = false;
    }
  }

  directUserToSignIn(): void {
    this.userSessionService.redirectUserToSignIn(this.router.url);
  }

  showUserInfo(): void {
    const signedInUser = this.userSessionService.getSignedInUser();

    if (!signedInUser) {
      this._userInfo = {} as IUser;
      return;
    }

    this._userInfo.id = signedInUser.id;
    this._userInfo.firstName = signedInUser.firstName;
    this._userInfo.lastName = signedInUser.lastName;
    this._userInfo.email = signedInUser.email;
    this._userInfo.admin = signedInUser.admin;
  }

  navigateToAccount(): void {
    if (this.userType === 'admin') {
      this.router.navigateByUrl('/admin-account');
    } else if (this.userType === 'client') {
      this.router.navigateByUrl('/client-account');
    }
  }

  navigateToSettings(): void {
    this.router.navigateByUrl('/add-admin');
  }

  logout(): void {
    this.userSessionService.logoutUserAndRedirect();
    this.refreshValues();
  }
}

export type UserType = "anonymous" | "client" | "admin";
