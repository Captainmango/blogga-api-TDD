# Blogga API - TDD Integration Test Exercise

## Premise

So, you want to learn TDD? The best way to learn is by doing. So, imagine you're working at a super cool new start-up called Blogga. Your job is to create an API that is able to serve posts and comments to users. Right now though, you're focusing on the management of Posts and Comments first, seeing how that is going to be the bread and butter of the product you're shipping.

Because Blogga is going to be the next big thing, you NEED to make sure the app you make can scale well. So, you're following some good architecture with your directory structure, expecting things to change rapidly with development. But, it isn't quite enough. You're going to need to test your software. As you know you're going to be iterating quickly, you need to know before your app is live if something is broken. How can your app be the next big thing if it 500s every time someone goes to the wrong place?

It seems like someone has implemented some tests for you already in PostController.test.ts. Nice. But, some of the functionality in the controller is missing and tests for comments still need to be written. Somehow, you also have to have your app load posts with comments. Seems like there's a lot to do, but there's no time like the present.

## The goal

The goal of this repo is to create functionality driven by tests, thereby learning TDD in a more realistic setting.

 > PLEASE WRITE TESTS BEFORE WRITING CODE

Correct TDD practise is to write a failing test _first_, then get it passing. Ideally, once you've done this, look to refactor the implementation and ensure the code still passes the test in question. The test files are in the tests directory. The repo is complete once all API functionality is built out and the Acceptance Criteria (ACs) below are met.

There is implementation code in PostController.ts for some of the tests in the respective test file to use as a base. However, this is not the best possible implementation and could be refactored to be much leaner. As a **bonus** point, look to refactor the controller functions. All test files have the tests stubbed out. Removing the `.todo` will allow the test to run.

If you only want to run one test at a time (this is a little bit faster, around 2-3 seconds or so on average) add `.only` to the test like so:

```javascript
it("POST /posts/{post_id}/comments returns 404 if post does not exist")

// becomes

it.only("POST /posts/{post_id}/comments returns 404 if post does not exist")

```

> PLEASE DO NOT COPY AND PASTE CODE

Type as much as possible. The goal of this is to learn how to follow TDD. Use the ACs to guide you and focus on working through the models first. The best starting point would be to run the test suite and see what is failing. All tests may also not be as they appear. Read each test carefully and ensure you understand what each test is testing for and how each test is arranging its dependents.

## Usage

Fork the repo so it is in your list of repos. Then, clone the repo to be on your local machine.

Once done, run the below to install dependencies

```javascript

$ npm install

```

Check the package JSON for the scripts that are available. This repo uses MikroORM to handle db ops and seeding and Express as the HTTP server.

You can run the whole test suite with the command:

```javascript

$ npm test

```

If you do this without having migrated the database, you will get an error. The command to migrate the database is:

```javascript

$ npm run migrations:run

```

When you do this, you will see the terminal output that the migration has been applied to the database. To see the SQL ran, please check the `migrations` folder. The client used is SQLite. It's recommended to use the `firsttris.vscode-jest-runner` or `kavod-io.vscode-jest-test-adapter` extension if you're using VSCode. This will allow you to run your tests in the test file directly shortening the feedback loop. If there are problems installing this, run the tests via the terminal attaching the modifiers on the test functions as explained above.


## Acceptance Criteria

- [ ] All branches of functions are handled within themselves and do not leak data (no unhandled exceptions or shared objects)
- [ ] Separate concerns. Keep the controller functions lean

### Manage Posts
- [ ] CRUD operations can be done on posts
- [ ] There are appropriate responses when errors happen on the API
- [ ] There are no 500 errors returned from any routes
- [ ] All responses should be in JSON

### Manage Comments
- [ ] CRUD operations can be done on comments (**This doesn't all have to be in one controller**)
- [ ] There are appropriate responses when errors happen on the API
- [ ] There are no 500 errors returned from any routes
- [ ] All responses should be in JSON


## Helpful resources
* [MikroORM - Docs for Repositories and the entity manager](https://mikro-orm.io/docs/entity-manager)
* [Express - look here to work out how to make controllers and use express](https://expressjs.com/en/guide/routing.html)
* [Jest - see how to write tests and what matchers are available](https://jestjs.io/docs/using-matchers)
