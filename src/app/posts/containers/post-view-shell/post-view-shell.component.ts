import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../models/post.model";
import { Router } from "@angular/router";

import * as fromPost from "../../state";
import { Store, select } from "@ngrx/store";

@Component({
  selector: "app-post-view-shell",
  templateUrl: "./post-view-shell.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostViewShellComponent implements OnInit {
  post$: Observable<Post>;

  constructor(private router: Router, private store: Store<fromPost.State>) {}

  ngOnInit(): void {
    // router state example
    this.post$ = this.store.pipe(select(fromPost.getCurrentPost));
  }

  backToPostList(): void {
    this.router.navigate(["/"]);
  }
}
