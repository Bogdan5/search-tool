import '../App.css';

// this component includes a set of buttons
export default const SorterButton = () => {
    return (
        <div className='buttonGroup'>
        {this.props.children}
      </div>
    )
}