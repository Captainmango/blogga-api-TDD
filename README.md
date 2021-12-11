# Blogga API - TDD Integration Test Exercise

## Premise

So, you want to learn TDD? The best way to learn is by doing. So, imagine you're working at a super cool new start-up called Blogga. Your job is to create an API that is able to serve posts and comments to users. Right now though, you're focusing on the management of posts and comments first, seeing how that is going to be the bread and butter of the product you're shipping.

Because Blogga is going to be the next big thing, you NEED to make sure the app you make can scale well. So, you're following some good architecture with your directory structure, expecting things to change rapidly with development. But, it isn't quite enough. You're going to need to test your software. As you know you're going to be iterating quickly, you need to know before your app is live if something is broken. How can your app be the next big thing if it 500s every time someone goes to the wrong place?

It seems like someone has implemented some tests for you already in PostController.test.js. Nice. But, some of the functionality in the controller is missing and tests for comments still need to be written. Somehow, you also have to have your app load posts with comments. Seems like there's a lot to do, but there's no time like the present.

## Usage


## Acceptance Criteria

- [ ] Variables are typed as much as possible
- [ ] All branches of functions are handled within themselves and do not leak data
- [ ] Separate concerns. Keep the controller functions lean
### Manage Posts
- [ ] CRUD operations can be done on posts
- [ ] There are appropriate responses when incorrect params are sent
- [ ] There are no 500 errors returned from any routes
- [ ] All responses should be in JSON

### Manage Comments
- [ ] CRUD operations can be done on comments
- [ ] There are appropriate responses when incorrect params are sent
- [ ] There are no 500 errors returned from any routes
- [ ] All responses should be in JSON

### Data Relationships
- [ ] Migrations for posts and comments remain unchanged (this includes **pre-existing fields on the entities**)
- [ ] Posts have a has many relationship to comments
- [ ] Comments belong to a single post (this cannot be changed)
- [ ] Comments are loaded with their post when the comment is fetched (to avoid n+1 problems)
- [ ] Posts are loaded with their comments when the post is fetched


## Helpful resources
* [TypeORM - look here to understand migrations](https://github.com/typeorm/typeorm)
* [Express - look here to work out how to make controllers and use express](https://expressjs.com/en/guide/routing.html)
* [Jest - see how to write tests and what matchers are available](https://jestjs.io/docs/using-matchers)
