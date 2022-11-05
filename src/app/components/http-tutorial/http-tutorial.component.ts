import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-http-tutorial',
  templateUrl: './http-tutorial.component.html',
  styleUrls: ['./http-tutorial.component.css'],
})
export class HttpTutorialComponent implements OnInit {
  // We need to inject the HttpClient object in order to send http requests from
  // our Angular App

  postTitle: string;
  postDescription: string;
  posts: Post[] = [];
  isFetching = false;
  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  handleFetchPosts() {
    // This returns an Observable. We need to subscribe to that observable to get the response
    this.isFetching = true;
    this.http.get('http://localhost:3000/posts').subscribe((res: any) => {
      this.isFetching = false;
      this.posts = res.posts;
    });
  }

  handleAddPost() {
    this.http
      .post('http://localhost:3000/posts', {
        title: this.postTitle,
        description: this.postDescription,
      })
      .subscribe(() => {
        this.postTitle = '';
        this.postDescription = '';
      });
  }
}
