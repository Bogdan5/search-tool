import React, { Component } from 'react';
import DumbButton from './DumbButton';

const ComponentEnhancer = (WrappedComponent, passedFunction) =>
class extends Component {
  render() {
    return <WrappedComponent {...this.props} fromButton={passedFunction}/>;
  }
};

const foo = () => {console.log('foo');};

export const ButtonWithHandler = ComponentEnhancer(DumbButton, this.props.fromButton);
