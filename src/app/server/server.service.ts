import { EventEmitter } from '@angular/core';
import { Server } from '../models/server.model';

export class ServerService {
  public serviceEvent = new EventEmitter<void>();
  public serversDataModified = new EventEmitter<Server[]>();

  public servers: Server[] = [
    { id: 's1', name: 'Server 1', status: 'online' },
    { id: 's2', name: 'Server 2', status: 'online' },
  ];

  public getServers() {
    return this.servers.slice();
  }

  public addServer(name: string, status: string) {
    this.servers.push({
      id: Math.random().toString(),
      name: name,
      status: status,
    });
    this.serversDataModified.emit(this.servers.slice());
  }

  public changeServerStatus(id: string, newStatus: string) {
    const srv = this.servers.find((server) => server.id === id);
    srv.status = newStatus;
  }

  public deleteServer(id: string) {
    console.log('Heeeeee');
    this.servers = this.servers.filter((server) => {
      return server.id !== id;
    });
    this.serversDataModified.emit(this.servers.slice());
  }
}
