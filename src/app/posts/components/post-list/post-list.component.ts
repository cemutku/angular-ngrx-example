import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Post } from "../../models/post.model";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.scss"],
})
export class PostListComponent {
  // private _searchKey: string = "";

  // get searchKey(): string {
  //   return this._searchKey;
  // }

  // set searchKey(value: string) {
  //   this._searchKey = value;
  //   this.postService.search(value).subscribe({
  //     next: (posts: Post[]) => (this.posts = posts),
  //     error: (err) => this.onError(err),
  //   });
  // }

  @Input() errorMessage: string;
  @Input() posts: Post[];

  @Output() edit = new EventEmitter<number>();
  @Output() add = new EventEmitter<void>();
  @Output() delete = new EventEmitter<number>();
  @Output() view = new EventEmitter<number>();

  editPost(id: number): void {
    this.edit.emit(id);
  }

  addNewPost(): void {
    this.add.emit();
  }

  deletePost(id: number): void {
    this.delete.emit(id);
  }

  viewPost(id: number): void {
    this.view.emit(id);
  }
}
