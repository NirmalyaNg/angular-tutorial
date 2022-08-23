import { Server } from '../models/server.model';

export class ServerService {
  public servers: Server[] = [
    { id: 's1', name: 'Server 1', status: 'online' },
    { id: 's2', name: 'Server 2', status: 'online' },
  ];

  public getServers() {
    // return this.servers.slice();
    return this.servers;
  }

  public addServer(name: string, status: string) {
    this.servers.push({
      id: Math.random().toString(),
      name: name,
      status: status,
    });
  }

  public changeServerStatus(id: string, newStatus: string) {
    const srv = this.servers.find((server) => server.id === id);
    srv.status = newStatus;
  }
}
