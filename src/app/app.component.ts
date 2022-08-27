import { Component, OnInit } from '@angular/core';
import { ServerService } from './server/server.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private serverService: ServerService) {}
  ngOnInit() {
    this.serverService.serviceEvent.subscribe(() => {
      console.log('Subscription called in App Component');
    });
  }

  onHandleEvent() {
    console.log(
      'Inside app executing due to event emitted in grandchild(server)'
    );
  }
}
