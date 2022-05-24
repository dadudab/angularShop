import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  userProducts: Product[];

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels: Label[] = ['Home products', 'Garden products', 'asdij qwjd '];
  public pieChartData: SingleDataSet = [2, 6, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array <any> = [{
    backgroundColor: ['red', 'yellow']
  }];

  constructor(private route: ActivatedRoute) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
    this.userProducts = this.route.snapshot.data.userProducts;
    console.log(this.userProducts);
  }

  
}
