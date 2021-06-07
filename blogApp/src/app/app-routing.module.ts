import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponent } from './admin/posts/posts.component';
import { HomeComponent } from './components/home/home.component';
import { AddCommentComponent } from './user/add-comment/add-comment.component';
import { CommentsComponent } from './user/comments/comments.component';
import { LoginComponent } from './user/login/login.component';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterSuccessComponent } from './user/register-success/register-success.component';
import { RegisterComponent } from './user/register/register.component';
import { ViewPostComponent } from './user/view-post/view-post.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home', component: HomeComponent},
  {path: 'register', component:RegisterComponent},
  {path: 'login', component:LoginComponent},
  { path: 'profile', component: ProfileComponent },
  {path: 'register-success', component: RegisterSuccessComponent},
  {path:'posts', component:PostsComponent},
  {path:'post/:id', component:ViewPostComponent},
  {path:'post/:id/comments', component:CommentsComponent},
  {path: 'post/:id/comment', component: AddCommentComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
