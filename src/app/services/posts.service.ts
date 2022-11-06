import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { FetchPostsResponse } from '../models/fetch-posts-response';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  public fetchPosts() {
    // this.isFetching = true;
    return this.http
      .get<FetchPostsResponse>('http://localhost:3000/posts')
      .pipe(
        map((res) => {
          const postsArray = [];
          for (let key in res) {
            postsArray.push({
              ...res[key],
              _id: key,
            });
          }
          return {
            posts: postsArray,
          };
        })
      );
    // .subscribe((res) => {
    //   // this.isFetching = false;
    //   // this.posts = res.posts;
    // });
  }

  public addPost(title: string, description: string) {
    return this.http.post<Post>('http://localhost:3000/posts', {
      title: title,
      description: description,
    });
    // .subscribe((res) => {
    //   this.postTitle = '';
    //   this.postDescription = '';
    // });
  }
}
