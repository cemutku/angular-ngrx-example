import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from "@ngrx/store";
import * as fromRoot from "./app.state";
import { routerReducer, RouterReducerState } from "@ngrx/router-store";
import { RouterStateUrl } from "./custom-route-serializer";

export interface State extends fromRoot.State {
  router: RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  router: routerReducer,
};

export const selectReducerState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>("router");

export const getRouterInfo = createSelector(
  selectReducerState,
  (state) => state.state
);
