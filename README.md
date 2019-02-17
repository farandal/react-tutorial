# react-tutorial - Writing a React/Redux application

The React library was released in 2011 by Facebook, and since then, now in 2019 is taking the advantage over other frameworks like Angular and VueJs. I will be concise in this article, and I will go through the process of creating a React JS application, with focus in the challenges I had when I was studying this framework.

# Articles in Medium

https://medium.com/@farandal/writing-a-react-js-application-part-1-introduction-to-react-28eb61f95d50
https://medium.com/@farandal/writing-a-react-js-application-part-2-setting-up-a-minimal-react-application-754ee31b2344
https://medium.com/@farandal/writing-a-react-js-application-part-3-setting-up-a-minimal-redux-implementation-9158b85fb59d

# What is React?

React is a frontend Javascript library to handle the View layer in a SPA (Single Page Application); it’s architecture allows to create reusable components in UI (User Interfaces), and based on the concept of immutable states, every component has an object to store data called ‘state’.

Some people says React is not a framework, but a Library; this is more likely because other libraries needs to be coupled onto it, to add other necessary features for a fully functional application, for example for Navigation or Redux for state management.

# React uses Virtual DOM

React relies on Virtual DOM to render Elements into the browser DOM; it was not invented by React, but Facebook uses it and provides it for free.

To put it in simple terms; the browser holds a Virtual representation of the UI in memory, and React whenever there is a change in the state of a component, re-renders only the portions of the DOM that needs to be updated. In essence, the changes in the DOM are preprocessed in the Virtual Dom, and then there is a sync process that computes the elements in the Real DOM that needs to be updated; In React flow this is called reconciliation.

## DOM

(Document Object Model) is an abstraction of a structured text, where HTML Tags become nodes in the DOM. While HTML is a text, the DOM is an in-memory representation of this text in form of nodes. The DOM provides an interface (API) to traverse and modify the nodes, and It contains methods like getElementById or removeChild.

## Virtual Dom?

The Virtual DOM is an abstraction of the DOM. It is lightweight and detached from the browser-specific implementation details. Since the DOM itself was already an abstraction, the virtual DOM is, in fact, an abstraction of an abstraction.

## Wait, but Why?

In modern SPA web development, all the UI components are in memory, and the UI requires constant changes; and consider a DOM made of thousands of divs and many changes, The HTML DOM is always tree-structured and can be traversed easily, but if we are constantly performing changes to our DOM, it is slow!.

This amounts of interactions with the DOM can make the user experience really slow, as every render update in the browser takes time; so there needs to be a way to do this process of rendering more efficient; and the magic to minimize the render requests to the browser and to achieve higher performance of the app, relies in a process that React calls ‘reconciliation’, which compare the changes in the Virtual DOM, and map the updates to the Real DOM only in the portions of the DOM that are required to be updated.

# React uses JSX

JSX is a JS ES6 feature, and is used for templating.
JSX is simple JavaScript which allows HTML quoting and uses HTML tag syntax to render components. React takes and process this HTML syntax into JavaScript calls to the React Library. At the end, this means we can write HTML within Javascript, and also provides other features:

In essence JSX is a string that uses (`) instead of (‘, or “) to quote.
Allows to write html tags
Allows the injection of variables within using \${varname}
Allows multiline without worrying about escaping
Allows inline numerical operations.

# About ‘State’

The most important thing is to rewire our brains regarding the data bindings and immutable states. The state is permanently bind to anywhere in the scope is being used; and is used to store the current state of a component in a key value pair format, that means there is no need to pull the value for a certain key when it’s used in your application.

It will be binded automatically wherever you are using that property within your component, and it’s called inmutable, because it’s not allowed to mutate your state properties directly assigning a new value to one of its properties, rather, this needs to be done through a function, where in React is called setState(), to be called within the scope of your component.

That means if your state is for example: this.state = { loggedIn: true }, and you have a UI component that is using that property to hide the user login button, is as simple as { state.loggedIn ? <LogoutButton/> : <LoginButton/> } in the render lifecycle of your component.

# About ‘Immutability’

Treat this.state as if it were immutable; React API provides a setState method to make changes in the component state and we have to be careful to always use the setState method and never manipulate this.state directly. Suppose we want to add an item to the items Array without mutating the state directly.

```javascript
updatedItems = this.state.items;
updatedItems.push('Item');
this.setState({ items: updatedItems });
```

In this case we’re not making a copy of the array, we are just creating a reference to the same state array and assign it to updatedItems; Further on, by using the array method push, we end up mutating the state.items directly; breaking the immutability clause.

By manipulating this.state directly you are circumventing React’s state management, which can cause when calling setState() afterwards may replace the changes/mutations made.

The alternative is to create a copy of the objects in this.state and manipulate the copies, assigning them back using setState(), or use non-destructive methods in javascript (Map, Filter, concat) which returns a new object, not a reference.

```javascript
//In case of Arrays
let updatedItems = this.state.items.concat('new Item'); //non-destructive method
this.setState({ items: updatedItems });
//In case of Objects
var updatedItem = Object.assign({}, this.state.item, { name: 'new Item' });
this.setState({ item: updatedItem });
```

Further readings:
https://blog.logrocket.com/immutability-in-react-ebe55253a1cc

# Anatomy and Lifecycle of a component

```javascript
import React from 'react';

class MyComponent extends React.Component {
  // the constructor is optional, but a core part of any class and part of the ES6 OOP standard.
  // In React is useful to set the initial state and binding functions.
  constructor(props) {
    // inherits the properties from the higher component, in this case React.Component
    super(props);
    // 'state' is a reserved name, used to store your component data.
    // I will initiate the state with a property called name on it
    this.state = {
      name: 'farandal'
    }
  }

  //Mounting Lifecycle methods:
  static getDerivedStateFromProps(props,state) { ... }
  componentDidMount()
  //Update Lifecycle methods:
  shouldComponentUpdate() { ... }
  getSnapshotBeforeUpdate() { ... }
  componentDidUpdate(props,state) { ... }
  //UnMounting Lifecycle methods:
  componentWillUnmount() { ... }

  // The default main function for a React Component is render(), which returns a JSX template string.
  render() {
    const { name } = this.state//using destructuring, extract the name property from this.state;
    return(
      `Hello $(name)!`
    );
  }
}

export default MyComponent;
```

Further readings:
https://reactjs.org/docs/react-component.html

# Setting up a miminal React application

```bash
git clone --branch v1.0 git@github.com:farandal/react-tutorial.git
cd react-tutorial
npm install
npm start
```

## Table of contents:

* Setting up the project
* Application structure
* NodeJS package and dependencies
* Setting up Babel 
* Setting up WebPack development environment
* Wiring up the minimal functional application

# Setting up the project

Create a folder somewhere in your file system with the name of the project.

If you haven’t setup a git repository for this project, to keep track of the progress, I suggest to init a repository and you can add the origin later, and also create a package.json file necessary to resolve the dependencies of the project from the npm package registry.mkdir react-tutorial 

```bash
cd react-tutorial 
git init
npm init
```

# Application structure
Set up the application files structure in the following way:

* Create a folder called app
* Create an empty index.js in /app folder
* Create a folder called components inside the /app folder, this folder will store our React components.
* Create an empty file called Root.js inside components folder.
* Create an empty file called MyComponent.js inside the components folder.
* Create the Babel config file .babelrc
* Create the webpack.config.js and the webpack.production.config.js files in the root folder
* Create an app.config.js file to hold important config variable for the project. 

File structure should look like this:

```bash
- app
- - components
- - - Root.js
- - - MyComponent.js
- - index.js
- - app.config.js
- package.json
- .babelrc
- webpack.config.js
```

# NodeJS package and dependencies
Please refer to https://nodejs.org, in order to download the right version for your system, if you do not have it already.  

The package.json file is the main configuration / manifest file for a NodeJs package, and it also contain the dependencies for the project that will be resolved from the npm registry. It can be created manually, or it can be created using the npm assistant by running npm init.  
```bash
npm init
```

Follow the instruction for the npm init command as it is requested, and it will generate a package.json file that will look like this:

```javascript
{
  "name": "react-tutorial",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
  },
  "author": "@farandal - Francisco Aranda <farandal@gmail.com>",
  "license": "ISC"
  "dependencies": {}
  "devDependencies": {}
}
```

Modify the package.json file with your editor, and add the dependencies blocks in it.  

```javascript
"dependencies": {
   "@babel/plugin-proposal-class-properties": "^7",
   "babel-plugin-transform-runtime": "^6.23.0",
   "babel-preset-es2015": "^6.24.1",
   "babel-preset-react": "^6.24.1",
   "cross-env": "5.2.0",
   "react": "16.6.1",
   "react-dom": "16.6.1",
   "react-hot-loader": "4.3.12"
 },
 "devDependencies": {
   "@babel/cli": "^7",
   "@babel/core": "^7",
   "@babel/preset-env": "^7",
   "@babel/preset-react": "^7",
   "@babel/preset-stage-2": "^7",
   "@babel/register": "^7",
   "babel-core": "^7.0.0-bridge.0",
   "babel-loader": "8.0.3",
   "babel-preset-react-hmre": "1.1.1",
   "copy-webpack-plugin": "^4.6.0",
   "css-hot-loader": "1.4.2",
   "css-loader": "1.0.1",
   "extract-text-webpack-plugin": "4.0.0-beta.0",
   "file-loader": "1.1.11",
   "node-sass": "4.10.0",
   "open-browser-webpack-plugin": "0.0.5",
   "react-addons-test-utils": "15.6.2",
   "react-test-renderer": "16.6.0",
   "regenerator-runtime": "0.13.0",
   "rimraf": "2.6.2",
   "sass-loader": "7.1.0",
   "style-loader": "0.23.1",
   "uglifyjs-webpack-plugin": "1.3.0",
   "url-loader": "1.1.2",
   "webpack": "4.19.1",
   "webpack-cli": "3.1.2",
   "webpack-dev-server": ">=3.1.11",
   "html-webpack-plugin": "^3.2.0"
 }
 ````
 
After adding the dependencies into your package.json file, then you can run yarn or npm  from your root directory to install the dependencies; that will resolve the dependencies and install the packages into your ./node_modules folder. 

```bash
cd react-tutorial 
npm install
```

# Setting up Babel
Babel is a ‘transpiler’; Basically, all Javascript ES6 (JSX) features are not yet supported by all contemporary browsers, Babel will convert the ES6 expressions into normal Javascript ES5 syntax to be interpretable by all browsers. 

Babel.js is a free and open-source JavaScript compiler and configurable transpiler used in web development. Babel allows software developers to write source code in a preferred programming language or markup language and have it translated by Babel into JavaScript, a language understood by modern web browsers. (Wikipedia)

https://babeljs.io/

Create a file called .babelrc in the root of your project containing this line:

```javascript
{
 "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

The .babelrc file is your local configuration for your code in your project. It will affect all files that Babel processes that are in the same directory or in sibling directories of the .babelrc

### @babel/preset-env: is used for compiling Javascript ES6 to ES5

### @babel/preset-react: to compile JSX to Javascript ES5

We have added the dependencies in our package.json file in the previous step, so skip this command; nevertheless, you can execute the npm command to install the dependencies manually. 

```bash
npm i @babel/core babel-loader @babel/preset-env @babel/preset-react --save-dev
```

# Setting up WebPack development environment
The main purpose of WebPack is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset. https://webpack.js.org

WebPack is a build tool for web applications based on Javascript; it allows to minify, uglify, concatenate and to perform many other operations in the files of your project to generate a distributable version.

WebPack also comes with a webpack-dev-server; a basic http web dev server that comes with features like HMR Hot module replacement which allow a better developing experience.

To enable WebPack, the minimum configuration required is to create a webpack.config.js file in the root of your project indicating that all .js or .jsx files will use the babel-loader except the files within the node_modules folder. 

Webpack works based on the concept of ‘loaders’. A loader basically recognise when a file is required, takes that input, perform the changes and return the desire output. 

```javascript
module.exports = {
 module: {
   rules: [
     {
       test: /\.(js|jsx)$/,
       exclude: /node_modules/,
       use: {
         loader: "babel-loader"
       }
     }
   ]
 }
};
```

I will not go too deep in WebPack, but just trying to explain how it works, and showing the most important concepts here. 

This is an example file for the development config for WebPack included within this basic project:

https://github.com/farandal/react-tutorial/blob/v.1.0/webpack.config.js

The first lines of the config file, loads the library itself (WebPack), then the rest of the plugins to be used are imported in the following line using Require.

```javascript
const { resolve } = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
const appConfig = require('./app/app.config');
```

The entry block, defines which is the file or the files that are going to be taken as an entry point, to start discovering from there the module dependency hierarchy. 

```javascript
const config = {
  …
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?' + appConfig.development.url + ':' + appConfig.development.port,
    'webpack/hot/only-dev-server',
    'index.js'
  ],
  …
}
```

The devServer block, contains the port of your localhost where you are exposing the web server. 

The Output block, contains information about in which folder the generated files are gonna be created. In this case we define a /dist folder, and a filename called bundle.js which is the file that will contain all your project minified. 

Notice that Webpack will not create a bundle.js file in your file system, as in development mode is created in memory and exposed in the desire virtual location by the embedded development server that webpack provides. 

The plugins Block, contains the operations to be performed by the plugins; In this case, we are invoking ModuleConcatenationPlugin which will concatenate all your files in the bundle.js, then we are calling the CopyWebpackPlugin to copy the images within your app folder to be exposed by the webserver into /images, then we have the HtmlWebpackPlugin that will take any HtmlTemplate file defined and will inject the necessary dependencies such as the script tag containing the bundle.js reference in the body of the HTML and it will create the generated new html file in /dist/index.html. 

Ultimately, OpenBrowserPlugin will be called to open your browser with the dev-server url, and then the Hot Module Plugin is activated. 

```javasacript
plugins: [
   ...
   new webpack.optimize.ModuleConcatenationPlugin(),
   new CopyWebpackPlugin([
     { from: resolve(__dirname, 'app') + '/assets/images', to: 'images' }
   ]),
   new HtmlWebpackPlugin({
     template: HtmlTemplate,
     filename: resolve(__dirname, '/dist') + '/index.html',
     inject: 'body'
   }),
   new OpenBrowserPlugin({
     url: appConfig.development.url + ':' + appConfig.development.port
   }),
   new webpack.HotModuleReplacementPlugin()
 ],
```

# Wiring up the minimal functional application

The index.js will be the main entry point for your application, The first 2 lines imports the React library, then the react-hot-loader is imported for HMR, and then we import the component called Root, which will be the first component to load into our components hierarchy.

render(Root) will call the render lifecycle Component method and if HMR is enable, it will watch the ./components/Root file for changes, then it will re render the component within the Component tag inside the AppContainer.

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
//Webpack hot loader plugin.
import { AppContainer } from 'react-hot-loader';
//Main entry point of the application
import Root from './components/Root';
const render = Component => {
 ReactDOM.render(
   <AppContainer>
     <Component />
   </AppContainer>,
   document.getElementById('root')
 );
};
/*
 The root component is in a separate file,
 because we are using the Webpack hot loading feature
*/

render(Root);

/*
If webpack hot loader is enabled, it will listen  root.js file for modifications;
if something has been change in the file, it will re render the module.
*/

if (module.hot) {
 module.hot.accept('./components/Root', () => {
   const newApp = require('./components/Root').default;
   render(newApp);
 });

}
```

### Hot Module Replacement (HMR): https://webpack-gatsby.netlify.com/how-to/set-up-hmr-with-react/

## Root Component
Root will be the first file to load into our components hierarchy. It doesn't do anything particularly, it just return the <App /> component which you can point to any component within your application later.

```javascript
import App from './Home'; To, import App from './MyOwncomponent';
app/components/Root.js

import React from 'react';
import App from './Home';

const Root = () => {
  return <App />;
};

export default Root;
```

## Home Component

Home will be our main functional component, it will read a property from our app.config.json file, and display it within a React Component

In the home component, the app.config.js file is loaded in the second line, the when the React Component is mounted initially the constructor method of the class will be called, and we will set the config.appname property into the State of the component. Then in the Render method of the component we will render the property using JSX. 

The most important part about React, is to be aware, that the state is automatically bound to the 'view'. that means if the state property change, that change will be automatically updated into the view without any kind of listeners. 

### app/components/Home.js

```javascript
import React from 'react';
import config from '../app.config';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: config.appname
    };
  }

  render() {
    const { name } = this.state; 
    return <div>{name}</div>;
  }
}

export default Home;
```

### app/app.config.js
```
const config = {
  appname: '@farandal',
  development: { url: 'http://localhost', port: 8888 },
  production: {}
};

module.exports = config;
```

Up to this point we have a minimal ReactJS application step by step.
Add this line of code to your package.json file to add a start script for your app

```javascript
...
"scripts": {
    ...
    "start": "webpack-dev-server --open --mode development",
    ...
```

Then execute npm start to execute the start script defined in the package.json file. 

```javascript
npm start
```

or run the command directly in your terminal  

```bash
webpack-dev-server
```
