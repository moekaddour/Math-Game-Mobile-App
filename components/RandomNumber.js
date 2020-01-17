import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

class RandomNumber extends React.Component {


    onPressed =()=>{
        if (this.props.isDisabled) {return}
        this.props.selectNumber(this.props.id)
    }
  render() {
    return (
      <TouchableOpacity onPress={this.onPressed}>
        <Text style={[styles.random, this.props.isDisabled&&styles.disabled]}>
        {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  random: {
    margin: 20,
    fontSize: 40,
    backgroundColor: "#283c63",
    color: "#fbe8d3",
    width: 100,
    marginHorizontal: 15,
    textAlign: "center"
  },
  disabled:{
      opacity:0.3,
  }
});
export default RandomNumber;
