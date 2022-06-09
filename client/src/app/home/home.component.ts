import { Component, OnInit, HostBinding } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // trigger('openClose', [
    //   state('open', style({
    //     opacity: 1,
    //     backgroundColor: 'yellow'
    //   })),
    //   state('closed', style({
    //     opacity: 0.8,
    //     backgroundColor: 'blue',
    //   })),
    //   transition('closed => open', [
    //     animate('0.5s')
    //   ]),
    //   transition('open => closed', [
    //     animate('1s')
    //   ])
    // ]),
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)', opacity: 1 })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)', opacity: 0 }),
        animate(500)
      ]),
      // transition('* => void', [
      //   animate(5000, style({ transform: 'translateX(100%)' }))
      // ])
    ])
  ]
})
export class HomeComponent implements OnInit {

  // isOpen = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    // this.isOpen = true;
  }

  // toggleText() {
  //   this.isOpen = !this.isOpen;
  // }

  onNavigateToProducts() {
    this.router.navigate(['/products']);
  }

}
