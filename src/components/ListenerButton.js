import React from 'react';
import '../css/ListenerButton.css';

class ListenerButton extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {currentKey: ''}
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  state = {
    show: false,
  };

  handleKeyPress(e) {
    if(e.keyCode === 13 || e.keyCode === 32){
      e.preventDefault();
      this.props.onStart();
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleMove = e => {
    const x = e.pageX - e.target.offsetLeft;
    const y = e.pageY - e.target.offsetTop;

    e.target.style.setProperty('--x', `${x}px`);
    e.target.style.setProperty('--y', `${y}px`);
  };

  handleStart = event => {
    event.preventDefault();

    this.props.onStart();
  };

  render() {
    return (

      <div>
        <h1 className = "title1">soongSiri</h1>
        <h3 className = "title2">숭실대학교 컴퓨터학부 음성챗봇</h3>
        <h4 className = "title3">developed by 맥쓰사</h4>
        <button
          {...this.props}
          className="button"
          id="button1"
          onClick={this.handleStart}
          onMouseMove={this.handleMove}>
          <span>{this.props.buttonText}</span>
        </button>
      </div>
      
    );
  }
}

ListenerButton.defaultProps = {
  buttonText: 'Click me to listen',
};

export default ListenerButton;
