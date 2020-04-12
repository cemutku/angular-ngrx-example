import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ToastrModule } from "ngx-toastr";
import { PostListComponent } from "./post-list/post-list.component";
import { PostEditComponent } from "./post-edit/post-edit.component";
import { PostViewComponent } from "./post-view/post-view.component";
import { PostService } from "./services/post.service";
import { StoreModule } from "@ngrx/store";
import { reducer } from "./state/post.reducer";
import { EffectsModule } from "@ngrx/effects";
import { PostEffects } from "./state/post.effects";

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
  declarations: [PostListComponent, PostEditComponent, PostViewComponent],
  providers: [PostService],
})
export class PostsModule {}
