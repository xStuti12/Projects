import { ColorValue, StyleProp, TextStyle, ViewStyle } from "react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-gesture-handler";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export type HeaderProps = {
    centerText: string;
    nav: any;
    showGoBack: boolean;
    showProfile: boolean;
    showSettings: boolean;
    wrapperStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    iconsColor?: ColorValue;
}

const Header = (props: HeaderProps) => {

    const navigateToProfile = () => {
        props.nav.navigate("Profile");
    }
    
    const navitageToSettings = () => {
        
    }

    const backBtn = () => {
        props.nav.goBack();
    }

    const getIconColor = () => props.iconsColor ? props.iconsColor : "black";
    

    return (
        <View style={[styles.header, props.wrapperStyle]}>
            {props.showGoBack && 
                <TouchableOpacity onPress={() => backBtn()} style={styles.leftIcon}>
                    <MaterialIcons name="west" size={36} color={getIconColor()} />
                </TouchableOpacity>
            }
            <Text style={[styles.headerText, props.textStyle]}>{props.centerText}</Text>
            <View style={styles.rightButtons}>
                {props.showProfile && 
                <TouchableOpacity onPress={() =>navigateToProfile()}>
                    <MaterialIcons name="person" size={36} color={getIconColor()} />
                </TouchableOpacity>
                }
                {props.showSettings && 
                <TouchableOpacity onPress={() => navitageToSettings()}>
                    <MaterialIcons name="settings" size={36} color={getIconColor()} />
                </TouchableOpacity>
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
        marginTop: 5,
        height: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
      },
      headerText: {
        position: 'absolute',
        left: 0,
        right: 0,
        textAlign: 'center',
        fontSize: 24,
        fontFamily: "Poppins-Regular"
      },
      rightButtons: {
        position: 'absolute',
        right: 10,
        flexDirection: 'row',
        gap: 10,
        zIndex: 5
      },
      leftIcon: {
        position: 'absolute',
        left: 10,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 5
      },
})

export default Header