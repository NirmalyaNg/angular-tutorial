import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  messages = ['Hii', 'Hello', 'Bye', 'See ya !!'];
  constructor() {}

  ngOnInit(): void {}
}
