/**
 * Project: minionsfall - from snowfall lib
 * Fan Zhang ACIT 3650
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image
} from 'react-native';

const ANGE_RANGE = 0.1;
const HALF_ANGLE_RANGE = ANGE_RANGE / 2;
const HALF_PI = Math.PI / 2;
const ANGLE_SEED = 100;
const ANGLE_DIVISOR = 10000;
const INCREMENT_LOWER = 2;
const INCREMENT_UPPER = 4;
const FLAKE_SIZE_LOWER = 20;
const FLAKE_SIZE_UPPER = 40;

import * as Random from './Random';

export default class Snow extends Component {

  constructor(props) {
    super(props);

    this.x = Random.getRandomInt(this.props.width);
    this.y = Random.getRandomInt(this.props.height);

    this.angle = Random.getRandomFloat(ANGLE_SEED) / ANGLE_SEED * ANGE_RANGE + HALF_PI - HALF_ANGLE_RANGE;
    this.increment = Random.getRandom(INCREMENT_LOWER, INCREMENT_UPPER);
    this.flakeSize = Random.getRandom(FLAKE_SIZE_LOWER, FLAKE_SIZE_UPPER);
    this.opacity = Math.random() + 0.1;

  }

  componentDidMount(){
    this.updateInterval = setInterval(() => {
      this.move(this.props.width, this.props.height);
      this.forceUpdate();
    },50);
  }

  componentWillUnmount(){
    clearInterval(this.updateInterval);
  }
  
  //Randomize the direction of the movement for the minons
  move(width, height) {

    const x = this.x + (this.increment * Math.cos(this.angle));
    const y = this.y + (this.increment * Math.sin(this.angle));

    this.angle += Random.getRandom(-ANGLE_SEED, ANGLE_SEED) / ANGLE_DIVISOR;

    this.x = Math.floor(x);
    this.y = Math.floor(y);

    if (!this.isInside(width, height)) {
      this.reset(width);
    }



  }

  //check if the object is at the edge of the container
  isInside(width, height) {
    const x = this.x;
    const y = this.y;
    const flakeSize = this.flakeSize;
    return x >= -flakeSize - 1 && x + flakeSize <= width && y >= -flakeSize - 1 && y - flakeSize < height;
  }

  
  reset(width) {
    const x = Random.getRandomInt(width);
    const y = (-this.flakeSize - 1);
    const angle = Random.getRandomFloat(ANGLE_SEED) / ANGLE_SEED * ANGE_RANGE + HALF_PI - HALF_ANGLE_RANGE;

    this.x = x;
    this.y = y;
    this.angle = angle;
  }

  getPosition() {
    return {
      top: this.y,
      left: this.x,
      width: this.flakeSize,
      height: this.flakeSize,
      borderRadius: this.flakeSize / 2,
      opacity: this.opacity,
      
    }
  }

  //Animates the running minions
  render() {
    const snowShape = this.getPosition();
      
    var randomMinions = [
        require('./img/bob.png'),
        require('./img/jerry.png')
    ];  

    return (
        <View>
             <Image source={randomMinions[Math.floor(Math.random()*randomMinions.length)]} style={[styles.snow, snowShape]}/>
        </View>
    )
  }
};

Snow.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number
};

//Styles
const styles = StyleSheet.create({
  snow: {
    position: 'absolute',
  },
});