import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { ProfileScreenNavigationProp } from "../../Models/Map"
import Header from "../Header/Header"
import { useEffect, useState } from "react"
import { getProfilePicture, getUserName } from "../../Services/User.Service"
import { getImage } from "../../assets"
import { RockName } from "../../Models/Rock"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EditNameDialog from "./EditNameDialog/EditNameDialog"
import SelectProfilePictureDialog from "./SelectProfilePictureDialog/SelectProfilePictureDialog"
import FavoriteRocksList from "./FavoriteRocksList/FavoriteRocksList"
import PlayerStats from "./PlayerStats/PlayerStats"
import assetsRives from "../../assets/stoneRives"
import Rive from "rive-react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import Svg, { Path } from "react-native-svg"

const { width, height } = Dimensions.get('window');

const Profile = ({navigation} : {navigation: ProfileScreenNavigationProp}) => {
    
    const [profilePicName, setProfilePicName] = useState<RockName | string>("")
    const [profileName, setProfileName] = useState<string>("");
    const [isEditNameModalVisible, setEditNameModalVisible] = useState(false)
    const [isEditProfilePictureModalVisible, setEditProfilePictureModalVisible] = useState(false)
    const insets = useSafeAreaInsets();
    
    useEffect(() => {
        setProfileName(getUserName())
        const profilePic = getProfilePicture();
        setProfilePicName(!profilePic ? "user_icon" : profilePic)
    }, [])

    useEffect(() => {
        if(!isEditNameModalVisible){
            setProfileName(getUserName())
        }
    }, [isEditNameModalVisible])

    useEffect(() => {
        if(!isEditProfilePictureModalVisible){
            const profilePic = getProfilePicture();
            setProfilePicName(!profilePic ? "user_icon" : profilePic)
        }
    }, [isEditProfilePictureModalVisible])

    const getProfilePictureView = () => {
        if(Object.keys(assetsRives).includes(profilePicName)){
            let riveElementToReturn = <Rive autoplay={false} style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[profilePicName]} />
            return (
                <View style={{width: 200, height: 200, borderRadius: 125, overflow: "hidden", backgroundColor: "white"}}>
                    {riveElementToReturn}
                </View>
            )
        }
        else{
            return getImage(profilePicName, styles.profilePic)
        }
    }

    const getProfilePicWrapperStyles = () => {
        if(Object.keys(assetsRives).includes(profilePicName)){
            return styles.profilePicWrapper
        }
        return [styles.profilePicWrapper, styles.profilePicWrapperPadding]
    }

    const formatedProfileName = () => {
        if(profileName.length > 20){
            return profileName.slice(0, 20);
        }
        return profileName;
    }
    
    return(
        <View style={{flex: 1, backgroundColor: "#CE9DFC", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
            <Svg
                height={height}
                width={width}
                viewBox={`0 0 ${width} ${height}`}
                style={StyleSheet.absoluteFill}
            >
                <Path
                  d={`
                      M0,${height}
                      L${width*0.05},${height*0.98}  
                      C${width*0.05},${height*0.98} ${width*0.15},${height*0.9} ${width*0.2},${height}
                      Z
                  `}
                  fill="#061C55"
                />
                <Path
                  d={`
                      M${width*0.25},${height}
                      L${width*0.25},${height*0.93}  
                      L${width*0.35},${height*0.9}
                      L${width*0.45},${height*0.9}
                      L${width*0.53},${height*0.88}
                      L${width*0.6},${height*0.88}
                      L${width*0.85},${height}
                      Z
                  `}
                  fill="#061C55"
                />
                 
                <Path
                  d={`
                      M${width*0.11},${height}
                      L${width*0.18},${height*0.94}  
                      L${width*0.28},${height}
                      L0,${height}
                      Z
                  `}
                  fill="#051233"
                />
                <Path
                  d={`
                      M${width*0.19},${height}
                      L${width*0.22},${height*0.85}  
                      L${width*0.3},${height}
                      L0,${height}
                      Z
                  `}
                  fill="#051233"
                />
                <Path
                  d={`
                      M${width*0.29},${height}
                      L${width*0.35},${height*0.92}  
                      L${width*0.4},${height}
                      L0,${height}
                      Z
                  `}
                  fill="#051233"
                />
                <Path
                  d={`
                      M${width*0.39},${height}
                      L${width*0.47},${height*0.96}  
                      L${width*0.5},${height*0.94}
                      L${width*0.53},${height * 0.96}
                      L${width*0.62},${height}
                      Z
                  `}
                  fill="#051233"
                />
                <Path
                  d={`
                      M${width*0.6},${height}
                      L${width*0.65},${height*0.96}  
                      L${width*0.7},${height}
                      Z
                  `}
                  fill="#051233"
                />
                <Path
                  d={`
                      M${width*0.68},${height}
                      L${width*0.74},${height*0.85}  
                      L${width*0.78},${height}
                      L0,${height}
                      Z
                  `}
                  fill="#051233"
                />
                 <Path
                  d={`
                      M${width*0.75},${height}
                      L${width*0.75},${height*0.97}  
                      L${width*0.8},${height*0.95}
                      L${width*0.82},${height*0.92}
                      L${width*0.95},${height}
                      Z
                  `}
                  fill="#051233"
                />
                <Path
                  d={`
                      M${width*0.7},${height}
                      L${width*0.85},${height*0.97}  
                      L${width*0.9},${height*0.965}
                      L${width*0.95},${height*0.956}
                      C${width},${height*0.956} ${width},${height*0.98} ${width},${height}
                      Z
                  `}
                  fill="#061C55"
                />
            </Svg>
            <EditNameDialog isVisible={isEditNameModalVisible} setIsVisible={setEditNameModalVisible} />

            <SelectProfilePictureDialog isVisible={isEditProfilePictureModalVisible} setIsVisible={setEditProfilePictureModalVisible} />

            <Header centerText="Profil" nav={navigation} showGoBack showSettings showProfile={false}/>
            <View style={styles.pictureNameContainer}>
                <View style={getProfilePicWrapperStyles()}>
                    <TouchableOpacity onPress={() => setEditProfilePictureModalVisible(true)}>
                        {getProfilePictureView()}
                    </TouchableOpacity>
                </View>
                <View style={styles.nameWrapper}>
                    <Text style={styles.name}>{formatedProfileName()}</Text>
                    <TouchableOpacity style={styles.editIconWrapper} onPress={() => setEditNameModalVisible(true)}>
                        <MaterialIcons name="edit" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
            <FavoriteRocksList navigation={navigation}/>
            <PlayerStats />
        </View>
    )
}

const styles = StyleSheet.create({
    pictureNameContainer:{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10,
    },
    profilePicWrapper: {
        backgroundColor: "white",
        borderRadius: 125
    },
    profilePicWrapperPadding: {
        padding: 25
    },
    profilePic: {
        width: 175,
        height: 175
    },
    nameWrapper: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },
    name: {
        fontSize: 24,
        fontFamily: "Poppins-Bold"
    },
    editIconWrapper: {
        marginLeft: 10
    }
})

export default Profile