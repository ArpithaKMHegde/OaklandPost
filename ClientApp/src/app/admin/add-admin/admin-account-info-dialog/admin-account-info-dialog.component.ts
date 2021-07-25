import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WarningDialogComponent } from 'src/app/client/client-package-selection/warning-dialog/warning-dialog.component';
import { IUserRegistration } from 'src/app/models/user-registration';
import { UserAdPackageStore } from 'src/app/shared/services/user-package-store';
import { UserRegistrationService } from 'src/app/shared/services/user-registration-service';

@Component({
  selector: 'app-admin-account-info-dialog',
  templateUrl: './admin-account-info-dialog.component.html',
  styleUrls: ['./admin-account-info-dialog.component.scss']
})
export class AdminAccountInfoDialogComponent implements OnInit {

  hide = true;
  _email = '';
  _firstName = '';
  _lastName = '';
  _password = '';
  private dialogRef: any;

  constructor(
    dialogRef: MatDialogRef<WarningDialogComponent>,
    private _userRegistrationService: UserRegistrationService) {
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
  }

  addAdmin(): void {
    const userInfo = {
      firstName: this._firstName,
      lastName: this._lastName,
      email: this._email,
      password: this._password,
      isAdmin: true
    } as IUserRegistration

    this._userRegistrationService.registerUser(userInfo).subscribe();
    this.dialogRef.close();
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
