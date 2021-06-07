import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { Location } from '@angular/common';
import { PostComment } from 'src/app/model/postComment.model';
import { Post } from 'src/app/model/post.model';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  addCommentForm:FormGroup;

 postComment:PostComment;
  body = new FormControl('');
  permaLink!:number;
  post!:Post;

  constructor(private postService:PostsService, private location:Location,
    private route:ActivatedRoute, private router:Router) {
      this.addCommentForm = new FormGroup({
        body: this.body
      });

      this.postComment={
        id:0,
        text:'',
        username:'',
        date:'',
        time:''
      }
     }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permaLink = params['id'];
    });
    this.postService.getOnePost(this.permaLink).subscribe(data=>{
      this.post=data;
    })
  }

  addComment(){

    this.postComment.text = this.addCommentForm.get('body')?.value;
    this.postService.addComment(this.permaLink, this.postComment).subscribe(data=>{

      this.router.navigateByUrl('/post/'+this.permaLink+'/comments');
    }, error => {
      console.log('Failure Response');
    })
  }

  back(): void {
    this.location.back()
  }

}
