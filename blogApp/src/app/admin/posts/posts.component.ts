import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/model/post.model';
import { PostsService } from 'src/app/services/posts.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  posts!: Array<Post>;
  postsRecieved!: Array<Post>;
  selectedPost?: Post ;
  action!: string;

  currentUser: any;

  constructor(private postService: PostsService,
    private activedRoute: ActivatedRoute,
    private router: Router, private tokenStorageService:TokenStorageService) { }

  ngOnInit(): void {
    this.refreshData();



  }

  refreshData() {

    this.postService.getPosts().subscribe(
      response => this.handleSuccessfulResponse(response)
    );
    this.activedRoute.queryParams.subscribe(
      (params) => {
        // get the url parameter named action. this can either be add or view.
        this.action = params['action'];
	// get the parameter id. this will be the id of the post whose details
	// are to be displayed when action is view.
	const id = params['id'];
	// if id exists, convert it to integer and then retrive the post from
	// the post array
        if (id) {
          this.selectedPost = this.posts.find(post => {
            return post.id === +id;
          });
        }
      }
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
      postwithRetrievedImageField.updateDate = post.updateDate;
      this.posts.push(postwithRetrievedImageField);
    }
  }

  addPost() {

    this.selectedPost = new Post();
    this.router.navigate(['posts'], { queryParams: { action: 'add' } });
  }

  viewPost(id: number) {
    this.router.navigate([ 'posts'], { queryParams: { id, action: 'view' } });
  }


}
