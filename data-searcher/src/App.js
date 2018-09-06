import React, { Component } from 'react';
import Keyboard from './components/Keyboard';
import ButtonGroup from './components/ButtonGroup';
import DataDisplay from './components/DataDisplay';
import DumbButton from './components/DumbButton';
import Header from './components/Header';
import Sorter from './components/Sorter';
import ConditionButtonFormatter from './components/ConditionButtonFormatter';

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
        <Header title='Data display - Search and sort'/>
        <Keyboard typeContent='Boolean operators'>
          <DumbButton name='AND' operation='&&'/>
          <DumbButton name='OR' operation='||'/>
          <DumbButton name='NOT' operation='!'/>
        </Keyboard>
        <Keyboard typeContent='Search keyword'>
          <ButtonGroup>
            <DumbButton name='INCLUDES' />
            <DumbButton name='STARTS WITH' />
            <DumbButton name='ENDS WITH' />
          </ButtonGroup>
          <div className='contInput'><input type='text'/></div>
          <div className='contInput'><input type='radio'/></div>
          <div className='contInput'><button type='button'>Submit</button></div>
        </Keyboard>
        <ConditionButtonFormatter />
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
