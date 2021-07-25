import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserRegistration } from '../models/user-registration';
import { UserRegistrationService } from '../shared/services/user-registration-service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  hide = true;
  constructor(
    private fb: FormBuilder,
    private _userRegistrationService: UserRegistrationService,
    private _snackBar: MatSnackBar,
    private router: Router) { }

  public viewModel: IViewModel = {} as IViewModel;

  ngOnInit(): void {
    this.formModel.reset();
  }

  formModel = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    Emails: this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      confirmEmail: ['', [Validators.required, Validators.email]],
    }, { validators: this.compareEmails }),
    Passwords: this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validators: this.comparePasswords })
  })

  comparePasswords(fb: FormGroup) {
    let confirmPswrdCtrl = fb.get('confirmPassword');
    if (confirmPswrdCtrl!.errors == null || 'passwordMismatch' in confirmPswrdCtrl!.errors) {
      if (fb.get('password')!.value != confirmPswrdCtrl!.value)
        confirmPswrdCtrl!.setErrors({ passwordMismatch: true });
      else
        confirmPswrdCtrl!.setErrors(null)
    }
  }

  compareEmails(fb: FormGroup) {
    let confirmEmailCtrl = fb.get('confirmEmail');
    if (confirmEmailCtrl!.errors == null || 'emailMismatch' in confirmEmailCtrl!.errors) {
      if (fb.get('email')!.value != confirmEmailCtrl!.value)
        confirmEmailCtrl!.setErrors({ emailMismatch: true });
      else
        confirmEmailCtrl!.setErrors(null)
    }
  }

  submitUser() {
    const user = {
      firstName: this.formModel.value.firstName,
      lastName: this.formModel.value.lastName,
      email: this.formModel.value.Emails.email,
      password: this.formModel.value.Passwords.password
    } as IUserRegistration

    this._userRegistrationService.registerUser(user).subscribe(
      (userRecord) => {
        if (userRecord.alreadyExists) {
          this._snackBar.open("Account already exists with the email provided");
        } else {
          this.router.navigateByUrl('/sign-in');
        }
      },
      () => { })
  }
}

interface IViewModel {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
