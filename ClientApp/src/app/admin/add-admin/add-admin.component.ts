import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IUser } from 'src/app/models/user';
import { UserInfoService } from 'src/app/shared/services/user-info.service';
import { AdminAccountInfoDialogComponent } from './admin-account-info-dialog/admin-account-info-dialog.component';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})
export class AddAdminComponent implements OnInit {

  _adminList: IUser[] = [];

  constructor(
    private userInfoService: UserInfoService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.userInfoService.getAdmins().subscribe(adminList =>
      this._adminList = adminList.adminList
    );
  }

  openAddAdminDialog() {
    let dialogRef = this.dialog.open(AdminAccountInfoDialogComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.ngOnInit();
    });
  }
}
