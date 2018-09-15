import React, { Component } from 'react';

//HOC that adds a new function as a prop to a component
const ComponentEnhancer = (WrappedComponent, propertiesObj) =>
class extends Component {
  render() {
    let newProps = Object.assign({ ...this.props }, propertiesObj);
    return <WrappedComponent { ...newProps }/>;
  }
};

export default ComponentEnhancer;
