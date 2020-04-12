import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as fromPost from "../state";
import { Post } from "../models/post.model";
import { Store, select } from "@ngrx/store";
import { Observable } from "rxjs";

@Component({
  selector: "app-post-view",
  templateUrl: "./post-view.component.html",
  styleUrls: ["./post-view.component.scss"],
})
export class PostViewComponent implements OnInit {
  post$: Observable<Post>;

  constructor(private router: Router, private store: Store<fromPost.State>) {}

  // router state example
  ngOnInit(): void {
    this.post$ = this.store.pipe(select(fromPost.getCurrentPost));
  }

  backToPostList(): void {
    this.router.navigate(["/"]);
  }
}
