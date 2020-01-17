import React from "react";
import { View, Text, StyleSheet,Button, StatusBar } from "react-native";
import RandomNumber from "./RandomNumber";
import shuffle from 'lodash.shuffle'

class Game extends React.Component {
  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(
        prevstate => {
          return { remainingTime: prevstate.remainingTime - 1 };
        },
        () => {
          if (this.state.remainingTime === 0) {
            clearInterval( this.interval);
          }
        }
      );
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval( this.interval);
  }
  state = {
    selectedIds: [],
    remainingTime: 10
  };
  randomNumbers = Array.from(
    { length: this.props.randomNumberCount },
    () => Math.floor(Math.random() * 10) + 10
  );
  target = this.randomNumbers
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

    shuffledRandomNumbers = shuffle(this.randomNumbers)
  isNumberSelected = number => {
    return this.state.selectedIds.indexOf(number) >= 0;
  };

  selectNumber = index => {
    this.setState({ selectedIds: this.state.selectedIds.concat(index) });
    // this.setState(prevState => ({
    //   selectedIds: [...prevState.selectedIds, index]
    // }));
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedIds.reduce((acc, curr) => {
      return acc + this.shuffledRandomNumbers[curr];
    }, 0);
    if(this.state.remainingTime===0){
        return "TimeEnd"
    }
    if (sumSelected < this.target) {
      return "PLAYING";
    }
    if (sumSelected === this.target) {
        clearInterval( this.interval);
      return "WON";
    }
    if (sumSelected > this.target ) {
        clearInterval( this.interval);
      return "LOST";
    }
  };
  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#283c63" barStyle="light-content" />
        <Text style={styles.timer}>{this.state.remainingTime}</Text>
        <Text style={[styles.target, styles[`${gameStatus}`]]}>
          {this.target}
        </Text>
        <View style={styles.randomContainer}>
          {this.shuffledRandomNumbers.map((number, index) => {
            return (
              <RandomNumber
                id={index}
                key={index}
                number={number}
                isDisabled={
                  this.isNumberSelected(index) || gameStatus != "PLAYING"
                }
                selectNumber={this.selectNumber}
              />
            );
          })}
        </View>
        {/* <Text style={styles.gameStatus}>{gameStatus}</Text> */}
        {gameStatus !== "PLAYING" && ( <Text style={styles.gameStatus}>{gameStatus}</Text>)}
        {gameStatus !== "PLAYING" && (<Button   color= "#63aabc" title="Play Again" onPress={this.props.onPlayAgain}></Button>)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f85f73",
    paddingTop: 30
  },
  target: {
    textAlign: "center",
    margin: 50,
    fontSize: 40,
    backgroundColor: "#283c63",
    color: "#fbe8d3"
  },
  randomContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around"
  },

  WON: {
    backgroundColor: "green"
  },
  LOST: {
    backgroundColor: "red"
  },
  TimeEnd:{
      backgroundColor: "orange"
  },
  timer:{
      textAlign:"center",
      color:"#283c63",
      fontSize:40,
      fontWeight:"bold",
  },
  gameStatus:{
      textAlign:"center",
      fontSize:30,
      backgroundColor:"#283c63",
      color:  "#fbe8d3",
      fontWeight:"bold"
  },
  playAgain:{
      fontSize:30,
      color: "#f9f3ec",
      backgroundColor:"#63aabc"
  }
});

export default Game;
