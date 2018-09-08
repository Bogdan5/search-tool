import DumbButton from './DumbButton';

const ComponentEnhancer = (WrappedComponent, passedFunction) =>
  class extends Component {
  render() {
    return <WrappedComponent {...this.props} fromButton={passedFunction}/>;
  }
};

const ButtonWithHandler = ComponentEnhancer(this.fromButton, DumbButton);

export default ButtonWithHandler;
