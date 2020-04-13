import {
  Component,
  Input,
  EventEmitter,
  Output,
  OnInit,
  OnChanges,
  SimpleChanges,
} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Post } from "../../models/post.model";
import { Router } from "@angular/router";

@Component({
  selector: "app-post-edit",
  templateUrl: "./post-edit.component.html",
  styleUrls: ["./post-edit.component.scss"],
})
export class PostEditComponent implements OnInit, OnChanges {
  pageTitle: string;
  postForm: FormGroup;
  post: Post;

  @Input() errorMessage: string;
  @Input() currentPost: Post;

  @Output() savePost = new EventEmitter<Post>();
  @Output() backToList = new EventEmitter<void>();

  constructor(private fb: FormBuilder) {
    this.postForm = this.fb.group({
      title: ["", Validators.required],
      body: ["", Validators.required],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.currentPost) {
      const post: any = changes.currentPost.currentValue as Post;
      this.displayPost(post);
    }
  }

  displayPost(post: Post | null): void {
    this.post = post;

    if (this.post) {
      this.postForm.reset();

      if (this.post.id === 0) {
        this.pageTitle = "Add New Post";
      } else {
        this.pageTitle = `Edit Post : ${this.post.title}`;
      }

      this.postForm.patchValue({
        title: this.post.title,
        body: this.post.body,
      });
    }
  }

  backToPostList(): void {
    this.backToList.emit();
  }

  onSubmit(): void {
    if (this.postForm.valid) {
      if (this.postForm.dirty) {
        const post = { ...this.post, ...this.postForm.value };
        this.savePost.emit(post);
      }
    }
  }
}
