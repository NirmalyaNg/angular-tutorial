import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-pipe',
  templateUrl: './custom-pipe.component.html',
  styleUrls: ['./custom-pipe.component.css'],
})
export class CustomPipeComponent implements OnInit {
  names: String[] = [
    'Nirmalya',
    'Sampriti',
    'Pubai',
    'Tomai',
    'Mobai',
    'Motu1',
    'Motu2',
  ];
  filterText = '';
  constructor() {}

  ngOnInit(): void {}
}
