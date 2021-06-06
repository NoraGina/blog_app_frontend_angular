import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts!: Array<Post>;
  postsRecieved!: Array<Post>;



  constructor(private postService: PostsService) { }

  ngOnInit(): void {

    this.refreshData();
  }

  refreshData() {
    this.postService.getPosts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );

  }

  // we will be taking the posts response returned from the database
  // and we will be adding the retrieved
  handleSuccessfulResponse(response: Post[]): void {
    this.posts = new Array<Post>();
    //get posts returned by the api call
    this.postsRecieved = response;
    for (const post of this.postsRecieved) {

      const postwithRetrievedImageField = new Post();
      postwithRetrievedImageField.id = post.id;
      postwithRetrievedImageField.title = post.title;
      //populate retrieved image field so that post image can be displayed
      postwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + post.image;
      postwithRetrievedImageField.author = post.author;
      postwithRetrievedImageField.description = post.description;
      postwithRetrievedImageField.image=post.image;
      postwithRetrievedImageField.content=post.content;
      postwithRetrievedImageField.countLike=post.countLike;
      postwithRetrievedImageField.countDislike=post.countDislike;
      postwithRetrievedImageField.countViews=post.countViews;
      postwithRetrievedImageField.countComments = post.countComments;
      postwithRetrievedImageField.date = post.date;
      postwithRetrievedImageField.updateDate = post.date;
      postwithRetrievedImageField.time = post.time;
      postwithRetrievedImageField.updateTime = post.updateTime;
      this.posts.push(postwithRetrievedImageField);
    }
  }


}
