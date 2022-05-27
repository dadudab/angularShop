import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  userSub: Subscription;
  user: User;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels: Label[] = ['Home products', 'Garden products', 'Cars products', 'Electronic products'];
  public pieChartData: SingleDataSet = [1, 2, 3, 4];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array <any> = [{
    backgroundColor: ['red', 'yellow', 'pink', 'green']
  }];

  constructor(private authService: AuthService) {
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
   }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
