# BackOffice

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.0.5.

## Development server

To start a local development server, run:

```bash
ng serve
```

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

# Notes

Since ngrx has not been updated to v20 yet, we have to install it using `--legacy-peer-deps`

```bash
npm install @ngrx/store@19 @ngrx/effects@19 @ngrx/entity@19 @ngrx/store-devtools@19 --legacy-peer-deps
```
