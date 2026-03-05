import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { Text } from 'react-native-gesture-handler';
import { getImage } from '../../assets';
import { MainPageNavigationProp } from '../../Models/Map';
import Header from '../Header/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';

const { width, height } = Dimensions.get('window');
const targetWidth = width * 0.9;

const MainPage = ({navigation} : {navigation: MainPageNavigationProp}) => {
    const firstBoxAnim = useRef(new Animated.Value(-targetWidth)).current;
    const secondBoxAnim = useRef(new Animated.Value(width)).current;
    const thirdBoxAnim = useRef(new Animated.Value(-targetWidth)).current;

    const fourthBoxAnim = useRef(new Animated.Value(width)).current;

    const insets = useSafeAreaInsets();

    useEffect(() => {
        Animated.timing(firstBoxAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start(() => {
          Animated.timing(secondBoxAnim, {
            toValue: width - targetWidth,
            duration: 1000,
            useNativeDriver: false,
          }).start(() => {
            Animated.timing(thirdBoxAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: false
            }).start(() => {
                Animated.timing(fourthBoxAnim, {
                    toValue: width - targetWidth,
                    duration: 1000,
                    useNativeDriver: false
                }).start();
            });
          });
        });
    }, []);

    const handleFirstBoxClick = () => {
        navigation.navigate("StonesGrid");
    }

    const handleSecondBoxClick = () => {
        navigation.navigate("Map");
    }

    const handleThirdBoxClick = () => {
        navigation.navigate("Backpack", {showResources: false});
    }

    const handleFourthBoxClick = () => {
        navigation.navigate("Cave");
    }
    return (
        <View style={[styles.container, {paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}]}>
             <Svg
                  height={height}
                  width={width}
                  viewBox={`0 0 ${width} ${height}`}
                  style={StyleSheet.absoluteFill}
              >
                <Path
                  d={`
                      M0,${height * 0.3}
                      C${width * 0.35},${height * 0.35} ${width * 0.75},${height * 0.7} ${width},${height * 0.35}
                      L${width},0
                      L0,0
                      Z
                  `}
                  fill="#CE9DFC"
                />

                <Path
                  d={`
                    M0,${height * 0.6}
                    C${width * 0.1},${height * 0.6} ${width * 0.9},${height * 0.5} ${width},${height * 0.8}
                    L${width},${height}
                    L0,${height}
                    Z
                  `}
                  fill="#CE9DFC"
                />
            </Svg>
            
            <Header centerText='Menu' nav={navigation} showGoBack={false} showProfile showSettings/>
          
            <Animated.View style={[styles.box, styles.firstBox, styles.boxFromLeft, { left: firstBoxAnim }]}>
                <TouchableOpacity style={{flex: 1}} onPress={handleFirstBoxClick}>
                    <View style={{flex: 1,display: "flex", flexDirection: "row"}}>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {getImage("main_page_stones", styles.images)}
                        </View>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{textAlign: "center", fontSize: 24, fontFamily: "Poppins-Bold"}}>Kamene</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.box, styles.secondBox, styles.boxFromRight, { left: secondBoxAnim }]}>
                <TouchableOpacity style={{flex: 1}} onPress={handleSecondBoxClick}>
                    <View style={{flex: 1,display: "flex", flexDirection: "row"}}>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{textAlign: "center", fontSize: 24, fontFamily: "Poppins-Bold"}}>Mapa</Text>
                        </View>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                        {getImage("main_page_map", styles.images)}
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.box, styles.thirdBox, styles.boxFromLeft, { left: thirdBoxAnim }]}>
                <TouchableOpacity style={{flex: 1}} onPress={handleThirdBoxClick}>
                    <View style={{flex: 1,display: "flex", flexDirection: "row"}}>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {getImage("main_page_backpack", styles.images)}
                        </View>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{textAlign: "center", fontSize: 24, fontFamily: "Poppins-Bold"}}>Batoh</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>

            <Animated.View style={[styles.box, styles.fourthBox, styles.boxFromRight, { left: fourthBoxAnim }]}>
                <TouchableOpacity style={{flex: 1}} onPress={handleFourthBoxClick}>
                    <View style={{flex: 1,display: "flex", flexDirection: "row"}}>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            <Text style={{textAlign: "center", fontSize: 24, fontFamily: "Poppins-Bold"}}>Kameňo stroj</Text>
                        </View>
                        <View style={{flex: 1, display: "flex", justifyContent: "center", alignItems: "center"}}>
                            {getImage("main_page_machine", styles.images)}
                        </View>
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D8EFEF',
  },
  box: {
    position: 'absolute',
    width: targetWidth,
    height: '18%',
    backgroundColor: '#fff',
  },
  firstBox: {
    top: '15%',
  },

  secondBox: {
    top: "35%",
  },

  thirdBox: {
    top: "55%"
  },

  fourthBox: {
    top: '75%',
    backgroundColor: '#fff',
  },
  boxFromLeft: {
    borderTopRightRadius: 100,
    borderBottomRightRadius: 100
  },
  boxFromRight: {
    borderTopLeftRadius: 100,
    borderBottomLeftRadius: 100
  },
  images: {
    width: 100,
    height: 100
  }
});

export default MainPage;
