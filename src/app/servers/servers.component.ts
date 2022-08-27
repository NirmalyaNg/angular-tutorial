import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Server } from '../models/server.model';
import { ServerService } from '../server/server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css'],
  // providers: [ServerService],
})
export class ServersComponent implements OnInit {
  listOfServers: Server[] = [];
  serverService: ServerService; // This property stores an object of ServerService class
  @Output() testEvent2 = new EventEmitter<void>();

  // In the constructor you mention which service object u need and angular will inject it for u
  /*
  class A {
    name: string;
    age: number;

    constructor(name: string, age: number) {
      this.name = name;
      this.age = age;
    }
  }

  aObj = new A("Sampriti", 23)
  */

  constructor(serverService: ServerService) {
    //  here this.serverService contains the object of ServerService class
    this.serverService = serverService;
  }

  // constructor(private serverService: ServerService) {}

  ngOnInit(): void {
    // const serverServiceObject = new ServerService();    !!!!!!! WRONG WAY OF USING A SERVICE !!!!!!!
    // this.listOfServers = serverServiceObject.getServers(); !!!!!!! WRONG WAY OF USING A SERVICE !!!!!!!
    console.log('Called');
    this.listOfServers = this.serverService.getServers();

    this.serverService.serviceEvent.subscribe(() => {
      console.log('Subscription called in servers component');
    });

    this.serverService.serversChanged.subscribe((servers: Server[]) => {
      this.listOfServers = servers;
    });
  }

  testMethodParent() {
    console.log('Executing due to child event inside parent');
    this.testEvent2.emit();
  }
}
