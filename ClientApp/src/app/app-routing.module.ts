import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientSetupAdViewComponent } from './client/client-setup-ad-view/client-setup-ad-view.component';
import { ClientPackageSelectionComponent } from './client/client-package-selection/client-package-selection.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MyAdsComponent } from './client/my-ads/my-ads.component';
import { AdminAdReviewsListViewComponent } from './admin/admin-ad-reviews-list/admin-ad-reviews-list.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserComponent } from './user/user.component';
import { AdminAdReviewComponent } from './admin/admin-ad-review/admin-ad-review.component';
import { AdminSetupPackageComponent } from './admin/admin-setup-package/admin-setup-package.component';
import { AdminPackageSelectionComponent } from './admin/admin-package-selection/admin-package-selection.component';
import { ClientCheckoutComponent } from './client/client-checkout/client-checkout.component';
import { ClientPackageOverviewComponent } from './client/client-package-overview/client-package-overview.component';
import { ClientViewAdsViewComponent } from './client/client-view-ads-view/client-view-ads-view.component';
import { AdminViewConfirmedAdDetailsComponent } from './admin/admin-view-confirmed-ad-details/admin-view-confirmed-ad-details.component';
import { ClientSetupInsertViewComponent } from './client/client-setup-insert-view/client-setup-insert-view.component';
import { HomeComponent } from './home/home.component';
import { ClientLoginAuthGuardService } from './shared/services/client-login-authguard';
import { AdminLoginAuthGuardService } from './shared/services/admin-login-authguard';
import { AnonymousOnlyAuthGuardService } from './shared/services/anonymous-only-authguard';
import { UserAccountComponent } from './admin/user-account/client-user-account.component';
import { BlockAdminAuthGuardService } from './shared/services/block-admin-authguard';
import { ClientUserAccountComponent } from './client/user-account/user-account.component';
import { AddAdminComponent } from './admin/add-admin/add-admin.component';

const routes: Routes = [
  { path: "my-ads", component: MyAdsComponent, canActivate: [ClientLoginAuthGuardService] },
  { path: "package-selection", component: ClientPackageSelectionComponent },
  { path: "client-setup-ad", component: ClientSetupAdViewComponent },
  { path: "client-setup-insert/:id", component: ClientSetupInsertViewComponent, canActivate: [ClientLoginAuthGuardService] },
  { path: "client-view-ads/:id", component: ClientViewAdsViewComponent },
  { path: "client-checkout", component: ClientCheckoutComponent },
  { path: "sign-in", component: SignInComponent, canActivate: [AnonymousOnlyAuthGuardService] },
  { path: "sign-up", component: SignUpComponent },
  { path: "client-package-overview", component: ClientPackageOverviewComponent, canActivate: [BlockAdminAuthGuardService] },
  { path: "client-account", component: ClientUserAccountComponent, canActivate: [BlockAdminAuthGuardService] },
  {
    path: "user", component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent }
    ]
  },
  { path: "admin-ad-reviews-list", component: AdminAdReviewsListViewComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "admin-ad-review/:id", component: AdminAdReviewComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "admin-view-confirmed-ad-details/:id", component: AdminViewConfirmedAdDetailsComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "admin-setup-package", component: AdminSetupPackageComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "admin-package-selection", component: AdminPackageSelectionComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "admin-account", component: UserAccountComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "add-admin", component: AddAdminComponent, canActivate: [AdminLoginAuthGuardService] },
  { path: "", component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
