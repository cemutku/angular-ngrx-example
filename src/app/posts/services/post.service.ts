import { Injectable } from "@angular/core";
import { Post } from "../models/post.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json",
  }),
};

@Injectable()
export class PostService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(environment.apiUrl);
  }

  getPost(id: number): Observable<Post> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.get<Post>(url);
  }

  deletePost(id: number): Observable<any> {
    const url = `${environment.apiUrl}/${id}`;
    return this.http.delete(url, httpOptions);
  }

  updatePost(post: Post): Observable<any> {
    const url = `${environment.apiUrl}/${post.id}`;
    return this.http.put<Post>(url, post, httpOptions);
  }

  savePost(post: Post): Observable<any> {
    return this.http.post<Post>(environment.apiUrl, post, httpOptions);
  }

  search(value: string): Observable<Post[]> {
    const url = `${environment.apiUrl}${environment.searchPattern}${value}`;
    return this.http.get<Post[]>(url);
  }
}
