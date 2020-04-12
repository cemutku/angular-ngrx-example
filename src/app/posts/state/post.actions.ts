import { Action } from "@ngrx/store";
import { Post } from "../models/post.model";

export enum PostActionTypes {
  SetCurrentPost = "[Post] Set Current Post",
  InitializeNewPost = "[Post] Initialize New Post",
  LoadPosts = "[Post] Load Posts",
  LoadPostsSuccess = "[Post] Load Posts Success",
  LoadPostsFail = "[Post] Load Posts Fail",
  DeletePost = "[Post] Delete Posts",
  DeletePostSuccess = "[Post] Delete Posts Success",
  DeletePostFail = "[Post] Delete Posts Fail",
  UpdatePost = "[Post] Update Post",
  UpdatePostSuccess = "[Post] Update Post Success",
  UpdatePostFail = "[Post] Update Post Fail",
  GetPost = "[Post] Get Post",
  GetPostSuccess = "[Post] Get Post Success",
  GetPostFail = "[Post] Get Post Fail",
  CreatePost = "[Post] Create Post",
  CreatePostSuccess = "[Post] Create Post Success",
  CreatePostFail = "[Post] Create Post Fail",
}

export class InitializeNewPost implements Action {
  readonly type = PostActionTypes.InitializeNewPost;
}

// Component will disatch it
export class LoadPosts implements Action {
  readonly type = PostActionTypes.LoadPosts;
}

// Side effect will dispath it
export class LoadPostsSuccess implements Action {
  readonly type = PostActionTypes.LoadPostsSuccess;

  constructor(public payload: Post[]) {}
}

export class LoadPostsFail implements Action {
  readonly type = PostActionTypes.LoadPostsFail;

  constructor(public payload: string) {}
}

export class DeletePost implements Action {
  readonly type = PostActionTypes.DeletePost;

  constructor(public payload: number) {}
}

export class DeletePostSuccess implements Action {
  readonly type = PostActionTypes.DeletePostSuccess;

  constructor(public payload: number) {}
}

export class DeletePostFail implements Action {
  readonly type = PostActionTypes.DeletePostFail;

  constructor(public payload: string) {}
}

export class SetCurrentPost implements Action {
  readonly type = PostActionTypes.SetCurrentPost;

  constructor(public payload: number) {}
}

export class UpdatePost implements Action {
  readonly type = PostActionTypes.UpdatePost;

  constructor(public payload: Post) {}
}

export class UpdatePostSuccess implements Action {
  readonly type = PostActionTypes.UpdatePostSuccess;

  constructor(public payload: Post) {}
}

export class UpdatePostFail implements Action {
  readonly type = PostActionTypes.UpdatePostFail;

  constructor(public payload: string) {}
}

export class GetPost implements Action {
  readonly type = PostActionTypes.GetPost;

  constructor(public payload: number) {}
}

export class GetPostSuccess implements Action {
  readonly type = PostActionTypes.GetPostSuccess;

  constructor(public payload: Post) {}
}

export class GetPostFail implements Action {
  readonly type = PostActionTypes.GetPostFail;

  constructor(public payload: string) {}
}

export class CreatePost implements Action {
  readonly type = PostActionTypes.CreatePost;

  constructor(public payload: Post) {}
}

export class CreatePostSuccess implements Action {
  readonly type = PostActionTypes.CreatePostSuccess;

  constructor(public payload: Post) {}
}

export class CreatePostFail implements Action {
  readonly type = PostActionTypes.CreatePostFail;

  constructor(public payload: string) {}
}

export type PostActions =
  | InitializeNewPost
  | LoadPosts
  | LoadPostsSuccess
  | LoadPostsFail
  | DeletePost
  | DeletePostSuccess
  | DeletePostFail
  | SetCurrentPost
  | UpdatePost
  | UpdatePostSuccess
  | UpdatePostFail
  | GetPost
  | GetPostSuccess
  | GetPostFail
  | CreatePost
  | CreatePostSuccess
  | CreatePostFail;
