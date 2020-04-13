import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { Post } from "../../models/post.model";
import { Store, select } from "@ngrx/store";

import * as fromPost from "../../state";
import * as postActions from "../../state/post.actions";
import { Router } from "@angular/router";
import { PostService } from "../../services/post.service";

@Component({
  selector: "app-post-list-shell",
  templateUrl: "./post-list-shell.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PostListShellComponent implements OnInit {
  posts$: Observable<Post[]>;
  errorMessage$: Observable<string>;

  constructor(private store: Store<fromPost.State>, private router: Router) {}

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts());
    this.posts$ = this.store.pipe(select(fromPost.getPosts));
    this.errorMessage$ = this.store.pipe(select(fromPost.getError));
  }

  editPost(id: number): void {
    this.router.navigate(["post-edit", id]);
  }

  addNewPost(): void {
    this.store.dispatch(new postActions.InitializeNewPost());
    this.router.navigate(["post-edit", "new"]);
  }

  deletePost(id: number): void {
    this.store.dispatch(new postActions.DeletePost(id));
  }

  viewPost(id: number): void {
    this.store.dispatch(new postActions.SetCurrentPost(id));
    this.router.navigate(["post-view", id]);
  }

  onSearch(searchKey: string): void {
    this.store.dispatch(new postActions.SearchPost(searchKey));    
  }

  onError(error: any): void {
    // this.toastr.error(error.message);
  }
}
