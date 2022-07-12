import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  public enteredTitle: string;
  public enteredDescription: string;
  public enteredAuthor: string;
  @Output() public postAdd = new EventEmitter<{
    title: string;
    description: string;
    author: string;
    id: string;
  }>();

  constructor() {}

  ngOnInit(): void {}

  handleSubmit() {
    this.postAdd.emit({
      id: Math.random().toString(),
      title: this.enteredTitle,
      author: this.enteredAuthor,
      description: this.enteredDescription,
    });
  }
}
