import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPackage } from 'src/app/models/package';
import { PackageListService } from '../../shared/services/package-list.service';

@Component({
  selector: 'app-admin-package-selection',
  templateUrl: './admin-package-selection.component.html',
  styleUrls: ['./admin-package-selection.component.scss']
})
export class AdminPackageSelectionComponent implements OnInit {
  viewModel: IViewModel = {} as IViewModel;
  public packageListCutoffSize = false;

  constructor(private packageListService: PackageListService, private router: Router) { }

  ngOnInit(): void {
    this.getPackageList();
  }

  invalidatePackage(packageId: string): void {
    this.packageListService.invalidatePackage(packageId).subscribe(x => {
      this.getPackageList();
    });
  }

  addAPackage(): void {
    this.router.navigateByUrl("/admin-setup-package");
  }

  private getPackageList() {
    this.packageListService.getListOfPackages().subscribe(packageList => {
      if (packageList.packageList.length == 4) {
        this.packageListCutoffSize = true;
      } else {
        this.packageListCutoffSize = false;
      }

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
        } as IPackageList;
      });
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
