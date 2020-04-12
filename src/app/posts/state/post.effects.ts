import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { PostService } from "../services/post.service";
import { Observable, merge, of } from "rxjs";
import { Action } from "@ngrx/store";
import * as postActions from "./post.actions";
import { mergeMap, map, catchError, tap } from "rxjs/operators";
import { Post } from "../models/post.model";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";

@Injectable()
export class PostEffects {
  constructor(
    private actions$: Actions,
    private postService: PostService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  @Effect()
  loadPosts$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.PostActionTypes.LoadPosts),
    mergeMap((action: postActions.LoadPosts) =>
      this.postService.getPosts().pipe(
        map((posts: Post[]) => new postActions.LoadPostsSuccess(posts)),
        catchError((err) => of(new postActions.LoadPostsFail(err)))
      )
    )
  );

  @Effect()
  getPost$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.PostActionTypes.GetPost),
    map((action: postActions.GetPost) => action.payload),
    mergeMap((postId: number) =>
      this.postService.getPost(postId).pipe(
        map((post: Post) => new postActions.GetPostSuccess(post)),
        catchError((err) => of(new postActions.GetPostFail(err)))
      )
    )
  );

  @Effect()
  createPost$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.PostActionTypes.CreatePost),
    map((action: postActions.CreatePost) => action.payload),
    mergeMap((post: Post) =>
      this.postService.savePost(post).pipe(
        map((newPost: Post) => new postActions.CreatePostSuccess(newPost)),
        tap(() => this.onSaveSuccess()),
        catchError((err) => of(new postActions.CreatePostFail(err)))
      )
    )
  );

  @Effect()
  updatePost$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.PostActionTypes.UpdatePost),
    map((action: postActions.UpdatePost) => action.payload),
    mergeMap((post: Post) =>
      this.postService.updatePost(post).pipe(
        map(
          (updatedPost: Post) => new postActions.UpdatePostSuccess(updatedPost)
        ),
        tap(() => this.onSaveSuccess()),
        catchError((err) => of(new postActions.DeletePostFail(err)))
      )
    )
  );

  @Effect()
  deletePost$: Observable<Action> = this.actions$.pipe(
    ofType(postActions.PostActionTypes.DeletePost),
    map((action: postActions.DeletePost) => action.payload),
    mergeMap((postId: number) =>
      this.postService.deletePost(postId).pipe(
        map(() => new postActions.DeletePostSuccess(postId)),
        tap(() => this.toastr.success("Delete Successful")),
        catchError((err) => of(new postActions.DeletePostFail(err)))
      )
    )
  );

  onSaveSuccess(): void {
    this.toastr.success("Save Successful");
    this.router.navigate(["/"]);
  }
}
