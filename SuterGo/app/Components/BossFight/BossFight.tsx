import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { BossFightScreenNavigationProp } from "../../Models/Map";
import { Dimensions, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { useEffect, useRef, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { Rock, RockRarity } from "../../Models/Rock";
import images, { getImage } from "../../assets";
import { Power, powers, PowerType } from "../../assets/powers";
import CircularProgressButton from "./AbilityButton";
import { putRockToBackPack, RemoveResourcesForRockCrafting } from "../../Services/Backpack.Service";
import Rive, { RiveRef } from "rive-react-native";
import rives, { BossName } from "../../assets/rives";
import { getRandomNumberFloored } from "../../Services/ResourceGeneration.Service";
import Header from "../Header/Header";
import Svg, { Path, Rect } from "react-native-svg";

export type BossFightProps = {
    cratfedRock: Rock,
    onReturn: Function
}

export type RootStackParamList = {
    BossFight: BossFightProps;
}

type BossFightRouteProps = RouteProp<RootStackParamList, "BossFight">

const {width, height} = Dimensions.get("screen");

type BossColors = {
  background: string;
  top_spikes: string;
  shadow: string;
  topSmooth: string;
  bottom_spike: string;
  bottom_smooth: string;
};

const colorsForBosses: Record<BossName, BossColors> = {
  boss_diamond: {
    background: "#826EB2",
    top_spikes: "#051233",
    shadow: "rgba(33,17,40,0.2)",
    topSmooth: "#35356D",
    bottom_spike: "#2D2B70",
    bottom_smooth: "#051233"
  },
  boss_reverse_triangle: {
    background: "#42DDA1",
    top_spikes: "#051233",
    shadow: "rgba(33,17,40,0.2)",
    topSmooth: "#061C55",
    bottom_spike: "#061C55",
    bottom_smooth: "#051233"
  },
  boss_square: {
    background: "#42BFDD",
    top_spikes: "#151617",
    shadow: "rgba(33,17,40,0.2)",
    topSmooth: "#B9E7F2",
    bottom_spike: "#B9E7F2",
    bottom_smooth: "#151617"
  },
  boss_triangle: {
    background: "#F6DCB6",
    top_spikes: "#FFC266",
    shadow: "rgba(33,17,40,0.2)",
    topSmooth: "#051233",
    bottom_spike: "#FFC266",
    bottom_smooth: "#051233"
  }
};

type LayoutData = {
    x: number,
    y: number,
    width: number,
    height: number
}

const BossFight = ({route, navigation} : {route: BossFightRouteProps, navigation: BossFightScreenNavigationProp}) => {

    const [bossHealth, setBossHealth] = useState(100)
    const [damageMultiplier, setDamageMultiplier] = useState(1)
    const [playerHealth, setPlayerHealth] = useState(100)
    const [alreadySentBack, setAlreadySentBack] = useState(false)
    const [isDead, setIsDead] = useState(false)
    const [bossAsset, setBossAsset] = useState<BossName | null>(null);

    const interval = useRef<Timeout>();

    const riveRef = useRef<RiveRef>(null);

    const bossHealthRef = useRef<number>(100);

    const alreadySentBackRef = useRef<boolean>(false)

    const isDeadRef = useRef<boolean>(false)
    const insets = useSafeAreaInsets();

    const headerHeight = 45;

    const abilitiesWrapperRef = useRef<View | null>(null);
    const [layout, setLayout] = useState<LayoutData | null>(null);

    useEffect(() => {
        isDeadRef.current = isDead
    }, [isDead])

    useEffect(() => {
        alreadySentBackRef.current = alreadySentBack
    }, [alreadySentBack])

    useEffect(() => {
        bossHealthRef.current = bossHealth;
        if(bossHealth <= 0){
            setIsDead(true)
            riveRef.current?.setInputState("State Machine 1", "Number 1", 3)
            setTimeout(() => {
                if(!alreadySentBackRef.current){
                    putRockToBackPack(route.params.cratfedRock);
                    route.params.onReturn(true);
                    navigation.goBack();
                    setAlreadySentBack(true);
                }
            }, 1500)
            return;
        }
        if(playerHealth <= 0){
            route.params.onReturn(false);
            navigation.goBack();
        }


    }, [bossHealth, playerHealth])

    useEffect(() => {
        let randomBossAsset=getRandomBossAsset()
        setBossAsset(randomBossAsset);
        console.log(randomBossAsset)

        switch(route.params.cratfedRock.rarity){
            case RockRarity.COMMON:
                setDamageMultiplier(3);
                break;
            case RockRarity.RARE:
                setDamageMultiplier(2.5);
                break;
            case RockRarity.EPIC:
                setDamageMultiplier(1.5);
                break;
            case RockRarity.LEGENDARY:
                setDamageMultiplier(1);
                break;
        }

        interval.current = setInterval(() => {
            if(bossHealthRef.current > 0){
                riveRef.current?.setInputState("State Machine 1", "Number 1", 1)
                setTimeout(() => {
                    setPlayerHealth(prev => prev - 10)
                }, 2000)
            }
        }, 5000)

        riveRef.current?.setInputState("State Machine 1", "Number 1", 0)

        return () => {
            if (interval.current) {
              clearInterval(interval.current);
            }
          };

    }, [])

    const getStyleForHealthBarPart = (index: number) => {
        let res: any = [style.healthBarPartDefault]
        if(index === 0){
            res.push(style.healthBarPartFirst)
        }
        if(index === 9){
            res.push(style.healthBarPartLast)
        }

        if(Math.ceil(bossHealth/10) > index){
            res.push(style.healthBarPartFull)
        }
        return res
    }


    const generateHealthBar = () => {
        let res = []
        for(let i = 0; i < 10; i++){
            res.push(<View style={getStyleForHealthBarPart(i)} key={i}></View>)
        }
        
        return(
            <View style={{position: "relative", flex: 1, display: "flex", justifyContent: "center", alignItems: "center", marginTop: 10}}>
                {getImage("healthbar", style.healthBarImage)}
                <View style={{display: "flex", flexDirection: "row"}}>
                    {res}
                </View>
                
            </View>
        )
    }

    const measureView = () => {
        abilitiesWrapperRef.current?.measure((x, y, w, h, pageX, pageY) => {        
            console.log(x,y,w,h,pageX,pageY)
            setLayout({
                x: x,
                y: y,
                height: h,
                width: w
            });
        })
    }

    const generatePowerButtons = () => {
        let buttons = [];
        let row = [];
        let idx = 0;
        for(let power of powers){
            row.push(
                <CircularProgressButton duration={power.cooldownMs} onPress={() => {activatePower(power)}} image={images[power.name]} idx={idx++} />
            )

            if(idx === Math.ceil(powers.length/2)){
                buttons.push(
                    <View style={style.powerButtonsWrapper} key={idx}>
                        {row}
                    </View>
                )
                row = []
            }
        }

        buttons.push(
            <View style={style.powerButtonsWrapper} key={2}>
                {row}
            </View>
        )

        return(
            <View style={{display: "flex", justifyContent: "space-around", flex: 1}}>
                {buttons}
            </View>
        )
    }

    const activatePower = (power: Power) => {
        if(power.type === PowerType.ATTACK){
            setTimeout(() => {
                dealDamage(power.damage)
            }, 250)
            if(bossHealthRef.current > 0)
                riveRef.current?.setInputState("State Machine 1", "Number 1", 2)
        }
        else{
            healPlayer(power.damage)
        }
    }

    const healPlayer = (healBy: number) => {
        setPlayerHealth((prev) => Math.min((prev + healBy), 100))
    }

    const dealDamage = (dmg: number) => {
        setBossHealth(prev => prev - (dmg * damageMultiplier))
    }

    const getRandomBossAsset = () => {
        const rng = getRandomNumberFloored(1, 100);
        if(rng >= 75){
            return rives.boss_diamond;
        }
        else if(rng >= 50){
            return rives.boss_reverse_triangle;
        }
        else if(rng >= 25){
            return rives.boss_triangle;
        }
        else{
            return rives.boss_square;
        }
    }

    const getColorTopSmooth = () => {
        if(!bossAsset) return "black";
        return colorsForBosses[bossAsset].topSmooth;
    }

    const getColorTopSpikes = () => {
        if(!bossAsset) return "black";
        return colorsForBosses[bossAsset].top_spikes;
    }

    const getColorShadow = () => {
        if(!bossAsset) return "black";
        return colorsForBosses[bossAsset].shadow;
    }

    const topSpikes_Smooth = <>
        <Path //smooth
            d={`
                M0,${(height + headerHeight) - height}
                L${width*0.05},${(height + headerHeight) - height*0.98}  
                C${width*0.05},${(height + headerHeight) - height*0.98} ${width*0.15},${(height + headerHeight) - height*0.9} ${width*0.2},${(height + headerHeight) - height}
                Z
            `}
            fill={getColorTopSmooth()}
        />
        <Path //smooth
          d={`
              M${width*0.25},${(height + headerHeight) - height}
              L${width*0.25},${(height + headerHeight) - height*0.93}  
              L${width*0.35},${(height + headerHeight) - height*0.9}
              L${width*0.45},${(height + headerHeight) - height*0.9}
              L${width*0.53},${(height + headerHeight) - height*0.88}
              L${width*0.6},${(height + headerHeight) - height*0.88}
              L${width*0.85},${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSmooth()}
        />
                         
        <Path
          d={`
              M${width*0.11},${(height + headerHeight) - height}
              L${width*0.18},${(height + headerHeight) - height*0.94}  
              L${width*0.28},${(height + headerHeight) - height}
              L0,${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSpikes()}
        />
        <Path
          d={`
              M${width*0.19},${(height + headerHeight) - height}
              L${width*0.22},${(height + headerHeight) - height*0.85}  
              L${width*0.3},${(height + headerHeight) - height}
              L0,${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSpikes()}
        />
        <Path
          d={`
              M${width*0.29},${(height + headerHeight) - height}
              L${width*0.35},${(height + headerHeight) - height*0.92}  
              L${width*0.4},${(height + headerHeight) - height}
              L0,${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSpikes()}
        />
        <Path
          d={`
              M${width*0.39},${(height + headerHeight) - height}
              L${width*0.47},${(height + headerHeight) - height*0.96}  
              L${width*0.5},${(height + headerHeight) - height*0.94}
              L${width*0.53},${(height + headerHeight) - height * 0.96}
              L${width*0.62},${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSpikes()}
        />
        <Path
          d={`
              M${width*0.6},${(height + headerHeight) - height}
              L${width*0.65},${(height + headerHeight) - height*0.96}  
              L${width*0.7},${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSpikes()}
        />
        <Path
          d={`
              M${width*0.68},${(height + headerHeight) - height}
              L${width*0.74},${(height + headerHeight) - height*0.85}  
              L${width*0.78},${(height + headerHeight) - height}
              L0,${(height + headerHeight) - height}
              Z
          `}
          fill={getColorTopSpikes()}
        />
        <Path
            d={`
                M${width*0.75},${(height + headerHeight) - height}
                L${width*0.75},${(height + headerHeight) - height*0.97}  
                L${width*0.8},${(height + headerHeight) - height*0.95}
                L${width*0.82},${(height + headerHeight) - height*0.92}
                L${width*0.95},${(height + headerHeight) - height}
                Z
            `}
            fill={getColorTopSpikes()}
        />
        <Path //smooth
            d={`
                M${width*0.7},${(height + headerHeight) - height}
                L${width*0.85},${(height + headerHeight) - height*0.97}  
                L${width*0.9},${(height + headerHeight) - height*0.965}
                L${width*0.95},${(height + headerHeight) - height*0.956}
                C${width},${(height + headerHeight) - height*0.956} ${width},${(height + headerHeight) - height*0.98} ${width},${(height + headerHeight) - height}
                Z
            `}
            fill={getColorTopSmooth()}
        />
    </>

    const shadow = <Path
                d={
                    `
                    M0,${headerHeight}
                    L${width / 20},${headerHeight}
                    L${width / 7},${headerHeight + height / 10}
                    L${width / 8}, ${headerHeight + height / 8}
                    L${width / 13}, ${height/3}
                    L${width / 7}, ${height / 2}
                    L${width / 6}, ${height - height/1.8}
                    L${width / 4}, ${height - height/1.85}
                    L${width / 2},${height}
                    L0,${height}
                    Z
                    `
                }
                fill={getColorShadow()}
    />

    const getBottomSpike = () => {
        if(!layout || !bossAsset) return <Path />
        
        return <>
            <Path
                d={`
                    M${width/10},${layout.y}
                    L${width/4.2},${layout.y - 40}
                    L${width/2.5},${layout.y - 50}
                    L${width/2.9 - 10}, ${layout.y}
                    Z
                `}
                fill={colorsForBosses[bossAsset].bottom_spike}
            />
        </>
    }

    const getBottomSmooth = () => {
        if(!layout || !bossAsset) return <Path />
        return <>
            <Path
                d={`
                    M0,${layout.y}
                    L0,${layout.y - 40}
                    L${width/20},${layout.y - 35}
                    L${width/10},${layout.y - 40}
                    L${width/4},${layout.y}
                    L${width/3.2},${layout.y - 25}
                    L${width/2.4},${layout.y - 30}
                    L${width/2.1},${layout.y - 20}
                    L${width/1.9},${layout.y}
                    L${width/1.75},${layout.y}
                    L${width/1.65},${layout.y - 20}
                    A 0.005 0.005 0 0 1 ${width/1.58} ${layout.y - 18}
                    L${width/1.55},${layout.y - 10}
                    A 0.0005 0.0005 0 0 0 ${width/1.55 + 0.1} ${layout.y - 10}
                    C ${width/1.4},${layout.y - 25} ${width/1.35},${layout.y - 15} ${width/1.35},${layout.y}
                    L${width/1.3},${layout.y}
                    L${width/1.24},${layout.y - 60}
                    L${width/1.2},${layout.y - 70}
                    L${width/1.16},${layout.y - 68}
                    L${width/1.13},${layout.y - 58}
                    L${width/1.07},${layout.y}
                    Z
                `}
                fill={colorsForBosses[bossAsset].bottom_smooth}
            />
        </>
    }

    return(
        <View style={{flex: 1, backgroundColor: "#FFFFFF", paddingTop: insets.top, paddingBottom: insets.bottom, paddingLeft: insets.left, paddingRight: insets.right}}>
            <Header centerText="Fight" 
                    nav={navigation} 
                    showGoBack 
                    showProfile={false}
                    showSettings={false} 
                    wrapperStyle={{backgroundColor: "#061C55", marginTop: 0, zIndex: 25}}
                    textStyle={{color: "white"}}
                    iconsColor={"white"}
            />

            {(bossAsset && bossAsset.length > 0) && <>
                <Svg
                    height={height}
                    width={width}
                    viewBox={`0 0 ${width} ${height}`}
                    style={[StyleSheet.absoluteFill, {backgroundColor: colorsForBosses[bossAsset].background}]}
                    pointerEvents='none'
                >
                    {shadow}
                    {topSpikes_Smooth}
                    {getBottomSpike()}
                    {getBottomSmooth()}
                </Svg>
                
                <View style={{marginTop: 20}}>
                    {/* {generateHealthBar()} */}
                </View>
                <View style={{display: "flex", justifyContent: "center", alignItems: "center", flex: 2}}>
                    <Rive
                        ref={riveRef}
                        stateMachineName="State Machine 1"
                        resourceName={bossAsset}
                        style={{ width: 300, height: 200 }}
                        onStateChanged={(stateMachine, stateName) => {
                            if(stateName == "Death" || bossHealthRef.current <= 0){
                                setIsDead(true);
                                setTimeout(() => riveRef.current?.stop(), 750)
                                return;
                            }
                            
                            setTimeout(() => {
                                if(!isDeadRef.current){
                                    riveRef.current?.setInputState("State Machine 1", "Number 1", 0)
                                }
                            }, 1250)                            
                        }}
                    />
                </View>
                <View style={{flex: 1, backgroundColor: "#051233"}} ref={abilitiesWrapperRef} onLayout={()=>measureView()}>
                    <Text style={{fontSize: 20, color: "white", marginLeft: 15, marginTop: 15, fontFamily: "Poppins-Regular"}}>HP: {playerHealth}/100</Text>
                    {generatePowerButtons()}
                </View>
            </>}

            
        </View>
    )
}

const style = StyleSheet.create({
    title: {
        fontSize: 32,
        textAlign: "center",
        fontFamily: "Poppins-Bold"
    },
    healthBarImage:{
        width: 100,
        height: 50,
        position: "absolute",
        bottom: 0,
        transform: "translateY(28%)"
    },
    healthBarPartDefault: {
        width: 30, 
        height: 20,
        borderColor: "black",
        borderRightWidth: 2,
        borderBottomWidth: 2,
        borderTopWidth: 2
    },
    healthBarPartFirst: {
        borderLeftWidth: 2,
        borderBottomLeftRadius: 5,
        borderTopLeftRadius: 5
    },
    healthBarPartLast: {
        borderTopRightRadius: 5,
        borderBottomRightRadius: 5
    },
    healthBarPartFull: {
        backgroundColor: "red"
    },
    powerButtonsWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        paddingBottom: 20
    },
    powerImage:{
        width: 32,
        height: 32
    }

})

export default BossFight