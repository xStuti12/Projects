import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { LoadingScreenNavigationProp } from '../../Models/Map';
import { FunFacts } from '../../assets/FunFacts';
import { getImage } from '../../assets';
import RiveTest from '../RiveTest/RiveTest';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Ellipse, Path } from 'react-native-svg';
import { StyleSource } from '@maplibre/maplibre-react-native';
import Rive from 'rive-react-native';
import assetsRives from '../../assets/stoneRives';

const {width, height} = Dimensions.get("screen")

const LoadingScreen = ({navigation} : {navigation: LoadingScreenNavigationProp}) => {
  const [funFactId, setFunFactId] = useState(0);
  const progress = useState(new Animated.Value(0))[0];

  const translateY = useRef(new Animated.Value(height)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const LOADING_TIME_MS = 5000;
  const insets = useSafeAreaInsets();

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: LOADING_TIME_MS,
      useNativeDriver: false,
    }).start(() => {
      setIsLoaded(true);
    });

    const timeout = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }).start();

      Animated.timing(opacity, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }).start();

    }, LOADING_TIME_MS);

    return () => clearTimeout(timeout);
  }, []);

  const widthInterpolated = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const handlePlayBtnPress = () => {
    navigation.replace("MainPage")
  }

  const topSvgGraphics = <><Path
                          d={`
                            M0,0
                            L${width/15},${height/6}
                            A 0.02 0.02 0 0 0 ${width/12.5} ${height/6}
                            L${width/8},${height/15}
                            L${width/3}, ${0}
                            Z
                          `}
                          fill="#B362FF"
                        />
                        <Path
                          d={`
                            M${width/7},0
                            L${width/5.5},${height/10}
                            A 0.02 0.02 0 0 0 ${width/5} ${height/10}
                            L${width/4},${height/15}
                            L${width/2},${height / 12}
                            L${width/1.85},${height/25}
                            A 0.02 0.02 0 0 1 ${width/1.8} ${height/25}
                            L${width/1.75},${height/8}
                            A 0.02 0.02 0 0 0 ${width/1.7} ${height/8}
                            L${width/1.25},${0}
                          `}
                          fill="#B362FF"
                        />
                        <Path
                          d={`
                            M${width/1.5},0
                            L${width/1.3},${height/8}
                            A 0.02 0.02 0 0 0 ${width/1.25} ${height/8}
                            L${width/1.15},${0}
                          `}
                          fill="#B362FF"
                        />
                        <Path
                          d={`
                            M0,0
                            C-15,50 30,50 30,35
                            C45,60 95,60 135,0
                            Z
                          `}
                          fill="#061C55"
                        />

                        <Path
                          d={`
                            M${width/1.55},0
                            C${width/1.55 + 10},50 ${width/1.55 + 25},45 ${width/1.35 + 25},35
                            C${width/1.05},90 ${width},90 ${width},0
                            Z
                          `}
                          fill="#061C55"
                        /></>

  const backgroundSvg = 
  <>
     <Path
        d={`
            M0,0
            L0,${height/2.7}
            C${width/2},${height/2.7} ${width/2.7},${height/3} ${width},${height/3.5}
            L${width},0
            Z
          `}
        fill="#D8EFEF"
    />
    <Path
      d={`
          M0,${height}
          L0,${height - height/3}
          C${width - width/4},${height - height/3} ${width - width/4.5},${height - height/2} ${width},${height - height/1.88}
          L${width},${height}
          Z
        `}
      fill="#D8EFEF"
    />
  </>

  const generateSvg = () => {
      return (
        <>
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                {opacity}
              ]}
            >
              <Svg
                  height={height}
                  width={width}
                  viewBox={`0 0 ${width} ${height}`}
                  style={StyleSheet.absoluteFill}
                >
                  {backgroundSvg}
                </Svg>
            </Animated.View>
            <Svg
              height={height}
              width={width}
              viewBox={`0 0 ${width} ${height}`}
              style={StyleSheet.absoluteFill}
            >
              {topSvgGraphics}
            </Svg>
            <Animated.View 
                style={[
                    StyleSheet.absoluteFill, 
                    {
                      transform: [{translateY}],
                    }
                  ]}
                >
                <Svg
                  height={height}
                  width={width}
                  viewBox={`0 0 ${width} ${height}`}
                  style={[StyleSheet.absoluteFill, {position: "relative"}]}
                >

                  <Path
                    d={`
                      M0,${height}
                      L0,${height - height/3.5}
                      L${width/8},${height - height/5}
                      L${width/5},${height - height/4}
                      L${width/3},${height - height/3.8}
                      L${width/1.8},${height - height/5}
                      L${width/1.35},${height - height/4.8}
                      L${width},${height - height/3.5}
                      L${width},${height}
                      Z
                    `}
                    fill="#B362FF"
                  />
                  
                   <Path
                    d={`
                        M0,${height}
                        L0,${height - 150}
                        C0,${height - 115} 0,${height - 215} ${width/3},${height - 95}
                        C${width/2.6},${height - 65} ${width/2.5},${height - 40} ${width/1.5},${height - 115}
                        C${width/1.2},${height - 165} ${width/1.05},${height - 65} ${width/1.3},${height - 85}
                        C${width/1.05},${height - 165} ${width/1.02},${height - 35} ${width/1.3},${height - 85}
                        L${width},${height - 150}
                        L${width},${height}
                        Z
                      `}
                    fill={"rgba(5,18,51,0.2)"}
                  />


                  <Path
                    d={`
                        M0,${height}
                        L0,${height - 135}
                        C0,${height - 100} 0,${height - 200} ${width/3},${height - 80}
                        C${width/2.6},${height - 50} ${width/2.5},${height - 25} ${width/1.5},${height - 100}
                        C${width/1.2},${height - 150} ${width/1.05},${height - 50} ${width/1.3},${height - 70}
                        C${width/1.05},${height - 150} ${width/1.02},${height - 20} ${width/1.3},${height - 70}
                        L${width},${height - 135}
                        L${width},${height}
                        Z
                      `}
                    fill={"#051233"}
                  />

                  <Ellipse
                    cx={width/3.2}
                    cy={height - height/4.5}
                    rx={width/8}
                    ry={height/60}
                    fill={"rgba(5,18,51,0.2)"}
                  />
                </Svg>
            </Animated.View>
            <Animated.View style={[
                    StyleSheet.absoluteFill, 
                    {
                      transform: [{translateY}],
                    }
                  ]}>
              <View style={{width: width/2, position: "absolute", bottom: 0, left: width/15, height:height/2}}>
                    <Rive autoplay={true} style={
                          { 
                            width: "100%", 
                            height: "100%", 
                            pointerEvents: "none"
                          }} 
                          resourceName={assetsRives["malachite"]}
                      />
              </View>
            </Animated.View>
        </>
      )
  }

  return (
    <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}]}>
      {generateSvg()}
        <View style={{width: "100%", height: height/2.5, marginBottom: 25, display: "flex", flexDirection: "column", alignItems: "center"}}>
           <Text style={{fontFamily: "Poppins-Bold", fontSize: 38, textAlign: "center"}}>Kamienková dielňa</Text>
           {isLoaded &&
            <TouchableOpacity onPress={handlePlayBtnPress}>
              {getImage("play_btn", styles.logo)}  
            </TouchableOpacity>
           }
           {
            !isLoaded && getImage("logo", styles.logo)
           }
        </View>
        {!isLoaded && 
          <View style={styles.progressBarContainer}>
              <Animated.View style={[styles.progressBar, { width: widthInterpolated }]} />
          </View>
        }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CE9DFC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  progressBarContainer: {
    width: '80%',
    height: 20,
    backgroundColor: '#eee',
    borderRadius: 10,
    overflow: 'hidden',
    position: "absolute",
    bottom: 0,
    marginBottom: height / 8
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4caf50',
  },
  nextArrow: {
    height: 36,
    width: 36
  },
  logo: {
    width: 85,
    height: 85
  }
});

export default LoadingScreen;