import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import * as postActions from "../../state/post.actions";
import * as fromPost from "../../state";
import { ActivatedRoute, Router } from "@angular/router";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";
import { Post } from "../../models/post.model";

@Component({
  selector: "app-post-edit-shell",
  templateUrl: "./post-edit-shell.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostEditShellComponent implements OnInit {
  post$: Observable<Post>;
  errorMessage$: Observable<string>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromPost.State>
  ) {}

  ngOnInit(): void {
    this.errorMessage$ = this.store.pipe(select(fromPost.getError));

    const postId = +this.route.snapshot.paramMap.get("id");

    if (postId) {
      this.store.dispatch(new postActions.GetPost(postId));
    }

    this.post$ = this.store.pipe(select(fromPost.getCurrentPost));
  }

  savePost(post: Post): void {
    if (post.id === 0) {
      this.store.dispatch(new postActions.CreatePost(post));
    } else {
      this.store.dispatch(new postActions.UpdatePost(post));
    }
  }

  backToPostList(): void {
    this.router.navigate(["/"]);
  }
}
