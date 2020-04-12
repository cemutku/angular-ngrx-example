import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PostListComponent } from "./posts/post-list/post-list.component";
import { PostEditComponent } from "./posts/post-edit/post-edit.component";
import { PostViewComponent } from "./posts/post-view/post-view.component";
import { NotFoundComponent } from "./shared/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: PostListComponent,
  },
  {
    path: "post-edit/:id",
    component: PostEditComponent,
  },
  {
    path: "post-edit/new",
    component: PostEditComponent,
  },
  {
    path: "post-view/:id",
    component: PostViewComponent,
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
