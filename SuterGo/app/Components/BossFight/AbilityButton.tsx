import React, { useRef, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
} from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const SIZE = 60;
const STROKE_WIDTH = 8;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CircularProgressButton({ duration = 3000, onPress, image, idx }: {duration: number, onPress: Function, image: any, idx: number} ) {
    const [isAnimating, setIsAnimating] = useState(false);
    const progress = useState(new Animated.Value(0))[0];

      const widthInterpolated = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ['0%', '100%'],
      });

    const handlePress = () => {
        if(isAnimating) return;

        setIsAnimating(true);
        onPress()
        progress.setValue(0);

        Animated.timing(progress, {
            toValue: 1,
            duration,
            useNativeDriver: false,
        }).start(() => {
            setIsAnimating(false)
            progress.setValue(0)
        });
    };

    return (
        <View style={styles.buttonWrapper} key={idx}>
          <TouchableOpacity onPress={handlePress}>
              <View style={styles.container}>
                  <Image source={image} style={styles.image} resizeMode="contain" />
              </View>
          </TouchableOpacity>
          {isAnimating &&
            <View style={[{width: "90%", height: 10, backgroundColor: "white", borderRadius: 20}]}>
              <Animated.View style={[styles.progressBar, {width: widthInterpolated}]}></Animated.View>
            </View>
          }
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
      width: SIZE,
      height: SIZE,
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
    },
    image: {
      width: SIZE * 0.8,
      height: SIZE * 0.8,
      zIndex: 2,
    },
    buttonWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 72,
        height: 72,
        borderRadius: 15,
        backgroundColor: "#6872FF"
    },
    progressBar: {
      height: "100%",
      backgroundColor: "#FFC266",
      borderRadius: 20
    }
  });