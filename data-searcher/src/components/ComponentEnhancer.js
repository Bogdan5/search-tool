import React, { Component } from 'react';

//HOC that adds a new function as a prop to a component
const ComponentEnhancer = (WrappedComponent, passedFunction, propName) =>
class extends Component {
  render() {
    let newProps = { ...this.props };
    newProps[propName] = passedFunction;
    return <WrappedComponent { ...newProps }/>;
  }
};

export default ComponentEnhancer;
