import React, { Component } from 'react';
import Keyboard from './components/Keyboard';
import ButtonGroup from './components/ButtonGroup';
import DataDisplay from './components/DataDisplay';
import DumbButton from './components/DumbButton';
import Header from './components/Header';
import Sorter from './components/Sorter';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  // componentDidMount () {
  //   //fetch data from source
  // }

  render() {
    return (
      <div className="App">
        <Header/>
        <Keyboard>
          <DumbButton/>
          <DumbButton/>
          <DumbButton/>
          <DumbButton/>
        </Keyboard>
        <Keyboard>
          <ButtonGroup>

          </ButtonGroup>
          <input type='text'/>
          <input type='radio'/>
          <button type='button'>Submit</button>
        </Keyboard>
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
