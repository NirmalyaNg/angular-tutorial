import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ServerService } from './server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  @Input() serverId: string;
  @Input() serverName: string;
  @Input() serverStatus: string;
  @Output() testEvent = new EventEmitter<void>();

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {}

  handleOnlineStatusChange() {
    this.serverService.changeServerStatus(this.serverId, 'online');
  }

  handleOfflineStatusChange() {
    this.serverService.changeServerStatus(this.serverId, 'offline');
  }

  handleDisabledStatusChange() {
    this.serverService.changeServerStatus(this.serverId, 'disabled');
  }

  handleClick() {
    this.testEvent.emit();
  }

  handleClick2() {
    this.serverService.serviceEvent.emit();
  }

  handleDelete() {
    this.serverService.deleteServer(this.serverId);
  }
}
