import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/order.model';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit {

  userOrders: Order[];

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userOrders = this.route.snapshot.data.userOrders;
    console.log(this.userOrders);
  }

}
