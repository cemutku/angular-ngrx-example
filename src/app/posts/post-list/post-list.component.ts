import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Post } from "../models/post.model";
import * as postActions from "../state/post.actions";
import * as fromPost from "../state";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent implements OnInit {
  posts$: Observable<Post[]>;

  // private _searchKey: string = "";

  // get searchKey(): string {
  //   return this._searchKey;
  // }

  // set searchKey(value: string) {
  //   this._searchKey = value;
  //   this.postService.search(value).subscribe({
  //     next: (posts: Post[]) => (this.posts = posts),
  //     error: (err) => this.onError(err),
  //   });
  // }

  constructor(
    private router: Router,
    private store: Store<fromPost.State>,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(new postActions.LoadPosts());
    this.posts$ = this.store.pipe(select(fromPost.getPosts));
  }

  editPost(id: number): void {
    this.store.dispatch(new postActions.InitializeNewPost());
    this.router.navigate(["post-edit", id]);
  }

  addNewPost(): void {
    this.router.navigate(["post-edit", "new"]);
  }

  deletePost(id: number): void {
    this.store.dispatch(new postActions.DeletePost(id));
  }

  viewPost(id: number): void {
    this.store.dispatch(new postActions.SetCurrentPost(id));
    this.router.navigate(["post-view", id]);
  }

  onError(error: any): void {
    this.toastr.error(error.message);
  }
}
