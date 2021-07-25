import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { IPackage } from 'src/app/models/package';
import { IUserAdPackageTime, AdUnitOfTime } from 'src/app/models/user-ad-package';
import { UserAdPackageStore } from 'src/app/shared/services/user-package-store';

@Component({
  selector: 'app-warning-dialog',
  templateUrl: './warning-dialog.component.html',
  styleUrls: ['./warning-dialog.component.scss']
})
export class WarningDialogComponent implements OnInit {

  packageType: any;
  private dialogRef: any;

  constructor(
    dialogRef: MatDialogRef<WarningDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router,
    private userPackageStore: UserAdPackageStore) {
    this.packageType = data;
    this.dialogRef = dialogRef;
  }

  ngOnInit(): void {
  }

  choosePackage() {
    this.savePackage(this.data.package);
    this.dialogRef.close();
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

  closeDialog() {
    this.dialogRef.close();
  }
}
