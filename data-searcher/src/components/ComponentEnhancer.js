import React, { Component } from 'react';

const ComponentEnhancer = (WrappedComponent, passedFunction, propName) =>
class extends Component {
  render() {
    let newProps = { ...this.props };
    newProps[propName] = passedFunction;
    return <WrappedComponent { ...newProps }/>;
  }
};

export default ComponentEnhancer;
