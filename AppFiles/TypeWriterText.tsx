import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';

const TypewriterText = ({text, speed = 100, textStyle}: any) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(prev => prev + text.charAt(index));
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

export default TypewriterText;
