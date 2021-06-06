import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {

  @Input()
  post:Post = new Post();

  @Output()
  postAddedEvent = new EventEmitter();

  public selectedFile: any;
  imgURL: any;
  isLoggedIn = false;
  showAdminBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private postService:PostsService, private httpClient:HttpClient,
    private router: Router, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {

  }

  public onFileChanged(event: any) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  savePost() {
    //If there is no post id then it is an add post call else it is an edit book call
    if (this.post.id == null) {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;

      this.httpClient.post('http://localhost:8080/posts/upload', uploadData, { observe: 'response' })
        .subscribe((response) => {
          if (response.status === 200) {
            this.postService.addPost(this.post).subscribe(
              (post) => {
                this.postAddedEvent.emit();
                this.router.navigate([ 'posts']);
              }
            );
            console.log('Image uploaded successfully');
          } else {
            console.log('Image not uploaded successfully');
          }
        }
        );
    } else {
      const uploadData = new FormData();
      uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
      this.selectedFile.imageName = this.selectedFile.name;
      this.httpClient.post('http://localhost:8080/posts/upload', uploadData, { observe: 'response' })
      .subscribe((response)=>{
        if(response.status === 200){
          this.postService.updatePost(this.post).subscribe(
            (post) => {
              this.postAddedEvent.emit();
              this.router.navigate(['posts']);
            }
          );
          console.log('Image uploaded successfully');
        }else{
          console.log('Image not uploaded successfully');
        }

      })

    }
}

}
