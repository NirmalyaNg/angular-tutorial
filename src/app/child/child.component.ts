import {
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnInit, OnChanges, DoCheck {
  @Input() data: string;
  isValid: boolean;

  constructor() {
    console.log('Child component constructor called');
  }

  ngOnInit(): void {
    this.isValid = this.data.length > 10 ? true : false;
    console.log('Child component ngOnInit called');
    console.log('isValid: ', this.isValid);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child component ngOnChanges called');
    console.log('Changes: ', changes);
  }

  ngDoCheck(): void {
    console.log('Child Component ngDoCheck called');
  }

  handleClick() {}

  handleChange() {}
}
