import React, { Component } from 'react';
import '../App.css';

//basic button pressed to construct queries
class DumbButton extends Component {
  clickHandler = () => this.props.fromButton(this.props.name);

  render() {
    let isActive = !this.props.active && (this.props.keywordButtonClicked !== this.props.name) ?
      'active' : 'inactive';
    return (
      <button className={`dumbButtonClass ${this.props.visibility} ${this.props.active}`}
        onClick={this.clickHandler}>
        {this.props.name}
      </button>
    );
  }
}

export default DumbButton;
