import React, { Component } from 'react';
import '../App.css';

class Header extends Component {
  render() {
    return (
      <div className='headerClass'>
        {this.props.title}
      </div>
    );
  }
}

export default Header;
