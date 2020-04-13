import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./posts/components/post-list/post-list.component";
import { PostEditComponent } from "./posts/components/post-edit/post-edit.component";
import { PostViewComponent } from "./posts/components/post-view/post-view.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";
import { PostListShellComponent } from "./posts/containers/post-list-shell/post-list-shell.component";
import { PostViewShellComponent } from "./posts/containers/post-view-shell/post-view-shell.component";
import { PostEditShellComponent } from "./posts/containers/post-edit-shell/post-edit-shell.component";

const routes: Routes = [
  {
    path: "",
    component: PostListShellComponent,
  },
  {
    path: "post-edit/:id",
    component: PostEditShellComponent,
  },
  {
    path: "post-edit/new",
    component: PostEditShellComponent,
  },
  {
    path: "post-view/:id",
    component: PostViewShellComponent,
  },
  {
    path: "**",
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
