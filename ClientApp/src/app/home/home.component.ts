import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { WarningDialogComponent } from '../client/client-package-selection/warning-dialog/warning-dialog.component';
import { IPackage } from '../models/package';
import { IUserAdPackageTime, AdUnitOfTime } from '../models/user-ad-package';
import { ClientCartService } from '../shared/services/client-cart.service';
import { PackageListService } from '../shared/services/package-list.service';
import { UserAdPackageStore } from '../shared/services/user-package-store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  viewModel: IViewModel = {} as IViewModel;

  constructor(
    private clientCartService: ClientCartService,
    private packageListService: PackageListService,
    private router: Router,
    private viewportScroller: ViewportScroller,
    private userPackageStore: UserAdPackageStore,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.packageListService.getListOfPackages().subscribe(packageList => {
      this.viewModel.packages = packageList.packageList.map(x => {
        let fullInsertsAmount = 0;
        let halfInsertsAmount = 0;
        let quarterInsertsAmount = 0;
        let eighthInsertsAmount = 0;

        for (let insert of x.inserts) {
          switch (insert.pageType) {
            case 'Full-Page':
              fullInsertsAmount++;
              break;
            case 'Half-Page':
              halfInsertsAmount++;
              break;
            case 'Quarter-Page':
              quarterInsertsAmount++;
              break;
            case 'Eighth-Page':
              eighthInsertsAmount++;
              break;
          }
        }

        return {
          ...x,
          fullInsertsAmount: fullInsertsAmount,
          halfInsertsAmount: halfInsertsAmount,
          quarterInsertsAmount: quarterInsertsAmount,
          eighthInsertsAmount: eighthInsertsAmount
        } as IPackageList
      });
    })
  }

  navigateToPackageSelection(): void {
    this.router.navigateByUrl('/client-checkout');
  }

  addPackageToCart(packageType: IPackage): void {
    this.clientCartService.addToCart(packageType);
  }

  navigateToClientSetupAd(): void {
    this.router.navigateByUrl('/client-setup-ad');
  }

  navigateToMyAds(): void {
    this.router.navigateByUrl('/my-ads');
  }

  openWarningDialog(packageType: IPackage) {
    if (this.userPackageStore.getPackageForUser() === undefined) {
      this.choosePackage(packageType);
    } else {
      this.dialog.open(WarningDialogComponent, { data: { package: packageType } });
    }
  }

  public scroll(elementId: string): void {
    this.viewportScroller.scrollToAnchor(elementId);
  }

  choosePackage(packageType: IPackage) {
    this.savePackage(packageType);
    this.router.navigateByUrl('/client-package-overview');
  }

  savePackage(adPackage: IPackage) {
    let time: IUserAdPackageTime = {
      length: adPackage.timeLength,
      unitOfTime: <AdUnitOfTime>adPackage.unitOfTime,
    }

    this.userPackageStore.setPackageForUser({
      color: adPackage.isColor,
      inserts: adPackage.inserts,
      time: time,
      description: adPackage.description,
      price: adPackage.price,
      title: adPackage.title,
      id: adPackage.id
    });
  }
}

interface IViewModel {
  packages: IPackageList[];
}

interface IPackageList extends IPackage {
  fullInsertsAmount: number;
  halfInsertsAmount: number;
  quarterInsertsAmount: number;
  eighthInsertsAmount: number;
}
