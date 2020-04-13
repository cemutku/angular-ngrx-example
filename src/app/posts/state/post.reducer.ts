import { Post } from "../models/post.model";
import { PostActions, PostActionTypes } from "./post.actions";

export interface PostState {
  currentPostId: number | null;
  currentPost: Post | null;
  posts: Post[];
  error: string;
}

const initialState: PostState = {
  currentPostId: null,
  currentPost: null,
  posts: [],
  error: "",
};

export function reducer(state = initialState, action: PostActions): PostState {
  switch (action.type) {
    case PostActionTypes.InitializeNewPost:
      return {
        ...state,
        currentPost: new Post(),
      };
    case PostActionTypes.SetCurrentPost:
      return {
        ...state,
        currentPostId: action.payload,
      };
    case PostActionTypes.LoadPostsSuccess:
      return {
        ...state,
        posts: action.payload,
        error: "",
      };
    case PostActionTypes.LoadPostsFail:
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    case PostActionTypes.DeletePostSuccess:
      return {
        ...state,
        posts: state.posts.filter((x) => x.id !== action.payload),
        error: "",
      };
    case PostActionTypes.DeletePostFail:
      return {
        ...state,
        error: action.payload,
      };
    case PostActionTypes.UpdatePostSuccess:
      return {
        ...state,
        posts: state.posts.map((item: Post) =>
          action.payload.id == item.id ? action.payload : item
        ),
        currentPostId: action.payload.id,
        error: "",
      };
    case PostActionTypes.UpdatePostFail:
      return {
        ...state,
        error: action.payload,
      };
    case PostActionTypes.GetPostSuccess:
      return {
        ...state,
        currentPost: action.payload,
        error: "",
      };
    case PostActionTypes.GetPostFail:
      return {
        ...state,
        currentPost: null,
        error: action.payload,
      };
    case PostActionTypes.SearchPostFail:
      return {
        ...state,
        posts: [],
        error: action.payload,
      };
    case PostActionTypes.SearchPostSuccess:
      return {
        ...state,
        posts: action.payload,
        error: "",
      };

    default:
      return state;
  }
}
