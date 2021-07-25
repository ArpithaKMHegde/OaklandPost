import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { LoginService } from 'src/app/shared/services/user-login-service';
import { UserSessionService } from 'src/app/shared/services/user-session-service';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.scss']
})
export class ClientUserAccountComponent implements OnInit {

  _hide = true;
  private _user?: IUser = {} as IUser;
  _email?= '';
  _firstName?= '';
  _lastName?= '';
  _password?= '';

  constructor(private _userSessionService: UserSessionService, private _loginService: LoginService, private _router: Router) { }

  ngOnInit(): void {
    this._user = this._userSessionService.getSignedInUser();
    this._email = this._user?.email;
    this._firstName = this._user?.firstName;
    this._lastName = this._user?.lastName;
    this._password = this._user?.password;
  }

  updateAccountInfo(): void {
    const accountInfo = {
      id: this._user?.id,
      email: this._email,
      firstName: this._firstName,
      lastName: this._lastName,
      password: this._password
    } as IUser

    this._loginService.updateAccountInfo(accountInfo).subscribe(() => {
      this._userSessionService.setSignedInUser(accountInfo);
      this._router.navigateByUrl("/");
    });
  }
}
