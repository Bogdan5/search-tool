import React, { Component } from 'react';
import Keyboard from './components/Keyboard';
import ButtonGroup from './components/ButtonGroup';
import DataDisplay from './components/DataDisplay';
import DumbButton from './components/DumbButton';
import Header from './components/Header';
import Sorter from './components/Sorter';
import ComponentEnhancer from './components/ComponentEnhancer';
import ConditionButtonFormatter from './components/ConditionButtonFormatter';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentOperation: {
        element1: null,
        operator: null,
        element2: null,
      },
      listOperations: {},
    };
  }

  //function that passes data from DumbButton
  fromButton(name, type) {
    if (type = 'operator') {

    } else if (type = 'element') {

    }
  }

  submit() {
    
  }

  render() {
    //a handler is added to buttons in order to pass data from DumbButton chid to
    //the App parent
    let ButtonWithHandler = ComponentEnhancer(DumbButton, this.fromButton, 'fromButton');
    return (
      <div className="App">
        <Header title='Data display - Search and sort'/>
        <Keyboard typeContent='Boolean operators'>
          <ButtonWithHandler name='AND' type='operator'/>
          <ButtonWithHandler name='OR' type='operator'/>
          <ButtonWithHandler name='NOT' type='operator'/>
        </Keyboard>
        <Keyboard typeContent='Search keyword'>
          <ButtonGroup>
            <ButtonWithHandler name='INCLUDES' type='element' />
            <ButtonWithHandler name='STARTS WITH' type='element' />
            <ButtonWithHandler name='ENDS WITH' type='element' />
          </ButtonGroup>
          <input type='text'/>
          <div>in position</div>
          <input type='text' className='positionInput'/>
          <button type='button' onClick={this.submit}>Submit</button>
        </Keyboard>
        <ConditionButtonFormatter />
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
