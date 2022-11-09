import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-grand-child',
  templateUrl: './grand-child.component.html',
  styleUrls: ['./grand-child.component.css'],
})
export class GrandChildComponent implements OnInit {
  constructor(private postsService: PostsService) {}

  ngOnInit(): void {}

  handleClick() {
    // this.postsService.testEmitter.emit();
    this.postsService.testSubject.next('Nirmalya');
  }

  handleClick2() {
    this.postsService.testBehaviorSubject.next('Sampriti');
  }

  handleClick3() {
    console.log(
      'Last value emitted by Behavior Subject: ' +
        this.postsService.testBehaviorSubject.getValue()
    );
  }
}
