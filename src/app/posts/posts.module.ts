import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { PostListComponent } from "./components/post-list/post-list.component";
import { PostEditComponent } from "./components/post-edit/post-edit.component";
import { PostViewComponent } from "./components/post-view/post-view.component";
import { PostService } from "./services/post.service";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/post.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "./state/post.effects";
import { PostListShellComponent } from "./containers/post-list-shell/post-list-shell.component";
import { PostViewShellComponent } from "./containers/post-view-shell/post-view-shell.component";
import { PostEditShellComponent } from './containers/post-edit-shell/post-edit-shell.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    StoreModule.forFeature("posts", reducer),
    EffectsModule.forFeature([PostEffects]),
  ],
  declarations: [
    PostListComponent,
    PostEditComponent,
    PostViewComponent,
    PostListShellComponent,
    PostViewShellComponent,
    PostEditShellComponent,
  ],
  providers: [PostService],
})
export class PostsModule {}
