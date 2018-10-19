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
import Icon from './components/Icon';
import SelectButton from './components/SelectButton';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
    this.appRef = React.createRef();
    this.state = {
      listCards: [{
        id: 0,
        field: 'all',
        listElements: [],
        listOperations: [],
      }],
      cardSelected: 0,
      keyword: '', // content of the keyword input text field
      inputVisibility: 'hidden', // in the second Keyboard, whether the position input is visible
      keywordButtonClicked: '', // name of button clicked in the keyword(2nd) Keyboard
      active: [], // array of buttons active
      position: 0,
      idConditional: 0,
      menuVisible: false,
      mergerArray: [null, null, null],
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

  selectCard = (card) => {
    // console.log('card selected' + card);
    this.setState({ cardSelected: card });
  }

  searchObject = (obj, searchPropName, searchProp, targetProp) => {
    let result = null;
    Object.keys(obj).forEach((el) => {
      if (el[searchPropName] === searchProp) { result = obj[targetProp]; }
    });
    return result;
  }

  // updateHistory = () => {
  //   const { historyElements, historyOperations, listElements, listOperations } = this.state;
  //   this.setState({
  //     historyElements: historyElements.concat(listElements),
  //     historyOperations: historyOperations.concat(listOperations),
  //   });
  // }

  merger = (...arr) => {
    const { listCards, idConditional, cardSelected } = this.state;
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
      for (let i; i < listCards[cardSelected].listElements.length; i++) {
        if (listCards[cardSelected].listElements[i] === id) { return i; }
      }
      return -1;
    };
    const copy = [...listCards[cardSelected].listElements];
    const copyList = [...listCards];
    const x = copy.splice(searcher(arr[0]), 1);
    if (arr.length === 2 && arr[1] === 'NOT') {
      // console.log('x props' + JSON.stringify(x));
      copyList[cardSelected].listElements = copy.concat(newElement(null, arr[1], x));
    } else if (arr.length === 3) {
      const y = copy.splice(searcher(arr[2]));
      copyList[cardSelected].listElements = copy.concat(newElement(y, arr[1], x));
    }
    this.setState({ listCards: copyList });
    // this.updateHistory();
  }

  conditionalClickHandler = (id, clickTop, clickLeft) => {
    // console.log('conditional clicked in App button' + clickTop + ' ' + clickLeft);
    // console.log('formatter offset top' + this.formatterConditionButton.current.offsetTop);
    const { mergerArray } = this.state;
    const appTop = this.appRef.current.offsetTop;
    const appLeft = this.appRef.current.offsetLeft;
    // console.log('app offsets' + appTop + ' ' + appLeft);
    if (mergerArray[0] === null) {
      this.setState({
        mergerArray: [id, null, null],
        menuVisible: true,
        menuTop: clickTop - appTop - 10,
        menuLeft: clickLeft - appLeft - 15,
      });
    } else if (mergerArray[1] === null && mergerArray[0] !== id) {
      this.setState({ mergerArray: [id, null, null] });
    } else if (mergerArray[1] !== null && mergerArray[0] !== id) {
      this.merger(mergerArray[0], mergerArray[1], id);
      this.setState({ mergerArray: [null, null, null] });
    }
  };

  menuClickHandler = (name) => {
    const { mergerArray } = this.state;
    this.setState({ menuVisible: false });
    if (mergerArray[0] !== null) {
      const mer = [...mergerArray];
      mer[1] = name;
      // console.log('mergerArray ' + this.state.mergerArray);
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
      keyword, keywordButtonClicked, cardSelected,
      position, idConditional, listCards,
    } = this.state;
    const { listOperations } = listCards[cardSelected];

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
    const listCopy = [...listCards];
    switch (name) {
      case 'SUBMIT':
        if (keywordButtonClicked && keyword) {
          switch (keywordButtonClicked) {
            case 'INCLUDES':
              lst = ['Includes ', keyword, ' at position ', position];
              listCopy[cardSelected].listOperations.push(include(keyword, position));
              break;
            case 'ENDS WITH':
              lst = ['Ends with ', keyword];
              listCopy[cardSelected].listOperations.push(endsWith(keyword));
              break;
            case 'STARTS WITH':
              lst = ['Starts with ', keyword];
              listCopy[cardSelected].listOperations.push(include(keyword));
              break;
            default:
          }
          this.setState({ listCards: listCopy });
          chldList = lst.map((el, index) => <span key={index}>{`${el}`}</span>);
          this.setState({ idConditional: idConditional + 1 });
          const propsArray = {
            children: chldList,
            key: idConditional,
            fromConditional: this.conditionalClickHandler,
            id: idConditional,
          };
          const newElem = <ConditionButton {...propsArray} />;
          const copyList = [...listCards];
          copyList[cardSelected].listElements = listCards[cardSelected].listElements
            .concat(newElem);
          this.setState(
            {
              listCards: copyList,
              idConditional: idConditional + 1,
            },
          );
          // this.updateHistory();
        }

        break;
      case 'CANCEL':
        this.setState({ currentOperation: [] });
        break;
      default:
    }
  };

  iconClicked = (type, keyboardNo) => {
    const { listCards } = this.state;
    if (type === '+') {
      this.setState({
        listCards: listCards.concat({
          id: listCards.length,
          listElements: [],
          listOperations: [],
        }),
      });
    } else if (type === '-' && listCards.length > 1) {
      // console.log('deleted card ' + keyboardNo);
      const copy = [...listCards];
      copy.splice(keyboardNo, 1);
      this.setState({ listCards: copy });
    }
  }

  render() {
    const {
      inputVisibility, menuVisible, active, listCards,
      menuTop, menuLeft, cardSelected,
    } = this.state;
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

    //
    return (
      <div className='App' ref={this.appRef}>
        <Header title='Data display - Search and sort' />
        { /* includes description and operator buttons */ }
        <Keyboard leftSection='Boolean operators' classProp=''>
          <ButtonWithHandler name='AND' />
          <ButtonWithHandler name='OR' />
          <ButtonWithHandler name='NOT' />
        </Keyboard>
        <Keyboard
          leftSection='Search keyword' classProp=' keyboardSearchKeyword'
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
        {listCards.map((el, index) => {
          const iconsArray = (listCards.length === index + 1) ? ['+', '-'] : ['-'];
          const iconsElements = (
            <div>
              {iconsArray.map((item, ind) => {
                const ident = `${el.id}-${ind}`;
                return (
                  <Icon
                    type={item} fromIcon={this.iconClicked}
                    keyboardNo={el.id} key={ident}
                  />
                );
              })}
            </div>
          );
          const typeContent = (
            <div>
              <SelectButton card={el.id} fromSelect={this.selectCard}>Select</SelectButton>
              <br />
              {selectColumn}
            </div>
          );
          return (
            <Keyboard
              key={el.id} leftSection={typeContent}
              classProp='' rightSection={iconsElements}
              cardSelected={cardSelected} id={el.id}
            >
              <ConditionButtonFormatter fromFormatter={this.fromFormat}>
                {el.listElements.map(elem => elem)}
              </ConditionButtonFormatter>
            </Keyboard>
          );
        })}
        {/* buttons for sorting the data */}
        <Sorter />
        {/* data displayed as resulted from search and sort operations */}
        <DataDisplay dataLoad={this.state} />
        <DropDownMenu
          menuVisible={menuVisible} mouseOutMenu={this.menuHide}
          style={{ top: menuTop, left: menuLeft }}
        >
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
