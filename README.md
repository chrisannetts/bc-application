# Chris Annetts' Basecamp Application

This is Chris Annetts' Basecamp Application static site build. It uses [Pug](https://pugjs.org/api/getting-started.html) for the templating, [npm](https://www.npmjs.com/) for client side dependencies, [Sass](https://sass-lang.com/) for styling and [Webpack](https://webpack.js.org) for the build.

## Initial Setup

First, install [Homebrew](https://brew.sh) and use it to set up [NVM](https://github.com/creationix/nvm) (Node Version Manager):

```
brew install nvm
```

Then, install the required version of node and install the dependencies for the project:

```
nvm install 0.37.2
nvm use
npm install
```

## Usage

- Run `npm run start` run the development server
- Run `npm run deploy` to build a production ready version of the site and deploy it to https://bc-application.chrisannetts.com

## Development Notes

- Once started, the development server should be viewable at http://localhost:3000.
- Changes to Pug and JavaScript files should automatically reload the page.
- Changes to SCSS will not automatically reload the page.
- When you add new files, you'll need to restart the development server for them to be picked up.
