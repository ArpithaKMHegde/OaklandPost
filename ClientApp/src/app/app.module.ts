import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DbTestViewComponent } from './db-test-view/db-test-view.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ReactiveFormsModule } from '@angular/forms';
import { ClientPackageSelectionComponent } from './client/client-package-selection/client-package-selection.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { SignInComponent } from './sign-in/sign-in.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AdminAdReviewsListViewComponent } from './admin/admin-ad-reviews-list/admin-ad-reviews-list.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { AdminSetupPackageComponent } from './admin/admin-setup-package/admin-setup-package.component';
import { FormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminAdReviewComponent } from './admin/admin-ad-review/admin-ad-review.component';
import { AdminPackageSelectionComponent } from './admin/admin-package-selection/admin-package-selection.component';
import { ClientCheckoutComponent } from './client/client-checkout/client-checkout.component';
import { MatRadioModule } from '@angular/material/radio'
import { FileUploadInputComponent } from './shared/components/file-upload-input/file-upload-input.component';
import { ClientSetupAdViewComponent } from './client/client-setup-ad-view/client-setup-ad-view.component';
import { MyAdsComponent } from './client/my-ads/my-ads.component';
import { MatMenuModule } from '@angular/material/menu';
import { ClientPackageOverviewComponent } from './client/client-package-overview/client-package-overview.component';
import { ClientViewAdsViewComponent } from './client/client-view-ads-view/client-view-ads-view.component';
import { AdminViewConfirmedAdDetailsComponent } from './admin/admin-view-confirmed-ad-details/admin-view-confirmed-ad-details.component';
import { ClientSetupInsertViewComponent } from './client/client-setup-insert-view/client-setup-insert-view.component';
import { MatDialogModule } from '@angular/material/dialog';
import { WarningDialogComponent } from './client/client-package-selection/warning-dialog/warning-dialog.component';
import { HomeComponent } from './home/home.component';
import { UserAccountComponent } from './admin/user-account/client-user-account.component';
import { ClientUserAccountComponent } from './client/user-account/user-account.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';
import { AdminAccountInfoDialogComponent } from './admin/add-admin/admin-account-info-dialog/admin-account-info-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    DbTestViewComponent,
    ClientPackageSelectionComponent,
    SignInComponent,
    SignUpComponent,
    ClientSetupAdViewComponent,
    FileUploadInputComponent,
    MyAdsComponent,
    AdminAdReviewsListViewComponent,
    UserComponent,
    RegistrationComponent,
    AdminAdReviewComponent,
    AdminSetupPackageComponent,
    AdminPackageSelectionComponent,
    ClientCheckoutComponent,
    ClientPackageOverviewComponent,
    ClientViewAdsViewComponent,
    AdminViewConfirmedAdDetailsComponent,
    ClientSetupInsertViewComponent,
    WarningDialogComponent,
    HomeComponent,
    UserAccountComponent,
    ClientUserAccountComponent,
    AddAdminComponent,
    AdminAccountInfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatInputModule,
    MatMomentDateModule,
    MatRadioModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatGridListModule,
    MatDialogModule,
  ],
  providers: [MatSnackBar, UserService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
