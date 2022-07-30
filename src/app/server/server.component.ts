import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  @Input() id: string;
  @Input() name: string;
  @Input() status: string;
  @Output() serverDeleted = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}

  getColor() {
    if (this.status === 'online') {
      return 'green';
    }
    if (this.status === 'offline') {
      return 'tomato';
    }
    if (this.status === 'disabled') {
      return 'gray';
    }
  }

  handleDelete() {
    this.serverDeleted.emit(this.id);
  }
}
