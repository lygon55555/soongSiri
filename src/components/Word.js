import React from 'react';
import Slideshow from '../lib/Slideshow';
import '../css/Word.css';

class Word extends React.Component {
  constructor(props){
    super(props);
    
    this.state = {currentKey: ''}
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  state = {
    number: 1,
  };

  handleKeyPress(e) {
    if(e.keyCode === 27 || e.keyCode === 13 || e.keyCode === 32){
      e.preventDefault();
      this.props.onClose();
    }
  }
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
    this.setState(
      {
        number: Math.floor(Math.random() * 9) + 1,
      },
      () => {
        const slideshow = new Slideshow(document.querySelector('.slideshow'));
      }
    );
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  returnAnswer(question)
  {
    var num = -1;

    for(var i = 0 ; i < this.props.arr1.length ; i++)
    {
      var string1 = String(this.props.text).split(' ').join('');
      var string2 = String(this.props.arr1[i][0]).split(' ').join('');

      // console.log("1" + string1);
      // console.log("2" + string2);

      if(string2.includes(string1) || (string1 === string2))
      {
        console.log("1" + string1);
      console.log("2" + string2);
      num = i;
      }
        // num = i;
    }

    if(num === -1)
    {
      return "다시 질문해주세요";
    } 
    else
    {
      return this.props.arr1[num][1];
    }
  }

  returnAudio(question)
  {
    var num = -1;

    for(var i = 0 ; i < this.props.arr1.length ; i++)
    {
      var string1 = String(this.props.text).split(' ').join('');
      var string2 = String(this.props.arr1[i][0]).split(' ').join('');

      if(string2.includes(string1) || (string1 === string2))
        num = i;
    }

    if(num === -1)
    {
      return <audio src = {require("./datasets/다시질문.wav")} hidden autoPlay/>;
    } 
    else
    {
      var audioName = this.props.arr1[num][2];
      return <audio src = {require("./datasets/" + audioName + ".wav")} hidden autoPlay/>;
    }
  }

  render() {
    const { number } = this.state;
    //const { text } = this.props;
    
    console.log("(render)this.props.text : " + this.props.text);

    return (
      <div className="slideshow">
        <a className="button close" onClick={this.props.onClose}>
          <svg
            fill="#fff"
            height="40"
            width="40"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            <path d="M0 0h24v24H0z" fill="none" />
          </svg>
        </a>
          <div className="slide slide--current">
          <div className={`slide__bg slide__bg--${number}`} />
          <h2 className={`word word--${number}`}>{this.returnAnswer(this.props.text)}</h2>
          {this.returnAudio(this.props.text)}
        </div>      
      </div>
    );
  }
}

Word.defaultProps = {
  text: '',
  arr1: [[],[]]
};

export default Word;
