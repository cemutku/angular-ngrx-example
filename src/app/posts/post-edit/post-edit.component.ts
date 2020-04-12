import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Post } from "../models/post.model";
import * as postActions from "../state/post.actions";
import * as fromPost from "../state";
import { Store, select } from "@ngrx/store";
import { takeWhile } from "rxjs/operators";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"],
})
export class PostEditComponent implements OnInit, OnDestroy {
  pageTitle: string = "";
  errorMessage: string = "";
  post: Post = new Post();
  componentActive = true;
  postForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private store: Store<fromPost.State>
  ) {}

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ["", Validators.required],
      body: ["", Validators.required],
    });

    // this.store
    //   .pipe(select(fromPost.getNavigatedId))
    //   .subscribe((postId: number) =>
    //     this.store.dispatch(new postActions.GetPost(postId))
    //   );

    const postId = +this.route.snapshot.paramMap.get("id");

    if (postId) {
      this.store.dispatch(new postActions.GetPost(postId));
    }

    this.store
      .pipe(
        select(fromPost.getCurrentPost),
        takeWhile(() => this.componentActive)
      )
      .subscribe((post: Post) => this.displayPost(post));
  }

  displayPost(post: Post | null): void {
    this.post = post;

    if (this.post) {
      this.postForm.reset();

      if (this.post.id === 0) {
        this.pageTitle = "Add New Post";
      } else {
        this.pageTitle = `Edit Post : ${this.post.title}`;
      }

      this.postForm.patchValue({
        title: this.post.title,
        body: this.post.body,
      });
    }
  }

  backToPostList(): void {
    this.router.navigate(["/"]);
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      if (this.postForm.dirty) {
        const post = { ...this.post, ...this.postForm.value };
        if (post.id === 0) {
          this.store.dispatch(new postActions.CreatePost(post));
        } else {
          this.store.dispatch(new postActions.UpdatePost(post));
        }
      }
    } else {
      this.errorMessage = "Please correct the validation errors.";
    }
  }

  // onError(error: any): void {
  //   this.toastr.error(error.message);
  // }

  ngOnDestroy(): void {
    this.componentActive = false;
  }
}
