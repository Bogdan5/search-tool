import React, { Component } from 'react';

const ComponentEnhancer = (WrappedComponent, passedFunction) =>
class extends Component {
  render() {
    return <WrappedComponent {...this.props} fromButton={passedFunction}/>;
  }
};

export default ComponentEnhancer;
