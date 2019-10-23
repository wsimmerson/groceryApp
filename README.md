# GroceryApp

This app was built to be a simple tool for my wife and I to manage grocery lists.  Other programs we have tried havent updated as quickly or accurately.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Security
While we cannot yet prevent prople from signing up, we can deny access to those we do not explicitly allow to access data.

Add a allowed_users collection and create documents with the uid of the user as the document id, then implement the below rules.

## Firestore Rules
```$xslt
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if exists(/databases/$(database)/documents/allowed_users/$(request.auth.uid))
    }
  }
}
```
