import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() author: string;
  @Input() id: string;

  constructor() {}

  ngOnInit(): void {}
}
