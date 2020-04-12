import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState } from "./post.reducer";
import * as fromRoot from "../../state";

export interface State extends fromRoot.State {
  posts: PostState;
}

const getPostFeatureState = createFeatureSelector<PostState>("posts");

export const getCurrentPostId = createSelector(
  getPostFeatureState,
  (state) => state.currentPostId
);

export const getNavigatedId = createSelector(fromRoot.getRouterInfo, (state) =>
  +state.params.id ? +state.params.id : 0
);

export const getPost = createSelector(
  getPostFeatureState,
  (state) => state.currentPost
);

export const getCurrentPost = createSelector(
  getPostFeatureState,
  getNavigatedId,
  getPost,
  (state, navigatedId, currentPost) => {
    if (navigatedId === 0) {
      return {
        id: 0,
        title: "",
        body: "",
      };
    } else if (state.posts && state.posts.length > 0) {
      return navigatedId ? state.posts.find((p) => p.id === navigatedId) : null;
    } else if (currentPost) {
      return currentPost;
    }
  }
);

export const getPosts = createSelector(
  getPostFeatureState,
  (state) => state.posts
);

export const getError = createSelector(
  getPostFeatureState,
  (state) => state.error
);
