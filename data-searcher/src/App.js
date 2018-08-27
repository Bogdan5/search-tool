import React, { Component } from 'react';
import Keyboard from './src/components/Keyboard';
import ButtonGroup from './src/components/ButtonGroup';
import DataDisplay from './src/components/DataDisplay';
import DumbButton from './src/components/DumbButton';
import Header from './src/components/Header';
import Sorter from './src/components/Sorter';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount () {
    //fetch data from source
  }

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
