/**
 * Project: minionsfall
 * Fan Zhang ACIT 3650
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { 
    StyleSheet, 
    Text, 
    View,
    AppRegistry,
    Animated,
    TouchableWithoutFeedback,
    Dimensions,
    Image
} from 'react-native';

//Uing AnimatedSnow to create minions
import AnimatedSnow from './AnimatedSnow';
const {height, width} = Dimensions.get('window');

export default class App extends React.Component {
    
  constructor(props) {
    super(props);
  }
  //Setup container of minionsfall
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./img/minionsfall_background.png')} style={styles.snowContainer}/>
        <AnimatedSnow style={styles.snowContainer}/>
      </View>
    );
  }
}


const styles = StyleSheet.create({    
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    
  snowContainer: {
    position: 'absolute',
    width: width,
    height: height,
  },

  imageContainer: {
    position: 'absolute',
    width: width,
    height: height,
    resizeMode: 'contain'
  }
});
AppRegistry.registerComponent('SnowFall', () => SnowFall);