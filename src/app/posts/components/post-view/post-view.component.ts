import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from "../../models/post.model";

@Component({
  selector: "app-post-view",
  templateUrl: "./post-view.component.html",
  styleUrls: ["./post-view.component.scss"],
})
export class PostViewComponent {
  @Input() post: Post;

  @Output() backToList = new EventEmitter<void>();

  backToPostList(): void {
    this.backToList.emit();
  }
}
