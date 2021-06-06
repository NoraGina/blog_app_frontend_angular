import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {

  permaLink!: number;
  post!: Post;

  constructor(private route:ActivatedRoute, private postService:PostsService,
    private router:Router, private location:Location) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.permaLink = params['id'];
    });

    this.postService.getPost(this.permaLink).subscribe((data:Post) => {
      this.post = data;
    },(err: any) => {
      console.log('Failure Response');
    })
  }

  addLike(){
    this.postService.updateLike(this.permaLink, this.post).subscribe(data=>{
        //this.router.navigateByUrl('/home');
        //this.back();
    });
  }

  addDislike(){
    this.postService.updateDislike(this.permaLink, this.post).subscribe(data=>{
        this.router.navigateByUrl('/home');
    });
  }

  back():void{
    this.location.back();
  }

}
