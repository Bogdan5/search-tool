import React, { Component } from 'react';
import Keyboard from './components/Keyboard';
import ButtonGroup from './components/ButtonGroup';
import DataDisplay from './components/DataDisplay';
import DumbButton from './components/DumbButton';
import Header from './components/Header';
import Sorter from './components/Sorter';
import ComponentEnhancer from './components/ComponentEnhancer';
import ConditionButtonFormatter from './components/ConditionButtonFormatter';
import ConditionButton from './components/ConditionButton';
import DropDownMenu from './components/DropDownMenu';
import MenuOption from './components/MenuOption';


import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.state = {
      listElements: [],
      listOperations: [],
      keyword: '', // content of the keyword input text field
      inputVisibility: 'hidden', // in the second Keyboard, whether the position input is visible
      keywordButtonClicked: '', // name of button clicked in the keyword(2nd) Keyboard
      active: [], // array of buttons active
      indexOp: 0, // how many elements have been added in an operation
      position: 0,
      idConditional: 0,
      menuVisible: false,
      mergerArray: [null, null, null],
      idConditionalButtonClicked: null,
    };
  }

  componentDidMount() {
    this.textInput.current.focus();
  }

  textHandler = (e) => {
    this.setState({ keyword: e.target.value });
  };

  positionHandler = (e) => {
    this.setState({ position: e.target.value });
  }

  merger = (...arr) => {
    const { listElements, idConditional } = this.state;
    const newElement = (element1, name, element2) => {
      const newProps = { ...element2.props };
      newProps.id = idConditional + 1;
      newProps.key = idConditional + 1;
      return (
        <ConditionButton {...newProps}>
          {element1}
          <span>{name}</span>
          {element2}
        </ConditionButton>
      );
    };
    const searcher = (id) => {
      for (let i; i < listElements.length; i++) {
        if (listElements[i] === id) { return i; }
      }
      return -1;
    };
    const a = [...listElements];
    const x = a.splice(searcher(arr[0]), 1);
    if (arr.length === 2 && arr[1] === 'NOT') {
      console.log('x props' + JSON.stringify(x));
      this.setState({ listElements: a.concat(newElement(null, arr[1], x)) });
    } else if (arr.length === 2) {
      const y = a.splice(searcher(arr[2]));
      this.setState({ listElements: a.concat(newElement(y, arr[1], x)) });
    }
  }

  conditionalClickHandler = (id) => {
    console.log('conditional clicked in App ' + id);
    const { mergerArray } = this.state;
    this.setState({ idConditionalButtonClicked: id, menuVisible: true });
    if (mergerArray[1]) {
      this.merger(mergerArray[0], mergerArray[1], id);
      this.setState({ mergerArray: [null, null, null] });
    } else {
      this.setState({ mergerArray: [id, null, null] });
    }
  };

  menuClickHandler = (name) => {
    const { mergerArray } = this.state;
    this.setState({ menuVisible: false });
    if (mergerArray[0] !== null) {
      const mer = [...mergerArray];
      mer[1] = name;
      console.log('mergerArray ' + this.state.mergerArray);
      if (name === 'NOT') {
        this.merger(mergerArray[0], 'NOT');
      } else {
        this.setState({ mergerArray: mer });
      }
    }
  }

  // function that passes data from DumbButton
  fromButton = (name) => {
    const {
      listOperations, keyword, keywordButtonClicked, listElements,
      indexOp, position, idConditional,
    } = this.state;

    // function that determines whether the keyword matches the data at the required position
    const include = (word, posit) => (data) => {
      if (position || position > 0) {
        return data.match(new RegExp(word)).index === posit;
      }
      return data.match(new RegExp(word));
    };

    // function that determines whether the data string starts with the keyword
    const endsWith = (dataString, word) => {
      const len = dataString.length - word.length;
      include(dataString, word, len);
    };

    this.setState({ keywordButtonClicked: name });
    if (name === 'INCLUDES') { this.setState({ inputVisibility: 'visible' }); }
    // const len = currentOperation.length;
    let chldList = [];
    let lst = [];
    switch (name) {
      case 'SUBMIT':
        if (keywordButtonClicked && keyword) {
          this.setState({ listOperations: listOperations.concat(include(keyword, position || 0)) });
          switch (keywordButtonClicked) {
            case 'INCLUDES':
              lst = ['Includes ', keyword, ' at position ', position];
              break;
            case 'ENDS WITH':
              lst = ['Ends with ', keyword];
              break;
            default:
              lst = ['Starts with ', keyword];
              break;
          }
          chldList = lst.map((el, index) => <span key={index}>{`${el}`}</span>);
          this.setState({ idConditional: idConditional + 1 });
          const propsArray = {
            children: chldList,
            key: idConditional,
            fromConditional: this.conditionalClickHandler,
            id: idConditional,
          };
          const element = <ConditionButton {...propsArray} />;
          this.setState(
            { listElements: listElements.concat(element), idConditional: idConditional + 1 }
          );
        }

        break;
      case 'CANCEL':
        this.setState({ currentOperation: [] });
        break;
      default:
    }
  };

  fromMenu = (operationClicked, indexButton) => {
    console.log(`operation ${operationClicked} button ${indexButton}`);
    this.setState({ menuVisible: false });
    // switch (operationClicked) {
    //   case 'NOT':
    //     this.setState({ listOperations: listOperations.concat((data) => )})
    //   case 'AND':
    //   case 'OR':
    //   case 'DELETE':
    //   default:
    // }
  }

  // fromFormatter = (arr) => {

  // }

  render() {
    const { inputVisibility, menuVisible, active, listElements } = this.state;
    // enhancing DumbButtons to ButtonWithHandler through ComponentEnhancer
    const propertiesObj = { // properties object passed to ComponentEnhancer
      fromButton: this.fromButton, // a handler is added to buttons in order to pass data
      // from DumbButton chid to the App parent
      active, // in element buttons, true greyed out
      keywordButtonClicked: this.state, // what element button is clicked
    };
    const ButtonWithHandler = ComponentEnhancer(DumbButton, propertiesObj);

    const propertiesMenu = { fromMenu: this.menuClickHandler };
    const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);

    //
    return (
      <div className='App'>
        <Header title='Data display - Search and sort' />
        { /* includes description and operator buttons */ }
        <Keyboard typeContent='Boolean operators'>
          <ButtonWithHandler name='AND' />
          <ButtonWithHandler name='OR' />
          <ButtonWithHandler name='NOT' />
        </Keyboard>
        <Keyboard typeContent='Search keyword'>
          <ButtonGroup>
            <ButtonWithHandler name='INCLUDES' />
            <ButtonWithHandler name='STARTS WITH' />
            <ButtonWithHandler name='ENDS WITH' />
          </ButtonGroup>
          <input // the keyword used to search
            type='text' onChange={this.textHandler}
            placeholder='Type keyword' ref={this.textInput}
          />
          <div className={inputVisibility}>in position</div>
          <input // the position; 0 by default
            type='text' className={`positionInput ${inputVisibility}`}
            onChange={this.positionHandler}
          />
          <ButtonWithHandler name='SUBMIT' visibility={inputVisibility} />
          <ButtonWithHandler name='CANCEL' />
        </Keyboard>
        {/* includes the query structure */}
        <ConditionButtonFormatter>
          {listElements.map(el => el)}
          <DropDownMenu menuVisible={menuVisible}>
            <MenuElementWithHandler name='NOT' />
            <MenuElementWithHandler name='AND' />
            <MenuElementWithHandler name='OR' />
            <MenuElementWithHandler name='DELETE' />
          </DropDownMenu>
        </ConditionButtonFormatter>
        {/* buttons for sorting the data */}
        <Sorter />
        {/* data displayed as resulted from search and sort operations */}
        <DataDisplay dataLoad={this.state} />
      </div>
    );
  }
}

export default App;
