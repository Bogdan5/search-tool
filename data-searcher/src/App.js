import React, { Component } from 'react';
import logo from './logo.svg';
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
        <Keyboard></Keyboard>
        <Sorter/>
        <DataDisplay dataLoad={this.state.dataLoad} />
      </div>
    );
  }
}

export default App;
