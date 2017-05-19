# vue-library-template

> A [Vue-cli](https://github.com/vuejs/vue-cli) fork of the [full-featured Webpack setup](http://vuejs-templates.github.io/webpack) with hot-reload, lint-on-save, unit testing & css extraction.
> Adjusted for library development (ie. creating components to be imported into other projects via npm).
> Includes docs site so you can release documentation online for your library.
> This template is Vue 2.0+ compatible. 

Features:  

1. Easily build your component and publish it for other people to include in their projects.  
2. Optionally include: 
    - Vue eslint config 
    - Stylus
    - Pug (Jade)
    - Bulma  
3. Easily build SPA for a docs/demo site to show off your library.  
4. Build and write changes to disk when running dev-server. Useful for when you are developing packages simultaneously where one package depends on the other (using [npm link](https://docs.npmjs.com/cli/link)).

## Usage

This is a project template for [vue-cli](https://github.com/vuejs/vue-cli). **It is recommended to use npm 3+ for a more efficient dependency tree.**  

#### Run the Cli, Install Node_modules, and Start the Dev Server

``` bash
$ npm install -g vue-cli
$ vue init prograhammer/vue-library-template my-project
$ cd my-project
$ npm install
$ npm run dev
```

If port 8080 is already in use on your machine you must change the port number in `/config/index.js`. Otherwise `npm run dev` will fail.

#### Update Library Entry

Let's suppose you created a component called **Hello** that you want other folks to use in their projects. Export your library using the entry point like this:  

*/src/lib.js*
```javascript
import Hello from './components/Hello'

export default Hello  // <-- you could also export more modules than just the default
```

#### Update Docs Site Entry

*/src/docs.js*
```javascript
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
```

#### Let's Build

``` bash
$ npm build        # this builds your library
$ npm build:docs   # this builds your docs site
$ npm build:all    # (optional) this builds both
```

Check your */dist* folder and you'll see some output like this:  

```
/dist
   /docs
      /css
      /js
   /lib
      hello.min.css
      hello.min.js
      ...
```

And in your *package.json* you'll notice:  

*package.json*

```json
  "main": "dist/lib/hello.min.js",
```

#### Publish!

1. If this is your first time publishing an npm package, you need to register a username/password with `npm adduser`.  
2. Make sure the version number set in *package.json* is correct, as you won't be allowed to publish to a version number more than once.  
3. Check https://www.npmjs.com/package/your-package-name-here where `your-package-name-here` is the the name you want to see is available.   You'll get a nice 404 if the package name is not being used.  

Now just publish:  

``` bash
$ npm publish   # Note: This will run build:all before publishing. See package.json prepublish (hook).
```

#### Import it to another Project as an ES6 Module

If you've made your package public (via package.json `private:false`) then other developers can install it:  

``` bash
$ npm install hello --save-dev
```

Then just import anywhere, for example a Vue file:  

```javascript
import Hello from 'hello'  // <-- hello is the name you gave to your project when you ran the Cli

export default {
  components: { Hello },
  // ...

```

#### Don't Forget to Put your Docs Site Online

The */dist/docs* folder contains your docs site. Don't forget to copy these files to your server or github pages where you can demo your library and show documentation for other's to see.  
  
Enjoy!  


## What's Included

- `prepublish`: Npm prepublish hook so you can run `npm publish` and both your library and docs are built first.

- `npm run dev`: Shortcut to run both dev:lib and dev:docs in parallel using [npm-run-all](https://github.com/mysticatea/npm-run-all).

- `npm run dev:lib`: Runs webpack watch mode on your library so file changes are built and re-written to disk automatically (useful for [npm link](https://docs.npmjs.com/cli/link) situations).

- `npm run dev:docs`: Runs both the development server for your docs/demo site.

- `npm run build`: Shortcut to run both build:lib and build:docs.

- `npm run build:lib`: Production ready build of your library as an ES6 module (via UMD), ready to import into another project via npm.

- `npm run build:docs`: Production ready build of your docs site for your library. Put this build online so you can demo your library to the world and provide documentation.

## What's So Different from the Vue-cli Webpack Template

#### package.json

A few changes oriented more towards OSS library development:  

```json
  "version": "0.0.1",
  "private": false,
  "license": "MIT",
```

#### webpack.lib.conf.js

Configuration to build a library from your library entry:

```javascript
baseWebpackConfig.entry = {
  '{{ name }}': './src/lib.js'
}

var webpackConfig = merge(baseWebpackConfig, {
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsLibPath('[name].min.js'),
    library: '[name]',
    libraryTarget: 'umd'
  },

  //...
```

#### Default Linter Plugin Set to Vue

The default linter plugin & config has been updated in the Cli to be Vue's [eslint-plugin-vue](https://github.com/vuejs/eslint-plugin-vue) and configuration [eslint-config-vue](https://github.com/vuejs/eslint-config-vue).  
  
Note: Vue has already added this as default to the next release of the webpack template: https://github.com/vuejs-templates/webpack/pull/652#issuecomment-300354318  

#### Stylus, Pug, Bulma

In the Cli, you can choose to also include Stylus, Pug (formally Jade), and Bulma (A light CSS/SASS-only UI framework, helpful for building your demo/docs site).

#### docs.js

The entry point has been changed from */src/main.js* to */src/docs.js* because the SPA you are releasing is your docs site.  
Note: Your library and vendors are chunked out into separate files and included in your index.html file automatically.

#### Vue build default

In the Cli, switches the default to be the smaller Runtime build since most people don't reference templates outside of .vue files. (So you can just press 'Enter' key for 'yes')

#### Write File Changes to Disk When Running Webpack Dev Server

In many instances you are working on a libary and are likely to be writing it for a bigger parent project you are simultaneously working on. Using webpack's watch mode, we can write/build files to disk while running the dev server. First connect your packages using [npm link](https://docs.npmjs.com/cli/link) then do `npm run dev`. You'll notice each time you make a change to your library, the */dist/lib* folder get's updated with the new build. If you are simultaneously running the dev server in your parent project (don't forget, check *config/index.js* to ensure projects are on different ports!) then you'll notice the changes take effect immediately.

Here's where watch is actived:

*package.json*

    "scripts": {
      // ...

      "dev": "npm-run-all --parallel dev:lib dev:docs",
      "dev:lib": "webpack --config build/webpack.lib.conf.js --watch --progress --hide-modules", // <-- watch flag added
      "dev:docs": "node build/dev-server.js",

You'll notice we are using [npm-run-all](https://github.com/mysticatea/npm-run-all) to run the dev-server and webpack watch npm scripts in parallel. This is nicer since we forked from the original vue-cli webpack template. The other route we could have taken is to run both using `webpack-hot-middleware` (thanks to github user [ywmalil](https://github.com/ywmail)'s answer [here](https://github.com/webpack/webpack-dev-server/issues/641)'):

*alternative approach (shown here for demonstration purposes)*

    const firstConfig = require('./config/first');
    const secondConfig = require('./config/second');

    let express = require('express');
    let middleware = require('webpack-dev-middleware');
    let app = express();

    // Dev Server
    [firstConfig, secondConfig].forEach(function (config) {
        let compiler = webpack(config);
        app.use(middleware(compiler, {
            publicPath: config.output.publicPath
        }));

        // Enables HMR
        app.use(webpackHotMiddleware(compiler, {
            log: console.log, path: config.output.publicPath + '__webpack_hmr', heartbeat: 10 * 1000
        }));

    });


    let server = app.listen(18088);

#### Removed dist from .gitignore

The `dist` folder is removed from .gitignore so that it's available on npm (unless you create a separate .npmignore) and user's who want the minified built distribution of your library can grab it (located in `/lib` subfolder). Also your docs site built distribution is made available in the same folder (located in `/docs` subfolder).  
