import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  // @Input('name') productName: string;
  // @Input('description') productDescription: string;
  // @Input('price') productPrice: string;
  // @Output('select') productSelected = new EventEmitter<void>();
  @Input() productName: string;
  @Input() productDescription: string;
  @Input() productPrice: string;
  @Output() productSelected = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {}

  handleClick() {
    this.productSelected.emit();
  }
}
