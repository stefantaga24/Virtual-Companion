import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TypewriterText = ({ text,  speed = 100, textStyle } : any) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [text, speed]);

  return (
    <View>
      <Text style={textStyle}>{displayedText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default TypewriterText;
