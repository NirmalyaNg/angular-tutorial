import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient } from '@angular/common/http';

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
  constructor(private postsService: PostsService, private http: HttpClient) {}

  ngOnInit(): void {}

  handleFetchPosts() {
    // This returns an Observable. We need to subscribe to that observable to get the response
    this.isFetching = true;
    this.postsService.fetchPosts().subscribe((res) => {
      this.isFetching = false;
      this.posts = res.posts;
    });
  }

  handleAddPost() {
    this.postsService
      .addPost(this.postTitle, this.postDescription)
      .subscribe(() => {
        this.postTitle = '';
        this.postDescription = '';
      });
  }
}
