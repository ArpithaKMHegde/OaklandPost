import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/models/user';
import { LoginService } from 'src/app/shared/services/user-login-service';
import { UserSessionService } from 'src/app/shared/services/user-session-service';

@Component({
  selector: 'app-user-account',
  templateUrl: './client-user-account.component.html',
  styleUrls: ['./client-user-account.component.scss']
})
export class UserAccountComponent implements OnInit {

  _hide = true;
  private _user?: IUser = {} as IUser;
  _email?= '';
  _emailValid = false;
  _firstName?= '';
  _firstNameValid = false;
  _lastName?= '';
  _lastNameValid = false;
  _password?= '';
  _passwordValid = false;

  constructor(
    private _userSessionService: UserSessionService,
    private _loginService: LoginService,
    private _router: Router) { }

  ngOnInit(): void {
    this._user = this._userSessionService.getSignedInUser();
    this._email = this._user?.email;
    this._firstName = this._user?.firstName;
    this._lastName = this._user?.lastName;
    this._password = this._user?.password;
  }

  checkForEmailFormat(event: any) {
    var key = event.keyCode;
    if (/([(a-z)(A-Z)(1-9)])+@([(a-z)(A-Z)(1-9)])+\.([(a-z)(A-Z)(1-9)])+/.test(key)) {
      this._emailValid = true;
    } else if (!/([(a-z)(A-Z)(1-9)])+@([(a-z)(A-Z)(1-9)])+\.([(a-z)(A-Z)(1-9)])+/.test(key)) {
      this._emailValid = false;
    }
  }

  checkForNameFormat(event: any, formFieldName: string) {
    var key = event.keyCode;
    if (/^([(A-Z)|(a-z)]*)\s*([(A-Z)|(a-z)]*)\.*$/.test(key)) {
      this.setFormField(formFieldName, true);
    } else if (/^([(A-Z)|(a-z)]*)\s*([(A-Z)|(a-z)]*)\.*$/.test(key)) {
    this.setFormField(formFieldName, true);
    }
  }

  setFormField(formFieldName: string, isValid: boolean) {
    switch (formFieldName) {
      case 'firstName':
        this._firstNameValid = isValid;
        break;
      case 'lastName':
        this._lastNameValid = isValid;
    }
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
