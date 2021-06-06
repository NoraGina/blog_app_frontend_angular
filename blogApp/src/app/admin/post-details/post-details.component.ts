import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {

  @Input()
  post!: Post;

  @Output()
  postDeletedEvent = new EventEmitter();

  constructor(private postService:PostsService, private router:Router) { }

  ngOnInit(): void {
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(
      (post) => {
        this.postDeletedEvent.emit();
        this.router.navigate(['posts']);
      }
    );
  }

  editPost() {
    this.router.navigate(['posts'], { queryParams: { action: 'edit', id: this.post.id } });
  }

}
