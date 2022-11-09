import { EventEmitter, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpEventType,
} from '@angular/common/http';
import { BehaviorSubject, map, tap } from 'rxjs';
import { FetchPostsResponse } from '../models/fetch-posts-response';
import { Post } from '../models/post.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  // public testEmitter = new EventEmitter<void>();
  public testSubject = new Subject<string>();
  public testBehaviorSubject = new BehaviorSubject<string>('Default Value');
  constructor(private http: HttpClient) {}

  public fetchPosts() {
    // this.isFetching = true;
    let paramsObj = new HttpParams();
    paramsObj = paramsObj.appendAll({
      key11: 'demo11',
      key22: 'demo22',
      key33: 'demo33',
    });

    let headersObj = new HttpHeaders();
    headersObj = headersObj.append('abc', 'xyz');
    headersObj = headersObj.append('pqr', '123');

    return this.http
      .get<FetchPostsResponse>('http://localhost:3000/posts', {
        params: paramsObj,
        headers: headersObj,
      })
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

  public deletePost(id: string) {
    // this.http
    //   .delete(`http://localhost:3000/posts/${id}`)
    //   .subscribe((data) => {
    //     console.log(data);
    //   });

    // this.http
    //   .delete(`http://localhost:3000/posts/${id}`, {
    //     observe: 'response',
    //   })
    //   .subscribe((data) => {
    //     console.log(data);
    //   });
    this.http
      .delete(`http://localhost:3000/posts/${id}`, {
        observe: 'events',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent) {
            console.log('Request has been sent');
          }

          if (event.type === HttpEventType.Response) {
            console.log('Response has arrived');
            console.log('Response: ', event);
          }
        })
      )
      .subscribe();
  }

  public getTestData() {
    // this.http
    //   .get('http://localhost:3000/test', {
    //     responseType: 'text',
    //   })
    //   .subscribe((res) => {
    //     console.log(res);
    //     console.log(typeof res);
    //   });
    this.http.get('http://localhost:3000/test').subscribe((res) => {
      console.log(res);
      console.log(typeof res);
    });
  }
}
