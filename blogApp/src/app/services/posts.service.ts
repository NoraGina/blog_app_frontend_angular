import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import { Post } from '../model/post.model';
import{ PostComment } from '../model/postComment.model';

const AUTH_API = 'http://localhost:8080/posts';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class PostsService {

   constructor(private httpClient:HttpClient) { }

   getPosts() {
    return this.httpClient.get<Post[]>(
      AUTH_API+'/all'
    );
  }

  addUploadData(selectedFile: any) {
    return this.httpClient.post(AUTH_API+'/upload', selectedFile);
  }

  addPost(newPost: Post) {
    return this.httpClient.post<Post>(AUTH_API+'/add', newPost);
  }

  getPost(id:number):Observable<Post>{
    return this.httpClient.get<Post>(AUTH_API+'/get/'+id);
  }

  getOnePost(id:number):Observable<Post>{
    return this.httpClient.get<Post>(AUTH_API+'/getOne/'+id);
  }


  deletePost(id: number) {
    return this.httpClient.delete<Post>(AUTH_API +'/' + id);
  }

  updatePost(updatedPost: Post) {
    return this.httpClient.put<Post>(AUTH_API+'/update', updatedPost);
  }

  updateLike(id:number, updatedPost:Post){
    return this.httpClient.put<Post>(AUTH_API+'/'+id+'/like', updatedPost)
  }

  updateDislike(id:number, updatedPost:Post){
    return this.httpClient.put<Post>(AUTH_API+'/'+id+'/dislike', updatedPost)
  }

 addComment(id:number, newComment:PostComment){
    return this.httpClient.post<PostComment>(AUTH_API+'/'+id+'/comment', newComment);
  }

  getComments(id:number): Observable<PostComment[]>{
    return this.httpClient.get<PostComment[]>(AUTH_API+'/'+id+'/comments');
  }
}
