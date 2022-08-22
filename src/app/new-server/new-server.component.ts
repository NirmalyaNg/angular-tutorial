import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ServerService } from '../server/server.service';

@Component({
  selector: 'app-new-server',
  templateUrl: './new-server.component.html',
  styleUrls: ['./new-server.component.css'],
})
export class NewServerComponent implements OnInit {
  @ViewChild('nameInput') serverNameInput: ElementRef;
  @ViewChild('statusInput') serverStatusInput: ElementRef;

  constructor(private serverService: ServerService) {}

  ngOnInit(): void {}

  handleServerAdd() {
    const name = this.serverNameInput.nativeElement.value;
    const status = this.serverStatusInput.nativeElement.value;

    this.serverService.addServer(name, status);
  }
}
