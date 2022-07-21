import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css'],
})
export class ChildComponent implements OnChanges {
  @Input() data1: string;
  @Input() data2: string;

  @Output() change1 = new EventEmitter<void>();
  @Output() change2 = new EventEmitter<void>();

  constructor() {
    console.log('Child component constructor called');
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Child component ngOnChanges called');
    console.log('Changes: ', changes);
  }

  handleChange1() {
    this.change1.emit();
  }

  handleChange2() {
    this.change2.emit();
  }
}
