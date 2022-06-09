import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { take, tap } from 'rxjs/operators';
import { CartService } from 'src/app/cart/cart.service';
import { OrderService } from 'src/app/dashboard/order.service';

declare var paypal;

@Component({
  selector: 'app-paypal',
  templateUrl: 'paypal.component.html',
  styleUrls: ['./paypal.component.css']
})
export class PaypalComponent implements OnInit {

  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @Input() amount: number;
  @Input() orderData: Object;
  // paidFor = false;

  constructor(
    private orderService: OrderService, 
    private router: Router, 
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    console.log(this.orderData);
    console.log(this.amount);
    paypal
    .Buttons({
      createOrder: (data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: this.amount.toFixed(2),
              }
            }
          ]
        })
      },
      onApprove: async (data, actions) => {
        this.orderService.createOrder(this.orderData).subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error);
          throw Error('cant create order byczq');
        })
        this.cartService.getCart().subscribe(res => {
          console.log(res);
        }, error => {
          console.log(error);
        })
        

        // throw Error('cannot create order');

        const order = await actions.order.capture();
        this.router.navigate(['/dashboard/my-orders']);

        // this.paidFor = true;
        // console.log(order);
      },
      onError: err => {
        console.log(err);
      }
    })
    .render(this.paypalElement.nativeElement);
  }


}
