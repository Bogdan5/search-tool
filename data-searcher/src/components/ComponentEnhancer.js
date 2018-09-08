import DumbButton from './DumbButton';

const ComponentEnhancer = enhancerFunc => BaseComponent => baseProps => {
  const transformedProps = enhancerFunc(baseProps);
  return <BaseComponent {...transformedProps} />;
};

export default ComponentEnhancer;

const ButtonWithHandler = ComponentEnhancer(
  passedProp => 
)(DumbButton);
