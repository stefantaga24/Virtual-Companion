import React from 'react';
import {StyleSheet} from 'react-native';
import {View} from 'react-native';

const styles = StyleSheet.create({
  rectangle: {
    width: 137,
    height: 135,
    borderRadius: 16.8512,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    opacity: 0.6,
  },
});
function EmptyRectangle() {
  return <View style={styles.rectangle} />;
}
export default EmptyRectangle;
