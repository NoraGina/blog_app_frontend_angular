import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './admin/posts/posts.component';
import { AddPostComponent } from './admin/add-post/add-post.component';
import { RegisterComponent } from './user/register/register.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterSuccessComponent } from './user/register-success/register-success.component';
import { ProfileComponent } from './user/profile/profile.component';

import { CommentsComponent } from './user/comments/comments.component';
import { AddCommentComponent } from './user/add-comment/add-comment.component';
import { ViewPostComponent } from './user/view-post/view-post.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authorotyInterceptorProviders } from './_helpers/auth.interceptor';
import { EditorModule } from '@tinymce/tinymce-angular';
import { PostDetailsComponent } from './admin/post-details/post-details.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PostsComponent,
    AddPostComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    ProfileComponent,
    CommentsComponent,
    AddCommentComponent,
    ViewPostComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    EditorModule

  ],
  providers: [authorotyInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
