import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { IUserLogin } from '../models/user-login';
import { LoginService } from '../shared/services/user-login-service';
import { UserSessionService } from '../shared/services/user-session-service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  email: String = '';
  password: String = '';
  hide = true;
  constructor(private router: Router, private loginService: LoginService, private _userSessionService: UserSessionService) { }

  ngOnInit(): void {
  }

  checkCredentialsAndProceed(): void {
    const user = {
      email: this.email,
      password: this.password
    } as IUserLogin

    this.loginService.login(user).subscribe(userRecord => {
      if (userRecord.alreadyExists) {
        const userAccount = {
          email: userRecord.userAccount.email,
          firstName: userRecord.userAccount.firstName,
          lastName: userRecord.userAccount.lastName,
          id: userRecord.userAccount.id,
          password: userRecord.userAccount.password,
          admin: userRecord.userAccount.isAdmin
        } as IUser

        if (userRecord.userAccount.isAdmin) {
          this._userSessionService.setSignedInUserAndRedirect(userAccount, '/admin-package-selection');
        } else {
          this._userSessionService.setSignedInUserAndRedirect(userAccount);
        }
      } else {
        alert('A record does not exist matching the given email, try creating a new account!');
      }
    },
      () => { })
  }

  navigateToSignUp(): void {
    this.router.navigateByUrl('/sign-up');
  }
}
