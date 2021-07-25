import { Component, OnInit } from '@angular/core';
import { ITestModel } from '../models/test-model';
import { DbTestService } from './db-test.service';

@Component({
  selector: 'app-db-test-view',
  templateUrl: './db-test-view.component.html',
  styleUrls: ['./db-test-view.component.scss']
})
export class DbTestViewComponent implements OnInit {

  public testData: ITestModel[] = [];

  constructor(private dbTestService: DbTestService) { }

  ngOnInit(): void {
  }

  getTestData() {
    this.dbTestService.getTestData().subscribe(result => this.testData = result);
  }

}
