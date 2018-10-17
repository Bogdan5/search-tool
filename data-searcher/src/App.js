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
    this.formatterConditionButton = React.createRef();
    this.state = {
      listCards: [{
        id: 0,
        field: 'all',
        listElements: [],
        listOperations: [],
      }],
      cardSelected: 0,
      listElements: [],
      listOperations: [],
      historyElements: [],
      historyOperations: [],
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

  menuHide = () => this.setState({ menuVisible: false });

  updateHistory = () => {
    const { historyElements, historyOperations, listElements, listOperations } = this.state;
    this.setState({
      historyElements: historyElements.concat(listElements),
      historyOperations: historyOperations.concat(listOperations),
    });
  }

  merger = (...arr) => {
    const { listElements, idConditional } = this.state;
    const newElement = (element1, name, element2) => {
      const newProps = { ...element2.props };
      newProps.id = idConditional + 1;
      newProps.key = idConditional + 1;
      return (
        <ConditionButton {...newProps} fromConditional={this.conditionalClickHandler}>
          {element1}
          <div>{name}</div>
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
    } else if (arr.length === 3) {
      const y = a.splice(searcher(arr[2]));
      this.setState({ listElements: a.concat(newElement(y, arr[1], x)) });
    }
    this.updateHistory();
  }

  conditionalClickHandler = (id, top, left) => {
    console.log('conditional clicked in App button top ' + top + ' ' + left);
    // console.log('formatter offset top' + this.formatterConditionButton.current.offsetTop);
    const { mergerArray } = this.state;
    this.setState({ menuVisible: true });
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
      position, idConditional, cardSelected,
    } = this.state;

    // function that determines whether the keyword matches the data at the required position
    const include = (word, posit) => (data) => {
      if (position || position === 0) {
        return data.match(new RegExp(word)).index === posit;
      }
      return data.match(new RegExp(word));
    };

    // function that determines whether the data string starts with the keyword
    const endsWith = word => (data) => {
      const len = data.length - word.length;
      return include(word, len);
    };

    this.setState({ keywordButtonClicked: name });
    if (name === 'INCLUDES') { this.setState({ inputVisibility: 'visible' }); }
    // const len = currentOperation.length;
    let chldList = [];
    let lst = [];
    switch (name) {
      case 'SUBMIT':
        if (keywordButtonClicked && keyword) {
          switch (keywordButtonClicked) {
            case 'INCLUDES':
              lst = ['Includes ', keyword, ' at position ', position];
              this.setState({ listOperations: listOperations.concat(include(keyword, position)) });
              break;
            case 'ENDS WITH':
              lst = ['Ends with ', keyword];
              this.setState({ listOperations: listOperations.concat(endsWith(keyword)) });
              break;
            default:
              lst = ['Starts with ', keyword];
              this.setState({ listOperations: listOperations.concat(include(keyword, 0)) });
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
            {
              listElements: listElements.concat(element),
              idConditional: idConditional + 1,
            },
          );
          this.updateHistory();
        }

        break;
      case 'CANCEL':
        this.setState({ currentOperation: [] });
        break;
      default:
    }
  };

  // data from the ConditionalButtonFormatter - gives position of this component
  fromFormat = (top, left) => {
    console.log('formatter top ' + top + ' ' + left);
  }

  iconClicked = (type) => {
    const { listCards } = this.state;
    const list = [...listCards];
    if (type === '+') {
      
    }
  }

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
    // adds a click handler to all components of the DropDownMenu
    const propertiesMenu = { fromMenu: this.menuClickHandler };
    const MenuElementWithHandler = ComponentEnhancer(MenuOption, propertiesMenu);
    // drop down selector in each card that gives the field for each condition apply
    const selectColumn = (
      <select className='selector'>
        <option value='colAll'>Selects fields</option>
        <option value='colAll'>All fields</option>
        <option value='col1'>Column 1</option>
        <option value='col2'>Column 2</option>
        <option value='col3'>Column 3</option>
      </select>
    );
    const typeContent = (
      <div>
        <button type='submit'>Select</button>
        {selectColumn}
      </div>
    );

    //
    return (
      <div className='App'>
        <Header title='Data display - Search and sort' />
        { /* includes description and operator buttons */ }
        <Keyboard typeContent='Boolean operators' classProp=''>
          <ButtonWithHandler name='AND' />
          <ButtonWithHandler name='OR' />
          <ButtonWithHandler name='NOT' />
        </Keyboard>
        <Keyboard
          typeContent='Search keyword' classProp=' keyboardSearchKeyword'
          icon=''
        >
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
          <input // by default, any match would satisfy condition, regardless of position
            type='text' className={`positionInput ${inputVisibility}`}
            onChange={this.positionHandler}
          />
          <ButtonWithHandler name='SUBMIT' visibility={inputVisibility} />
          <ButtonWithHandler name='CANCEL' />
        </Keyboard>
        {/* includes the query structure */}
        {this.list.map((el, index) => {
          const iconsArray = (this.list.length === index) ? ['+', '-'] : ['-'];
          const iconsElements = (
            <div>
              {iconsArray.map(el => <Icon type={el} fromIcon={this.iconClicked} />)}
            </div>
          );
          return (
            <Keyboard
              key={el.id} leftSection={typeContent}
              classProp='' icons={iconsArray}
            >
              <ConditionButtonFormatter fromFormatter={this.fromFormat}>
                {listElements.map(elem => elem.listElements)}
              </ConditionButtonFormatter>
            </Keyboard>
          );
        })}
        
        {/* buttons for sorting the data */}
        <Sorter />
        {/* data displayed as resulted from search and sort operations */}
        <DataDisplay dataLoad={this.state} />
        <DropDownMenu menuVisible={menuVisible} mouseOutMenu={this.menuHide}>
          <MenuElementWithHandler name='NOT' />
          <MenuElementWithHandler name='AND' />
          <MenuElementWithHandler name='OR' />
          <MenuElementWithHandler name='DELETE' />
        </DropDownMenu>
      </div>
    );
  }
}

export default App;
