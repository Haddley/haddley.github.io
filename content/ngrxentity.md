---
title: "NGRX entity"
description: "json-server"
date: "2023-02-18"
categories: ["Angular"]
tags: ""
slug: "ngrxentity"
image: "/assets/images/ngrxentity/ngrx.svg"
---

I extended my haddley-ngrx project to include support for posts.

I used json-server to create a simple api

```bash
% npm i json-server

```

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.21.40-pm-1536x284.png)
*npm i json-server*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.22.53-pm-1536x503.png)
*Github co-pilot suggested an addition to the scripts section of package.json*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.26.07-pm-1536x676.png)
*I created a db.json in the project's root folder*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.27.45-pm-1536x717.png)
*I started the server by running npm run server*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-3.28.45-pm-1420x744.png)
*I used chrome to request details of all posts.*


## Accessing the server

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.11.54-pm-1536x433.png)
*ng generate service services/post*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.13.08-pm-1536x913.png)
*ng test*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.16.26-pm-1536x356.png)
*providedIn: 'root' (no need to add service to app.module.ts)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.21.24-pm-1536x574.png)
*co-pilot suggests creating a post.model file (why not?)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-4.23.22-pm-1536x351.png)
*co-pilot suggests that we include a body field (why not?)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-5.21.38-pm-1536x615.png)
*co-pilot suggests that we include a deletePost method (why not)*

![](/assets/images/ngrxentity/screen-shot-2023-02-19-at-6.33.32-pm-1536x552.png)
*imports HttpClientModule*


## Testing a service

Initially I wrote tests that called the running json-server.

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.33.14-am-1536x746.png)
*Executed 6 of 6 success*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.32.47-am-1536x849.png)
*Karma results in a web page*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.33.29-am-1536x846.png)
*The json-server shows the POST, DELETE and GET requests*


## Mock the HTTP client

I installed jasmine-auto-spies.

```bash
% npm i --include=dev jasmine-auto-spies
```

I updated the tests to use the mock.

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-10.56.26-am-1536x141.png)
*npm i --include=dev jasmine-auto-spies*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-11.32.27-am-1536x782.png)
*Executed 6 of 6 success*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-11.32.46-am-1536x486.png)
*Karma results in a web page*


Entity provides an API to manipulate and query entity collections.

Reduces boilerplate for creating reducers that manage a collection of models.
Provides performant CRUD operations for managing entity collections.
Extensible type-safe adapters for selecting entity information.

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-3.08.35-pm-1536x498.png)
*Load Posts Success*

![](/assets/images/ngrxentity/screen-shot-2023-02-20-at-3.09.38-pm-1536x476.png)
*Load Posts Failure (service not running)*


## post.service.spec.ts

```text
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { Post } from '../models/post.model';
import { PostService } from './post.service';
import { TestBed } from '@angular/core/testing';

describe('PostService', () => {
  let service: PostService;
  let httpSpy: Spy<HttpClient>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PostService,
        { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }
      ]
    });

    service = TestBed.inject(PostService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should create a new post', (done: DoneFn) => {

    const newPost = { id: 100, title: "json-server100", author: "typicode", body: "some body100" } as Post;

    httpSpy.post.and.nextWith(newPost);

    service.addPost(newPost).subscribe(post => {
      expect(post).toEqual(newPost);
      done();
    });
    expect(httpSpy.post.calls.count()).toBe(1);
  });

  it('should return an existing post', (done: DoneFn) => {

    const existingPost = { id: 1, title: "json-server", author: "typicode", body: "some body" } as Post;
    const postId = existingPost.id;

    httpSpy.get.and.nextWith(existingPost);

    service.getPost(postId).subscribe(post => {
      expect(post).toEqual(existingPost);
      done();
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });

  it('should return a 404 if post does not exist', (done: DoneFn) => {

    const postId = 89776683;

    httpSpy.get.and.throwWith(new HttpErrorResponse({
      error: "404 - Not Found",
      status: 404
    }));

    service.getPost(postId).subscribe({
      next: (post) => {
        done.fail("Expected a 404");
      },
      error: (error) => {
        expect(error.status).toEqual(404);
        done();
      }
    });

    expect(httpSpy.get.calls.count()).toBe(1);
  });


});
```

## post.actions.ts

```text
import { createAction, props } from '@ngrx/store';
import { Post } from 'src/app/models/post.model';

export const loadPosts = createAction('[Posts] Load Posts');
export const loadPostsSuccess = createAction('[Posts] Load Posts Success', props<{ posts: Post[] }>());
export const loadPostsFailure = createAction('[Posts] Load Posts Failure', props<{ error: string }>());
```

## post.effect.ts

```text
import { Injectable } from "@angular/core";
import { catchError, exhaustMap, map, of } from "rxjs";
import { loadPosts, loadPostsFailure, loadPostsSuccess } from "./post.actions";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { PostService } from "src/app/services/post.service";

@Injectable()
export class PostEffects {

    constructor(private actions$: Actions, private postService: PostService) { }

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPosts),
            exhaustMap(() =>
                // call the service
                this.postService.getPosts().pipe(
                    // return a Success action when the HTTP request was successfull
                    map((posts) => loadPostsSuccess({ posts: posts })),
                    // return a Failed action when something went wrong during the HTTP request
                    catchError((error) => of(loadPostsFailure({ error: 'http error' }))),
                ),
            ),
        )
    );
}
```

## post.reducer.ts

```text
import {
    createEntityAdapter,
    EntityAdapter,
    EntityState
} from '@ngrx/entity';
import { Post } from '../../models/post.model';
import { createReducer, on } from '@ngrx/store';
import { loadPostsFailure, loadPostsSuccess } from './post.actions';

export interface PostState extends EntityState<Post> {
    // additional entities state properties
    currentPostId: number | null;
    error: any;
}

export const postAdapter: EntityAdapter<Post> = createEntityAdapter<Post>();

export const initialState: PostState = postAdapter.getInitialState({
    currentPostId: null,
    error: null
});

export const postReducer = createReducer(
    initialState,
    on(loadPostsSuccess, (state, { posts }) => {
        return postAdapter.setAll(posts, {...state,error:null});
    }),
    on(loadPostsFailure, (state, { error }) => {
        return { ...state, error};
    })

)
```

## post.selector.ts

```text
import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { postAdapter, PostState } from "./post.reducer";

export const selectPosts = (state: AppState) => state.posts;

export const { selectIds, selectEntities, selectAll, selectTotal } = postAdapter.getSelectors();

export const selectAllPosts = createSelector(selectPosts, selectAll);

export const selectEntitiesPosts = createSelector(selectPosts, selectEntities);

export const selectTotalPosts = createSelector(selectPosts, selectTotal);

export const selectIdsPosts = createSelector(selectPosts, selectIds);

export const selectError = createSelector(
    selectPosts,
    (state: PostState) => state.error
);
```

## app.component.html

```text
<div class="dice" (click)="updateValue()" *ngIf="value$|async as value">{{value}}</div>

<div *ngIf="postsError$ | async as postsError; else loaded">
    <p>There was an error loading the posts</p>
    <p>{{postsError}}</p>
</div>

<ng-template #loaded>
    <table>
        <thead>
            <th>Title</th>
            <th>Author</th>
            <th>Body</th>
        </thead>
        <tbody>
            <tr *ngFor="let post of posts$ | async">
                <td>{{post.title}}</td>
                <td>{{post.author}}</td>
                <td>{{post.body}}</td>
            </tr>
        </tbody>
    </table>
</ng-template>
```

## app.component.ts

```text
import { Component, OnInit } from '@angular/core';
import { selectDiceError } from './state/dice/dice.selectors';
import { selectDiceValue } from './state/dice/dice.selectors';
import { Store } from '@ngrx/store';
import { roll} from './state/dice/dice.actions';
import { AppState } from './state/app.state';
import { selectAllPosts, selectEntitiesPosts, selectTotalPosts, selectIdsPosts, selectError } from './state/post/post.selector';
import { loadPosts } from './state/post/post.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    // random number beteen 1 and 6
    value$ = this.appStore.select(selectDiceValue);
    error$ = this.appStore.select(selectDiceError);

    // posts
    posts$ = this.appStore.select(selectAllPosts);
    postsError$ = this.appStore.select(selectError);

  constructor(private appStore: Store<AppState>) {}

  updateValue() {
    this.appStore.dispatch(roll());
  }

  ngOnInit() {
    this.appStore.dispatch(loadPosts());
  }

  title = 'haddley-ngrx';

}
```