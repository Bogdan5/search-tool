import React, { Component } from 'react';
import DumbButton from './DumbButton';

const ComponentEnhancer = (WrappedComponent, passedFunction) =>
class extends Component {
  render() {
    return <WrappedComponent {...this.props} fromButton={passedFunction}/>;
  }
};

export default ComponentEnhancer;
