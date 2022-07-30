import { Component, OnInit } from '@angular/core';
import { Server } from './server/server.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  servers: Server[] = [];

  ngOnInit(): void {
    this.servers = [
      {
        id: 's1',
        name: 'Server 1',
        status: 'online',
      },
      {
        id: 's2',
        name: 'Server 2',
        status: 'offline',
      },
      {
        id: 's3',
        name: 'Server 3',
        status: 'disabled',
      },
    ];
  }

  addServer(server: Server) {
    this.servers.push(server);
  }

  deleteServer(id: string) {
    this.servers = this.servers.filter((server) => {
      return server.id !== id;
    });
  }
}
