---
title: "Angular Firebase"
description: "Creating a new firebase project"
date: "2023-04-25"
categories: ["Angular","TypeScript","Firebase"]
tags: "angular, firebase, firestore, typescript"
hidden: false
slug: "angularfirebase"
image: "/assets/images/angularfirebase/logo-lockup-firebase-vertical.svg"
---

I created a Firebase project using https://console.firebase.google.com

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.02.39-pm-1836x1011.png)
*I named the project haddley-firebase*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.03.04-pm-1836x1009.png)
*I disabled Google Analytics*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.05.06-pm-1836x1001.png)
*I waited for the project to be created*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.05.38-pm-1836x1011.png)
*The Firebase project was created*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.07.10-pm-832x520.png)
*I selected the Web option*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.10.13-pm-1836x1013.png)
*I entered an app nickname*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.11.10-pm-1836x1006.png)
*I reviewed the Firebase SDK configuration*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.14.03-pm-1836x921.png)
*I navigated to the Firebase project dashboard*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.14.57-pm-1836x729.png)
*I clicked Get started*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.15.48-pm-1836x842.png)
*I selected Email/Password authentication*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.17.21-pm-1836x892.png)
*I enabled Email/Password authentication*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.18.19-pm-1836x769.png)
*esp8266*


## Creating a new angular project

I installed the Angular command line interface using [npm](/posts/npm/)

```bash
% npm i -g @angular/cli
```

I created a new Angular project using "ng new"

```bash
% ng new haddley-angular
```

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.19.35-pm-1836x983.png)
*I ran ng new haddley-angular*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.22.07-pm-1836x965.png)
*I ran npm start*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.23.19-pm-1836x643.png)
*The app was running at http://localhost:4200*


## angular fire

https://www.npmjs.com/package/@angular/fire

```bash
npm i @angular/fire
```

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-5.27.16-pm-1366x614.png)
*I installed @angular/fire*


## environments

I added firebaseConfig to environments.ts

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.24.03-pm-1836x551.png)
*I updated environments.ts*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.43.55-pm-1836x773.png)
*I added provideFirebaseApp, provideFirestore, provideAuth and ReactiveFormsModule to app.module.ts*


## login, register and dashboard components

```bash
ng generate component login
ng generate component register
ng generate component dashboard
```

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.34.16-pm-1836x520.png)
*I generated the login, register and dashboard components*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.36.08-pm-1836x314.png)
*I removed the sample html from app.component.html*


## bootstrap 5

I used Bootstrap for styling the forms.

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.39.03-pm-1836x563.png)
*I added the CSS stylesheet link*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.40.07-pm-1836x483.png)
*The CSS stylesheet link was added*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-8.41.32-pm-1836x803.png)
*I reviewed an example form*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-9.01.00-pm-1836x647.png)
*I updated register.component.html*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-9.53.35-pm-1836x708.png)
*I updated login.component.html*

![](assets/images/angularfirebase/screen-shot-2023-04-26-at-11.09.01-am-1836x270.png)
*I updated dashboard.component.html*


## Route

I configured Angular routing.

![](assets/images/angularfirebase/screen-shot-2023-04-26-at-11.26.53-am-1836x589.png)
*I created authguard.ts*

![](assets/images/angularfirebase/screen-shot-2023-04-26-at-11.27.17-am-1836x621.png)
*I configured app-routing.module.ts*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-9.57.46-pm-1836x580.png)
*Firebase had no users yet*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-9.58.10-pm-1836x583.png)
*I navigated to /register*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-9.58.23-pm-1836x591.png)
*Firebase showed the registered users*

![](assets/images/angularfirebase/screen-shot-2023-04-25-at-9.58.38-pm-1836x540.png)
*I navigated to /login*

![](assets/images/angularfirebase/screen-shot-2023-04-26-at-11.10.48-am-1836x613.png)
*I navigated to /dashboard*


## ng deploy

I used "ng deploy" to deploy the app.

```bash
% ng deploy
```


![](assets/images/angularfirebase/screen-shot-2023-04-26-at-11.55.42-am-1720x870.png)
*I ran ng deploy*

![](assets/images/angularfirebase/screen-shot-2023-04-26-at-11.56.01-am-1836x1011.png)
*The app was live at https://haddley-firebase-e8e21.web.app*


## Saving and retrieving private message documents

I used addDoc and query collection to save and retrieve messages.

![](assets/images/angularfirebase/screen-shot-2023-04-27-at-11.08.21-am-1836x476.png)
*I updated the Firestore rules*

![](assets/images/angularfirebase/screen-shot-2023-04-27-at-11.08.59-am-1298x808.png)
*I viewed the dashboard*


## dashboard.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = this.auth.currentUser;

  constructor(private auth: Auth) { }

  ngOnInit(): void {
    console.log(this.auth.currentUser);
  }

}
```

## dashboard.component.html

```html
<div class="container my-5">

    <p>dashboard works!</p>

    <div *ngIf="user">
        User {{ user.email }} is logged in.
    </div>

    <ul>
        <li *ngFor="let message of messages$ | async">
          {{ message.text }}
        </li>
      </ul>

    <form [formGroup]="createMessageForm" (ngSubmit)="onSubmit()">
        <div class="mb-3">
            <label for="exampleInputMessage1" class="form-label">Message</label>
            <input type="text" class="form-control" id="exampleMessage1" aria-describedby="messageHelp"
                formControlName="message">
            <div id="messageHelp" class="form-text">Enter message here.</div>
        </div>
        <button type="submit" class="btn btn-primary">Save</button>
    </form>
</div>
```

## dashboard.component.ts

```typescript
import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, addDoc, collection, collectionData, getFirestore, query, serverTimestamp, where } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user = this.auth.currentUser;
  createMessageForm!: FormGroup;
  messages$: Observable<any[]>;

  constructor(private formBuilder: FormBuilder, private auth: Auth, firestore: Firestore) {
    this.createMessageForm = this.formBuilder.group({
      message: formBuilder.control('', [Validators.required, Validators.minLength(6)])
    })
    const uid = this.auth.currentUser?.uid;
    const result = query(collection(firestore, 'messages'), where("uid", "==", uid));
    console.log(result);
    this.messages$ = collectionData(result);
  }

  ngOnInit(): void {
    console.log(this.auth.currentUser);
  }

  public onSubmit(): void {
    this.saveMessage(this.createMessageForm.value.message)
    this.createMessageForm.reset();
  }

  // Saves a new message to Cloud Firestore.
  private async saveMessage(messageText: string) {
    try {
      const uid = this.auth.currentUser?.uid;
      await addDoc(collection(getFirestore(), 'messages'), {
        uid: uid,
        email: this.auth.currentUser?.email,
        text: messageText,
        timestamp: serverTimestamp()
      });
    }
    catch (error) {
      console.error('Error writing new message to Firebase Database', error);
    }
  }

}
```

## References

- [Building a web application with Angular and Firebase](https://developers.google.com/codelabs/building-a-web-app-with-angular-and-firebase)
- [Angular Firebase Tutorial](https://www.youtube.com/playlist?list=PL1UHgDbN7Tm4SZ6yLE9yDI-YDtf02uc7d)
- [Github Repository](https://github.com/Haddley/haddley-angular)
