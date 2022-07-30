import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Server } from '../server/server.model';

@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css'],
})
export class NewServerComponent implements OnInit {
  // serverName: string;
  // serverStatus: string;
  @ViewChild('serverNameInput') serverNameElement: ElementRef;
  @ViewChild('serverStatusInput') serverStatusElement: ElementRef;
  // serverAdded = new EventEmitter<{id: string, name: string, status: string}>();
  @Output() serverAdded = new EventEmitter<Server>();

  constructor() {}

  ngOnInit(): void {}

  handleServerCreate() {
    const newServer = {
      id: Math.random().toString(),
      name: this.serverNameElement.nativeElement.value,
      status: this.serverStatusElement.nativeElement.value,
    };
    this.serverAdded.emit(newServer);
  }
}
