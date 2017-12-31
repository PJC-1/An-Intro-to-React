An Intro to React
===================
> Following **StephenGrider**'s tutorial: *Modern React with Redux* on udemy, here's the [link](https://www.udemy.com/react-redux/).
> Bellow are a mix of notes from the tutorial, react documentation, and other sources.

----------

React Concepts
-------------
> **Getting started**
>
> It's a good idea to break up your app into separate components, that isolate as much functionality as possible.
>
> Building small components makes it really easy to reuse code throughout the application.
>
> Only define/create one component per file. No matter how small the component it.
>  

----------

>  *Remember* to import **React** into all all of the components that are created that contain some **JSX**. This is because returning *JSX* will be translated to something like: ``` React.createElement ```, and if **React** is not in the scope of the file, then react will throw an error.
>  

----------

> **Functional Component VS Class Component**
>  A *functional component* in react, is a component that defined as a plain *javascript* function and only returns some *JSX*, which eventually gets rendered to the DOM.
>   
>   example *functional component*:
>    
```
const SearchBar = () => {
  return <input />
};
```
>
>  A *class component* is a more complex react component that is defined using *es6* class syntax and is used whenever you want a component to have some type of internal record keeping, be aware of itself, and be able to know what's happened to it since it's been rendered. The class component is an actual javascript object with *properties* and *methods* to it.
>
> ```extends React.Component``` makes the *Component* class functionality from the *React* library available to the *class*.
>
> When using a *class* based method it requires a way to render itself somehow (return *JSX*).
> Every react component that is class based must have render method.
>
> Here is that same *SearchBar* component as a *class component*:
>  
```
class SearchBar extends React.Component {
  render() {
    return <input />
  }
}
```
>
> A good rule of thumb when deciding whether to use a *functional* or *class* component, would be to start off with a *functional component* and if the component requires additional functionality, then refactor it to a class.
>
> In a *functional component*, properties that are passed down to it from a *parent component* are available to it as an argument.
>
```
// use of props from a functional component
const VideoList = (props) => {
  return (
    <ul className="col-md-4 list-group">
      {props.videos.length}
    </ul>
  );
};
```
>
> In a *class based component*, the component has access to ```this.props``` throughout the component.
>  
```
// use of props in a class based component
class VideoList extends Component {
	render() {
		<ul className="col-md-4 list-group">
			{this.props.videos.length}
		</ul>
	}
}
```


----------

> **State**
>
> *State* is a plain javascript object that is used to record and react to user events.
>  
>  Each *classed based* component that we define has its own state object whenever its own state object.
>   
>   Whenever the state is changed, the component immediately rerenders and also forces all of its *children* to render as well.
>    
>    Before we ever use *state* inside of a component we need to initialize the state object.
>     
> To *initialize* the state we set the property state to a plain javascript object inside of the class's *constructor* method.
>  
> All javascript classes have a special function called **constructor**.
>  
> The constructor function is the first and only function called automatically whenever a new instance of the class is created.
>  
>  The constructor function is reserved for doing some set up inside of our class like initializing variables, initializing state, and other things.
>   

----------

> The **super** keyword is used to access and call functions on a object's parent.
>  
>  Lets take a look at our ``` SearchBar ``` component.
>   
```
import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: '' };
  }

  render() {
    return <input onChange={event => console.log(event.target.value)} />;
  }
}

export default SearchBar;
```
> When defining the *SearchBar* class we are *extending* the *React* class **Component**, which has it's own constructor function. So when we define a method that is already defined on the parent class (**Component**) we can call that parent *method* on the parent *class* by  calling *super*.
>
>  

----------
> For more information about **super**, read this link to the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/super).

> Whenever we use state we initialize it by creating a new object and assigning it to ```this.state```.
> example:
>  
```
  construction(props) {
    super(props);
    this.state = { term: '' };
  }
```
>
> The object we pass will also contain properties that we want to record on the state.
> Inside of the constructor function is the only place where you will use code that ```this.state``` equals an object, everywhere else we will use a method called ```this.setState()```.
>  
> **setState()**
> ```setState()``` enqueues changes to the component state and tells React that this component and its children need to be rerendered with the updated state. This is the primary method you use to update the user interface in response to *event handlers* and *server responses*.
>   
> Think of *setState()* as a request rather than an immediate command to update the component. For better perceived performance, React may delay it, and then update several components in a single pass. React does not guarantee that the state changes are applied immediately.
>  
>

----------

> **Controlled Component**
>  In *HTML*, form elements such as ```<input>```, ```textarea```, and ```<select>``` typically maintain their own state and update it based on user input. In React, mutable state is typically kept in the state property of components, and only updated with ```setState()```.
>   
>  We can combine the two by making the React state be the "single source of truth". Then the React component that renders a form also controls what happens in that form on subsequent user input. An input form element whose value is controlled by React in this way is called a "**controlled component**".
>   
>  With a *controlled component*, every state mutation will have an associated handler function. This makes straightforward to modify or validate user input.
>
> For more **[controlled components](https://reactjs.org/docs/forms.html)**

----------


Flux / Redux
-------------

----------

> **Downward Data Flow (Unidirectional Data Flow)**
>  
>  *Downward Data Flow* is the idea that we want the most parent component in the application to be responsible for *fetching* data.
>   
>  


Debugging React
-------------

----------

> If we try to render a component this way:
```
import React from 'react';
import ReactDOM from 'react-dom';

const App = function() {
  return <div>Hi!</div>;
}

ReactDOM.render(App);
```
> We will receive this error message:
>
> ```Uncaught Error: ReactDOM.render(): Invalid component element. Instead of passing a component class, make sure to instantiate it by passing it to React.createElement.```
>
> This is because when we create a component we are creating a class of a component, of which we can have many different instances of that component.
>
> example:
>
```
 const App = function() {
  return <div>Hi!</div>;
}

```
> Above is an example of a component *class* and **not** an instance.
>  
>  You can think of this object/function as a factory which produces instances of the actual components that get rendered to the DOM.
>  
>  So what happened is we've passed the app **class** to react DOM to render rather than an **instance** of the component. The error is saying to make sure you are making an instance of the component and then pass it to ```ReactDOM.render()```.
>  
>  *We need to instantiate our components before we try to render them to the DOM*.
>   
>   Using **JSX** will call ```React.createElement()``` for us, turning a **component class** into a **component instance**.
>   
>   To make an instance of our class we just need to wrap the class name with *JSX tags*.
>   
>   example:
```
// class
App

// instance
<App />
```
----------
> If we attempt to render a component this way:
```
import React from 'react';
import ReactDOM from 'react-dom';

const App = function() {
  return <div>Hi!</div>;
}

ReactDOM.render(<App />);
```
> We get this error message:
>
> ```Uncaught Error: _registerComponent(...): Target container is not a DOM element.```
>
> It just means that ```ReactDOM.render()``` doesn't know where you want to put the component.
>  
>  The ```render()``` method takes two arguments, the *first* being what you want to *render*, and the *second* being *where* to render to.
>  

>  Here is the corrected code-snippet:

```
// index.html

<!DOCTYPE html>
<html>
  <head>
  </head>
  <body>
    <div class="container"></div>
  </body>
</html>

```
```
// index.js

import React from 'react';
import ReactDOM from 'react-dom';

const App = function() {
  return <div>Hi!</div>;
}

ReactDOM.render(<App />, document.querySelector('.container'));

```
>
> When we render an array without a *key* property react generates this *warning*:
>  
```
Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of `VideoList`. See https://fb.me/react-warning-keys for more information.
```
>
> The warning is saying that you should assign a *key* prop to each element item in the array. Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a stable identity.
>
> Keys used within arrays should be unique among their siblings. However they don't need to be globally unique. We can use the same keys when we produce two different arrays.
> example:
>
```
function Blog(props) {
  const sidebar = (
    <ul>
      {props.posts.map((post) =>
        <li key={post.id}>
          {post.title}
        </li>
      )}
    </ul>
  );
  const content = props.posts.map((post) =>
    <div key={post.id}>
      <h3>{post.title}</h3>
      <p>{post.content}</p>
    </div>
  );
  return (
    <div>
      {sidebar}
      <hr />
      {content}
    </div>
  );
}

const posts = [
  {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
  {id: 2, title: 'Installation', content: 'You can install React from npm.'}
];
ReactDOM.render(
  <Blog posts={posts} />,
  document.getElementById('root')
);
```
>
> For more on **keys**, follow the [react documentation](https://reactjs.org/docs/lists-and-keys.html#keys).


----------


es6
-------------
----------

> **const**
>
> The ```const``` variable declaration creates a constant whose scope can be either global or local to the block in which it is declared. Global constants do not become properties of the window object, unlike ```var``` variables. An initializer for a constant is required; that is, you must specify its value in the same statement in which it's declared.
>
> The ```const declaration``` creates a read-only reference to a value. It does **not** mean the value it holds is immutable, just that the variable identifier cannot be reassigned. For instance, in the case where the content is an object, this means the object's contents (e.g., it's parameters) can be altered.
>
> A constant cannot share its name with a function or a variable in the same scope.
>
> Check the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) for more information on ```const```.
>
> **import & export**
>
> When *importing* javaScript files that we have written, it is required to include a reference to the actual relative path from the file that we're importing it from.
>
> example of exporting a component that lives in a file at ``` src/components/search_bar.js ``` and importing that component for use in another file from ``` src/index.js ```:
```
//search_bar.js
import React from 'react';

const SearchBar = () => {
  return <input />
};

export default SearchBar;

//index.js
import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar';

const App = () => {
  return (
    <div>
      <SearchBar />
    </div>
  );
}

ReactDOM.render(<App />, document.querySelector('.container'));
```
> A helpful article on [es6 import and export](https://hackernoon.com/import-export-default-require-commandjs-javascript-nodejs-es6-vs-cheatsheet-different-tutorial-example-5a321738b50f) by *HACKERNOON*.
>
>


----------

> **Arrow functions**
>  
>  An **arrow function expression** has a shorter syntax than a *function expression* and does not have its own *this*, *arguments*, *super*, or *new.target*. These function expressions are best suited for non-method functions, and they cannot be used as constructors.
>  
>  Here is an example of how *arrow functions* make for **shorter functions**:
>   
```
var materials = [
  'Hydrogen',
  'Helium',
  'Lithium',
  'Beryllium'
];

materials.map(function(material) {
  return material.length;
}); // [8, 6, 7, 9]

materials.map((material) => {
  return material.length;
}); // [8, 6, 7, 9]

materials.map(material => material.length); // [8, 6, 7, 9]
```
>
> Until arrow functions, every new function defined its own ```this``` value ( a new object in the case of a constructor, undefined in strict mode function calls, the base object if the function is called as an "*object method*", etc.). This proved to be less than ideal with an *object-oriented* style of programming.
>  
>  example:
>  
```
function Person() {
  // The Person() constructor defines `this` as an instance of itself.
  this.age = 0;

  setInterval(function growUp() {
    // In non-strict mode, the growUp() function defines `this`
    // as the global object, which is different from the `this`
    // defined by the Person() constructor.
    this.age++;
  }, 1000);
}

var p = new Person();
```
>
> In *ECMAScript 3/5*, the ```this``` issue was fixable by assigning the value in ```this``` to a variable that could be closed over.
>  
> example:
>  
```
function Person() {
  var that = this;
  that.age = 0;

  setInterval(function growUp() {
    // The callback refers to the `that` variable of which
    // the value is the expected object.
    that.age++;
  }, 1000);
}
```

>
> Alternatively, a *bound function* could be created so that a preassigned ```this``` value would be passed to the bound target function ( the ```growUp()``` function in the example above).
>  
>  An arrow function does not have its own ```this;``` the ```this``` value of the enclosing execution context is used. Thus, in the following code, the ```this``` within the function that is passed to ```setInterval``` has the same value as ```this``` in the enclosing function:
>   
```
function Person(){
  this.age = 0;

  setInterval(() => {
    this.age++; // |this| properly refers to the person object
  }, 1000);
}

var p = new Person();
```
> Check the [MDN web docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) for more information on **arrow functions**.

----------

> **Object literal property value shorthand**
>  
>  *es6* provides some syntactic sugar for arguments passed into a function that are used as a object's property value and are the same as the key.
>  

```
// ECMAScript 5

function createMonster(name, power) {
  return { type: 'Monster', name: name, power: power };
}
function createWitch(name) {
  return { type: 'Witch', name: name };
}
```

> The same code-snippet can be rewritten with the *es6* shorthand:
>  
```
// ECMAScript 6

function createMonster(name, power) {
  return { type: 'Monster', name, power };
}
function createWitch(name) {
  return { type: 'Witch', name };
}
```
>
> Here is a [link](https://ariya.io/2013/02/es6-and-object-literal-property-value-shorthand) to a good article on **object literal property value shorthand**.
>  



javaScript
-------------
----------

> It is best to use *built-in iterators* rather than *for loops* whenever possible.
>  
> **Array.prototype.map()**
>  
> The ```map()``` method creates a new array with the results of calling a provided function on every element in the calling array.
>  
>  example:
```
var array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```
>
> For more information and examples of ```map()```, check out the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
>  
>  Using ```map()``` is really useful in making lists in react.
>  
