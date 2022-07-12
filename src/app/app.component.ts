import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  public listOfPosts = [
    {
      id: 'p1',
      title: 'Post 1',
      description: 'This is Post 1',
      author: 'Nirmalya Ganguly',
    },
    {
      id: 'p2',
      title: 'Post 1',
      description: 'This is Post 2',
      author: 'Sampriti Ganguly',
    },
  ];

  public addPost(newPost: any) {
    this.listOfPosts.push(newPost);
  }
}
