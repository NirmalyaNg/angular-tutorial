import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css'],
})
export class ParentComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    // this.postsService.testEmitter.subscribe(() => {
    //   console.log('Subscription in parent component running....');
    // });

    this.postsService.testSubject.subscribe((value) => {
      console.log(
        'Subject Subscription in parent component running....\nValue: ' + value
      );
    });

    this.postsService.testBehaviorSubject.subscribe((value) => {
      console.log(
        'Behavior Subject Subscription in parent component running....\nValue: ' +
          value
      );
    });
  }
}
