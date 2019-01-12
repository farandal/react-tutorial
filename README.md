# react-tutorial - Writing a React/Redux application

The React library was released in 2011 by Facebook, and since then, now in 2019 is taking the advantage over other frameworks like Angular and VueJs. I will be concise in this article, and I will go through the process of creating a React JS application, with focus in the challenges I had when I was studying this framework.

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

# Creating a React app with ‘Create-React-App’

There are multiple ways and many boilerplates to start with a React app from scratch, but this is the Facebook supported starter kit we are going to use: https://github.com/facebook/create-react-app

## STEP 1

```bash
//For npm < 5.1 install create-react-app globally:

$npm install -g create-react-app
$create-react-app my-app

//For npm 5.2+ use npx:

$npx create-react-app my-app
$cd my-app
$npm start
```

### Wait but wait! what is Npx?

Npx is a CLI tool to improve the experience of using packages from the npm registry. The major benefit is that when you install a local dependency using npm -i, it will not be executable in the local path. npx will check whether <command> exists in \$PATH, or in the local project binaries in the node_modules folder.

https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b
https://stackoverflow.com/questions/50605219/difference-between-npx-and-npm
https://blog.npmjs.org/post/162869356040/introducing-npx-an-npm-package-runner
