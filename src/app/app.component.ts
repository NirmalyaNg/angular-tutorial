import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  products = [
    {
      id: 'p1',
      name: 'Samsung Phone',
      price: '12.99',
      description: 'This is Samsung Phone',
    },
    {
      id: 'p2',
      name: 'Nokia Phone',
      price: '10.50',
      description: 'This is Nokia Phone',
    },
    {
      id: 'p3',
      name: 'Oppo Phone',
      price: '20.00',
      description: 'This is an Oppo Phone',
    },
    {
      id: 'p4',
      name: 'Vivo Phone',
      price: '13.45',
      description: 'This is a Vivo Phone',
    },
  ];

  handleProductSelection() {
    console.log('handleProductSelection method called in app component');
  }
}
