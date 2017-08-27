# vue-library-template

> A [Vue-cli](https://github.com/vuejs/vue-cli) template based on the [Vuejs full-featured Webpack setup](http://vuejs-templates.github.io/webpack) with hot-reload, lint-on-save, unit testing & css extraction.
> Adjusted for library development (ie. creating components to be imported into other projects via npm).
> Includes docs site so you can release documentation online for your library.
> This template is Vue 2.x compatible. 

Features:  

1. Easily build your component and publish it for other people to include in their projects.  
2. Optionally include: 
    - Sass/SCSS 
    - Stylus
    - Pug (Jade)
    - Buefy/Bulma  
3. Easily build SPA for a docs/demo site to show off your library. (Works great for GitHub Pages)  
4. Simultaneous package development: Build and write changes to disk when running dev-server. Useful for when you are developing packages simultaneously where one package depends on the other (using [npm link](https://docs.npmjs.com/cli/link)).

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

This is your SPA entry point for your Docs website. Create some documentation pages for your library and make any changes you need here.

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

#### Update index-template.html

This is your template for index.html. Add anything you need here that you want to show up in your built index.html.   
  
Note: The reason I've updated the configuration to use *index-template.html* instead of *index.html* is because 
GitHub Pages will look for the built index.html in your repo's root when you upload it. See the section 
[Don't Forget to Put your Docs Site Online](#dont-forget-to-put-your-docs-site-online) further down.

#### Add externals

If you are using certain dependencies (ie. Lodash, jQuery, etc.) that you think clients would more likely provide 
in their own project or in their site directly as a script globally (such as from a CDN) then you can use 
Webpack's externals configuration for this. You can [read more here](https://webpack.js.org/guides/author-libraries/#add-externals).  

#### Let's Build

``` bash
$ npm build        # This builds both your library and your docs/demo SPA.
$ npm build:lib    # This builds just your library.
$ npm build:docs   # This builds just your docs/demo SPA.
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
$ npm publish   # Note: This will run npm build before publishing. See package.json prepublish (hook).
```

Your package is now both on NPM and the Unpkg CDN (https://unpkg.com/your-package-name-here).  

#### Import it to another Project as an ES6 Module

If you've made your package public (via package.json `private:false`) then other developers can install it:  

``` bash
$ npm install hello --save-dev
```

Then just import anywhere, for example a Vue file:  

```javascript
import Hello from 'hello'           // <-- hello is the name you gave to your project when you ran the CLI.
import '~hello/dist/lib/hello.css'  // <-- If your library has styles, you can import those too.

export default {
  components: { Hello },
  // ...

```

#### Don't Forget to Put your Docs Site Online

The */dist/docs* folder contains your docs site. Don't forget to copy these files to your server or GitHub Pages where you can demo your library and show documentation for other's to see. For Github pages, go to your repo > Settings > GitHub Pages > Source > master branch (note: You should already have setup your own GitHub Pages github.io repo). This will look for `index.html` in your repo's root folder and configure it automatically so that `my-username.github.io/my-project/` will load your repo's docs site.
  
#### You Can Work on Your Library at the Same Time You Work on Your Project

See the *Simultaneous Package Development* section further down.  

Enjoy!

## What's Included

- `prepublishOnly`: Npm prepublish hook so you can run `npm publish` and both your library and docs are built first.

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

#### Add Vue Recommendations to the Default Linter Standard

The [Vue Eslint Plugin](https://github.com/vuejs/eslint-plugin-vue) now comes with the recommended rules configuration included that you can add to whatever rules you are using (ie. Standard). Since this seems to be the most typical way to develop in Vue, I've added this plugin along with the Standard linter option (default).    
  
**Update:** The plugin [does not yet work with templates other than HTML](https://github.com/vuejs/eslint-plugin-vue/issues/165). So for now, I've reverted it back 
to the setup used in Vue's official Webpack template (which this template is forked from).  

#### Stylus, Pug, Bulma

In the Cli, you can choose to also include Stylus, Pug (formally Jade), and Buefy (A light Vue UI components framework that uses the popular Bulma CSS/SASS-only UI framework) which is helpful for building your demo/docs site).

#### docs.js

The entry point has been changed from */src/main.js* to */src/docs.js* because the SPA you are releasing is your docs site.  

Note: Your library and vendors are chunked out from your docs into separate files and included in the *index.html* file automatically. This should give a little more flexibility to improve caching on your docs/demo website.

#### Vue build default

In the Cli, switches the default to be the smaller Runtime build since most people don't reference templates outside of .vue files. (So you can just press 'Enter' key for 'yes')

#### Simultaneous Package Development

In many instances you are working on a library and are likely to be writing it for a bigger parent project you are simultaneously working on. Using webpack's watch mode, we can write/build files to disk while running the dev server. First connect your packages using [npm link](https://docs.npmjs.com/cli/link) then do `npm run dev`. Notice each time you make a change to your library, the */dist/lib* folder get's updated with the new build. If you are simultaneously running the dev server in your parent project (don't forget, check *config/index.js* to ensure projects are on different ports!) then you'll notice the changes take effect immediately across packages.

Here's where watch is activated:

*package.json*

    "scripts": {
      // ...

      "dev": "npm-run-all --parallel dev:lib dev:docs",
      "dev:lib": "webpack --config build/webpack.lib.conf.js --watch --progress --hide-modules", // <-- watch flag added
      "dev:docs": "node build/dev-server.js",

You'll notice we are using [npm-run-all](https://github.com/mysticatea/npm-run-all) to run the dev-server and webpack watch npm scripts in parallel 
(and it's cross-platform). You could also look into Webpack's multi-compiler mode example: 
https://github.com/webpack/webpack/tree/master/examples/multi-compiler.

#### index-template.html instead of index.html

Since GitHub wants the built index.html to reside in the repo's root, we'll need to using another file for the template. Use the file 
*index-template.html* instead. (We updated the *HtmlWebpackPlugin* configuration in *webpack.dev.conf.js* and *webpack.prod.conf.js* to look 
for the template file named *index-template.html*)  

#### Some Additional Meta Tags

These additional meta tags are included in your *index-template.html*:

    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <meta http-equiv="x-ua-compatible" content="ie=edge">

#### Removed */dist* from .gitignore

The `dist` folder is removed from .gitignore so that it's available on npm (unless you create a separate .npmignore) and user's who want the minified built distribution of your library can grab it (located in `/lib` subfolder). Also your docs site built distribution is made available in the same folder (located in `/docs` subfolder).  
