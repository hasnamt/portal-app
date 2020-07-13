# PostsApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.2.

This frontend app will allow user to view a list of submissions posted by users.
Also this app gives the feature of adding a new submission by clicking on the POST

when user click on the post after entering the text, it will check whether user already authenticated.
If not authenticated, popup will prompt to enter google username and password and user will get authenticated.
Once user is authenticated it wilThil call the webservice to save the text value that user entered.

It gets the weather deatils and location details by calling weather API and Location API

This App also provides the ablility to reply/respond to an existing post.

To Add a new post or to add a user has to authenticate by signin (entering username and password- using google oauth2)

This frontend app will use google oauth2 authentication and authorization code flow for getting user accesstoken

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
