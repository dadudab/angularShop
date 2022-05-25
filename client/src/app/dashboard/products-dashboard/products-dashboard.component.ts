import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartColor, ChartOptions, ChartType } from 'chart.js';
import { Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip, SingleDataSet } from 'ng2-charts';
import { Product } from 'src/app/shared/product.model';

@Component({
  selector: 'app-products-dashboard',
  templateUrl: './products-dashboard.component.html',
  styleUrls: ['./products-dashboard.component.css']
})
export class ProductsDashboardComponent implements OnInit {

  userProducts: Product[];
  categoriesStats;
  gardenProducts = 0;
  homeProducts = 0;
  carsProducts = 0;
  electronicProducts = 0;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };
  public pieChartLabels: Label[] = ['Home products', 'Garden products', 'Cars products', 'Electronic products'];
  public pieChartData: SingleDataSet;
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  public pieChartColors: Array <any> = [{
    backgroundColor: ['red', 'yellow', 'pink', 'green']
  }];
  
  constructor(private route: ActivatedRoute, private router: Router) { 
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }
  
  ngOnInit(): void {
    this.userProducts = this.route.snapshot.data.userProducts;
    this.categoriesStats = this.route.snapshot.data.categoriesStats;
    if(this.categoriesStats) {
      this.pieChartData = [
        this.categoriesStats.homeProducts,
        this.categoriesStats.gardenProducts,
        this.categoriesStats.carsProducts,
        this.categoriesStats.electronicProducts
      ];
    }
  }
}
