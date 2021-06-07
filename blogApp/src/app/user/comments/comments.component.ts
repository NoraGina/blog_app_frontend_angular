import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostComment } from 'src/app/model/postComment.model';
import { PostsService } from 'src/app/services/posts.service';
import { Location } from '@angular/common';
import { Post } from 'src/app/model/post.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  permaLink!:number;
  comments!: PostComment[];
  post!:Post;

  constructor(private route:ActivatedRoute, private postService:PostsService,
    private location:Location, private router:Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.retrieveComments();
    this.getPost();

  }
  retrieveComments(): void {
    this.postService.getComments(this.permaLink)
      .subscribe(
        data => {
          this.comments = data;
          console.log(data);

        },
        error => {
          console.log(error);
        });
  }

  getPost(){
    this.postService.getOnePost(this.permaLink).subscribe((data:Post) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  back(): void {
    this.location.back()
  }


}
