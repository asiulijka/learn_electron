import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {

  constructor() {
    super();
    this.state = {
      status: 'off',
      time: 0,
    };
    this.timer = null;
  }

  formatTime(seconds) { 
    const minutes =  parseInt(seconds / 60);
    const remainingSeconds =  parseInt(seconds % 60);
   
    return this.addPadding(minutes) + ':' + this.addPadding(remainingSeconds);
  };

  addPadding(value) {
    if (value < 10) {
      return '0' + value;
     } else {
       return value;
     }
  };

  startTimer() {
    this.setState({
      time: 1200, 
      status: 'work'});
    
    this.timer = setInterval(this.step.bind(this), 1000);
  };

  step() {
    if(this.state.time > 0) {
      this.setState(
        {
          time: this.state.time - 1,
        }
      );
    } else {
      if (this.state.status == 'work') {
       this.setState(
          {
            status: 'rest',
            time: 20,
          }
        );
      } else if (this.state.status == 'rest') {
       this.setState(
          {
            status: 'work',
            time: 1200,
          }
        );
      } else {
        return console.log('Ups, something went wrong...');
      }
    }
  };

  stopTimer() {
    clearInterval(this.timer);
    
    this.setState({
      time: 0,
      status: 'off'
    });
  };

  closeApp() {
    window.close();
  };

  render() {

    if (this.state.status == 'off') {
      return (
        <div>
          <h1>Protect your eyes</h1>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>  
          <button className="btn" onClick={() => this.startTimer()}>Start</button>
          <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
        </div>
      )
    } else if(this.state.status == 'work') {
      return (
        <div>
          <h1>Protect your eyes</h1>
          <img src="./images/work.png" />
          <div className="timer">
            {this.formatTime(this.state.time)}
          </div>
          <button className="btn" onClick={() => this.stopTimer()}>Stop</button>
          <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
        </div>
      )
    } else {
      return (
        <div>
          <h1>Protect your eyes</h1>
          <img src="./images/rest.png" />
          <div className="timer">
            {this.formatTime(this.state.time)}
          </div>
          <button className="btn" onClick={() => this.stopTimer()}>Stop</button>
          <button className="btn btn-close" onClick={() => this.closeApp()}>X</button>
        </div>
      )
    };
  }
};

render(<App />, document.querySelector('#app'));
