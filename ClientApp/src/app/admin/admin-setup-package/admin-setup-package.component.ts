import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IPackage } from 'src/app/models/package';
import { IPackageInsert } from 'src/app/models/package-insert';
import { PackageListService } from 'src/app/shared/services/package-list.service';

@Component({
  selector: 'app-admin-setup-package',
  templateUrl: './admin-setup-package.component.html',
  styleUrls: ['./admin-setup-package.component.scss']
})
export class AdminSetupPackageComponent implements OnInit {
  timeLength = '';
  unitOfTime = "";
  fullInsertsAmount = 0;
  halfInsertsAmount = 0;
  quarterInsertsAmount = 0;
  eigthInsertsAmount = 0;

  package = {
    title: '',
    description: '',
    isColor: false,
    timeLength: 0,
    price: 0,
    unitOfTime: '',
    inserts: [] = [],
    id: ""
  } as IPackage

  constructor(private packageListService: PackageListService, private router: Router) { }

  ngOnInit(): void {
  }

  titleChanged(event: any) {
    this.package.title = event.currentTarget.value;
  }

  colorChanged(event: any) {
    this.package.isColor = event.checked;
  }

  fullSizeChanged(event: any) {
    const insert = {
      pageType: 'Full-Page'
    } as IPackageInsert
    this.package.inserts.push(insert);
  }

  halfSizeChanged(event: any) {
    const insert = {
      pageType: 'Half-Page'
    } as IPackageInsert
    this.package.inserts.push(insert);
  }

  quarterSizeChanged(event: any) {
    const insert = {
      pageType: 'Quarter-Page'
    } as IPackageInsert
    this.package.inserts.push(insert);
  }

  eigthSizeChanged(event: any) {
    const insert = {
      pageType: 'Eighth-Page'
    } as IPackageInsert
    this.package.inserts.push(insert);
  }

  radioChange(event: any) {
    if (event.value == 1) {
      this.unitOfTime = "Days";
    }
    else {
      this.unitOfTime = "Weeks";
    }
  }

  lengthOfTimeChange(time: any) {
    this.timeLength = time.target.value;
  }

  priceChanged(event: any) {
    this.package.price = event.currentTarget.value;
  }

  submitPackage() {
    this.package.unitOfTime = this.unitOfTime;
    this.package.timeLength = parseInt(this.timeLength);

    let inserts: IPackageInsert[] = [];
    const packageInfo = {
      title: this.package.title,
      description: this.package.description,
      isColor: this.package.isColor,
      timeLength: this.package.timeLength,
      price: this.package.price,
      unitOfTime: this.package.unitOfTime,
      inserts: this.addInserts(inserts)
    } as IPackage
    this.packageListService.submitPackage(packageInfo).subscribe(() => {
      this.router.navigateByUrl("/admin-package-selection");
    });
  }

  addInserts(inserts: IPackageInsert[]): IPackageInsert[] {
    const fullInsert = {
      pageType: 'Full-Page'
    } as IPackageInsert
    for (let i = 0; i < this.fullInsertsAmount; i++) {
      inserts.push(fullInsert);
    }

    const halfInsert = {
      pageType: 'Half-Page'
    } as IPackageInsert
    for (let i = 0; i < this.halfInsertsAmount; i++) {
      inserts.push(halfInsert);
    }

    const quarterInsert = {
      pageType: 'Quarter-Page'
    } as IPackageInsert
    for (let i = 0; i < this.quarterInsertsAmount; i++) {
      inserts.push(quarterInsert);
    }

    const eigthInsert = {
      pageType: 'Eighth-Page'
    } as IPackageInsert
    for (let i = 0; i < this.eigthInsertsAmount; i++) {
      inserts.push(eigthInsert);
    }

    return inserts;
  }
}
