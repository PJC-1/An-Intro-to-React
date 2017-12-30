import React from 'react';
import ReactDOM from 'react-dom';
// Create a new component. This component should produce
// some HTML
const App = function() {
    return <div>Returning some JSX</div>;
}

// Take this component's ge return <div>hi!</div>;nerated HTML and put it
// on the page (in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));
