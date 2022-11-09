import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

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
  error: string = null;
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
    // Deprecated

    // this.postsService
    //   .addPost(this.postTitle, this.postDescription)
    //   .subscribe(() => {
    //     this.postTitle = '';
    //     this.postDescription = '';
    //   }, () => {});
    this.error = null;
    this.postsService.addPost(this.postTitle, this.postDescription).subscribe({
      next: () => {
        this.postTitle = '';
        this.postDescription = '';
      },
      error: (e: HttpErrorResponse) => {
        this.error = e.error.errorMessage;
      },
      // complete: () => {}
    });
  }

  handleDeletePost(id: string) {
    this.postsService.deletePost(id);
  }

  handleTestRequest() {
    this.postsService.getTestData();
  }
}
