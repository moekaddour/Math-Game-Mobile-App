import React from "react";
import Game from "./components/Game";

class App extends React.Component {
  state = {
    key: 1
  };
  randomLength = Math.floor(Math.random() * 10);

  resetGame=()=>{
    this.setState((prevState)=>{
      return{
        key : prevState.key + 1
      }
    })
  }
  render() {
    return (
      <Game
      onPlayAgain={this.resetGame}
        key={this.state.key}
        randomNumberCount={
          this.randomLength <= 3 ? this.randomLength + 5 : this.randomLength
        }
      />
    );
  }
}

export default App;
