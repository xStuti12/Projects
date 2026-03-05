import React, { useEffect, useRef, useState } from 'react';
import { View, Image, StyleSheet, Text, ScrollView, Dimensions, Animated, TouchableOpacity, Easing, findNodeHandle, UIManager } from 'react-native';
import Draggable  from 'react-native-draggable';
import images, { getImage } from '../../../assets';
import { craftRock, getBackpack } from '../../../Services/Backpack.Service';
import { CaveScreenNavigationProp } from '../../../Models/Map';
import { recipes } from '../../../assets/recipes';
import { Recipe } from '../../../Models/Recipe';
import Header from '../../Header/Header';
import { Rock, RockName, RockRarity } from '../../../Models/Rock';
import assetsRives from '../../../assets/stoneRives';
import Rive from 'rive-react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

type GridWithDropProps = {
    navigation: CaveScreenNavigationProp;
    onReturnFromBossFight: Function;
    globalSetMatchedRecipe: Function;
}

const {width, height} = Dimensions.get("screen");

type LayoutData = {
    x: number,
    y: number,
    width: number,
    height: number
}

export default function GridWithDrop(props: GridWithDropProps) {
    const [dropZones, setDropZones] = useState(Array(9).fill(null)); // indexy obrázkov v zónach
    const [shouldReverse, setShouldReverse] = useState(true);
    const [availableResources, setAvailableResources] = useState(getBackpack().pickedResource)

    const translateY = useRef(new Animated.Value(100)).current;
    const [zIndexValue, setZIndexValue] = useState(0); // normálny state, nie animovaný
    const [isOpen, setIsOpen] = useState(false);

    const [matchedRecipe, setMatchedRecipe] = useState<Recipe | null>(null)

    const inventoryWrapperRef = useRef<View | null>(null);
    const [layout, setLayout] = useState<LayoutData | null>(null);

    const scrollX = useRef(new Animated.Value(0)).current;
    const [contentWidth, setContentWidth] = useState(1);
    const [viewportWidth, setViewportWidth] = useState(Dimensions.get("window").width);

    const maxScroll = Math.max(contentWidth - viewportWidth, 1);

    const rotate = scrollX.interpolate({
        inputRange: [0, maxScroll],
        outputRange: ['0deg', '360deg'],
        extrapolate: 'clamp',
    });

    const AnimatedSvg = Animated.createAnimatedComponent(Svg);

    const [craftingBenchLayout, setCraftingBenchLayout] = useState<LayoutData | null>(null);
    const crafitBenchWrapper = useRef<View | null>(null);
    const rotateSmallVal = useRef(new Animated.Value(0)).current;

    const rotateSmall = rotateSmallVal.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg']
    })

    const returnFromBossFight = (result: boolean) => {
        setDropZones(Array(9).fill(null))
        props.onReturnFromBossFight(result)
    }

    const isRecipeValid = () => {
        let filledCells = [];
        let row = 0, col = 0;
        for(let i = 0; i < dropZones.length; i++){
            if(dropZones[i]){
                filledCells.push({xPos: row, yPos: col, resourceName: dropZones[i].name})
            }
            col++;
            if(col === 3){
                col = 0;
                row++;
            }            
        }

        // monke way is the right way monke smort monke stronk
        for(let recipe of recipes){
            if(JSON.stringify(recipe.recipesPart) === JSON.stringify(filledCells)){
                setMatchedRecipe(recipe)
                props.globalSetMatchedRecipe(recipe)
                return
            }
        }
        setMatchedRecipe(null)
    }

    useEffect(() => {
        isRecipeValid()
    }, [dropZones])

    useEffect(() => {
        if(matchedRecipe){
            handleOpen();
        }
        else if(!matchedRecipe && isOpen){
            handleOpen();
        }
    }, [matchedRecipe])

    const handleOpen = () => {
        if(!isOpen){
            setTimeout(() => {
                setZIndexValue(3);
            }, 600)
            Animated.timing(rotateSmallVal, {
                toValue: 1,
                duration: 1000,
                useNativeDriver: true,
                easing: Easing.linear
            }).start()
        }else{
            rotateSmallVal.setValue(0);
            setZIndexValue(0);
        }

        Animated.timing(translateY, {
            toValue: isOpen ? 100 : 0,
            duration: 750,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start(() =>{
            setIsOpen(!isOpen)
        });
    };

    const handleMatchedRecipeButton = () => {        
        if(!matchedRecipe) return null;
        let craftedRock = craftRock(matchedRecipe);
        props.navigation.navigate("BossFight", {cratfedRock: craftedRock, onReturn: returnFromBossFight})
    }

    function getZoneIndexFromCoords(x: number, y: number) {
        const headerHeight = 50;
        const gridTop = 25;
        const gridLeft = 35;
        const boxSize = 70;
        const margin = 5;
        const totalSize = boxSize + margin * 2;
    
        const relativeX = x - gridLeft;
        const relativeY = y - gridTop - headerHeight;
    
        if (relativeX < 0 || relativeY < 0) return null;
    
        const col = Math.floor(relativeX / totalSize);
        const row = Math.floor(relativeY / totalSize);
    
        if (col > 2 || row > 2) return null;
    
        const index = row * 3 + col;
        return index;
    }

    const handleZoneDrop = (fromIndex: number, toIndex: number, item: any) => {
        const updatedZones = [...dropZones];
        if(updatedZones[toIndex]) return;
        updatedZones[fromIndex] = null;
        updatedZones[toIndex] = item;
        setDropZones(updatedZones);
    };

  const renderInventory = () => {
    return availableResources.map((p,i) => {
        return (<View key={i} style={styles.inventoryItemWrapper}>
                <Draggable
                    x={10}
                    y={0}
                    key={`${shouldReverse}-${Date.now()}`}
                    z={10}
                    renderSize={40}
                    shouldReverse={true}
                    onDragRelease={(e, gestureState) => {
                        if(p.count <= 0) return;
                        const x = gestureState.moveX;
                        const y = gestureState.moveY;
                        const zoneIndex = getZoneIndexFromCoords(x, y);
                        if (zoneIndex !== null) {
                            const newZones = [...dropZones];
                            newZones[zoneIndex] = p;
                            setDropZones(newZones);
                            setShouldReverse(false);

                            setAvailableResources(prev => {
                                return prev.map(picked => {
                                    if(picked.name != p.name) return picked
                                    picked.count--
                                    return picked
                                })
                            })

                        }
                        else{
                            setShouldReverse(true);
                        }
                    }}
                >
                    <Image source={images[p.name]} style={{width: 40, height: 40, resizeMode: "contain"}} />
                </Draggable>
            <View style={{width: 25, height: 25}}></View>
            <Text style={{color: "white", fontSize: 12}}>{p.count}x</Text>
        </View>
        )
    });
  }

  const renderRockImage = (name: RockName) => {
    if(Object.keys(assetsRives).includes(name)){
        let riveElementToReturn = <Rive autoplay={false} style={{ width: "100%", height: "100%", pointerEvents: "none" }} resourceName={assetsRives[name]} />
        return (
            <View style={{width: 65, height: 65, borderRadius: 10, overflow: "hidden"}}>
                {riveElementToReturn}
            </View>
        )
    }
    else{
        return getImage(name, styles.recipeBtnImage)
    }
  }

  //this is needed to correctly place SVG
  //x,y in layout state is top left corner of inventory wrapper
  const measureView = () => {
    inventoryWrapperRef.current?.measure((x, y, w, h, pageX, pageY) => {        
        setLayout({
            x: pageX,
            y: pageY,
            height: h,
            width: w
        });
    })
  }

  const measureCraftinBench = () => {
    crafitBenchWrapper.current?.measure((x,y,w,h, pageX, pageY) => {
        setCraftingBenchLayout({
            x: pageX,
            y: pageY,
            height: h,
            width: w
        })
    } )
  }

  const generateCraftingBench = () => {
    let res = [];
    let count = 0;
    let row = [];

    for(let i = 0; i < dropZones.length; i++){
        if(dropZones[i]){
            row.push(
                <View key={i} style={styles.dropZone}>
                    <Draggable
                                    x={5} y={5}
                                    renderSize={55}
                                    shouldReverse={true}
                                    onDragRelease={(e, gestureState) => {
                                        const x = gestureState.moveX;
                                        const y = gestureState.moveY;
                                        const newIndex = getZoneIndexFromCoords(x, y);
                                        if (newIndex !== null && newIndex !== i) {
                                            handleZoneDrop(i, newIndex, dropZones[i]);
                                        }
                                    }}
                                    onShortPressRelease={() => {
                                        const newZones = [...dropZones];
                                        newZones[i] = null;
                                        setDropZones(newZones);

                                        setAvailableResources(prev => {
                                            return prev.map(picked => {
                                                if(picked.name != dropZones[i].name) return picked
                                                picked.count++
                                                return picked
                                            })
                                        })
                                    }}
                    >
                        <Image source={images[dropZones[i].name]} style={{width: 55, height: 55, resizeMode: "contain"}} />
                    </Draggable>
                </View>
            )
        }
        else{
            row.push(<View key={i} style={styles.dropZone}></View>)
        }
        count++;
        if(count === 3){
            res.push(<View key={count/3 + i} style={styles.rowWrapper}>{row}</View>)
            row = [];
            count = 0;
        }
    }

    return res;
  }

  const cogWheelRadius = width / 5;

  const generateTeeths = (cx: number, cy: number, toothCount: number, toothWidth: number, toothHeight: number, cornerRadius: number, fill: string, cogwheelradius: number) => {
        if(!layout) return;

        /* const cx = width/4
        const cy = layout.height/2;
        const toothCount = 6;
        const toothWidth = 50;
        const toothHeight = 25;
        const cornerRadius = 10; */
        const angleStep = (2 * Math.PI) / toothCount;

        const teeth = Array.from({ length: toothCount }).map((_, i) => {
            const angle = i * angleStep;
            const x = cx + (cogwheelradius * Math.cos(angle)) - toothWidth / 2;
            const y = cy + (cogwheelradius * Math.sin(angle)) - toothHeight / 2;
            const rotation = (angle * 180) / Math.PI + 90;

            return (
            <Rect
                key={i}
                x={x}
                y={y}
                width={toothWidth}
                height={toothHeight}
                rx={cornerRadius}
                ry={cornerRadius}
                fill={fill}
                transform={`rotate(${rotation}, ${x + toothWidth / 2}, ${y + toothHeight / 2})`}
            />
            );
        });
        return teeth
    }

    return (
        <View style={styles.container}>
            <Header centerText='Kameňo-stroj' nav={props.navigation} showGoBack showProfile showSettings/>
             {craftingBenchLayout &&
                <>
                    <View style={{position: "absolute", left: craftingBenchLayout.x - craftingBenchLayout.width/4, top: craftingBenchLayout.y, width: 50, height: 50}}>
                        <AnimatedSvg
                            height={50}
                            width={50}
                            viewBox={`0 0 ${50} ${50}`}
                            pointerEvents='none'
                            style={{transform: [{rotate: rotateSmall}]}}
                        >
                            <Circle
                                cx={25}
                                cy={25}
                                r={20}
                                fill={"#21277A"}
                            />
                            <Circle
                                cx={25}
                                cy={25}
                                r={10}
                                fill={"#D8EFEF"}
                            />
                            {generateTeeths(25, 25, 6, 12.5, 10, 2.5, "#21277A", 20)}
                        </AnimatedSvg>
                    </View>

                    <View style={{position: "absolute", left: craftingBenchLayout.x + craftingBenchLayout.width/1.5, top: craftingBenchLayout.y - craftingBenchLayout.height/3, width: 50, height: 50}}>
                        <AnimatedSvg
                            height={50}
                            width={50}
                            viewBox={`0 0 ${50} ${50}`}
                            pointerEvents='none'
                            style={{transform: [{rotate: rotateSmall}]}}
                        >
                            <Circle
                                cx={25}
                                cy={25}
                                r={20}
                                fill={"#21277A"}
                            />
                            <Circle
                                cx={25}
                                cy={25}
                                r={10}
                                fill={"#D8EFEF"}
                            />
                            {generateTeeths(25, 25, 6, 12.5, 10, 2.5, "#21277A", 20)}
                        </AnimatedSvg>
                    </View>

                    <View style={{position: "absolute", left: craftingBenchLayout.x + craftingBenchLayout.width/3, top: craftingBenchLayout.y + craftingBenchLayout.height/1.15, width: 50, height: 50}}>
                        <AnimatedSvg
                            height={50}
                            width={50}
                            viewBox={`0 0 ${50} ${50}`}
                            pointerEvents='none'
                            style={{transform: [{rotate: rotateSmall}]}}
                        >
                            <Circle
                                cx={25}
                                cy={25}
                                r={20}
                                fill={"#21277A"}
                            />
                            <Circle
                                cx={25}
                                cy={25}
                                r={10}
                                fill={"#D8EFEF"}
                            />
                            {generateTeeths(25, 25, 6, 12.5, 10, 2.5, "#21277A", 20)}
                        </AnimatedSvg>
                    </View>
                </>
                }
            <View style={styles.grid} ref={crafitBenchWrapper} onLayout={() => measureCraftinBench()}>
                {generateCraftingBench()}
            </View>
            <View style={styles.middleLayer}>
                <View style={styles.recipeBtnWrapper}>
                    <TouchableOpacity onPress={() => props.navigation.navigate("RecipesViewer") }>
                        <View style={styles.recipeBtnImageWrapper}>
                            <Text style={{color: "white"}}>Recepty</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.resultWrapper}>
                    <Animated.View style={[styles.resultTop, {transform: [{translateY}]}]}></Animated.View>
                    <Animated.View style={[styles.resultMiddle, {transform: [{translateY}], zIndex: zIndexValue}]}>
                        <TouchableOpacity onPress={handleMatchedRecipeButton}>
                            {renderRockImage(matchedRecipe?.recipeFor!)}
                        </TouchableOpacity>
                    </Animated.View>
                    <View style={styles.resultBottom}></View>
                </View>
            </View>
            

             {layout && (
                    <View style={[{position: "absolute", left: layout.x, top: layout.y - (layout.height) / 4, width: width/2 , height: layout.height + 25}]}>
                        <AnimatedSvg
                            height={layout.height + 25}
                            width={width/2}
                            viewBox={`0 0 ${width/2} ${layout.height}`}
                            pointerEvents='none'
                            style={{transform: [{rotate}]}}
                        >
                            <Circle
                                cx={width/4}
                                cy={layout.height/2}
                                r={cogWheelRadius}
                                fill="#8F3ADE"
                            />
                            {generateTeeths(width/4, layout.height/2, 6, 50, 25, 10, "#8F3ADE", cogWheelRadius)}
                        </AnimatedSvg>
                    </View>
                )}


            <View style={styles.inventoryWrapper} ref={inventoryWrapperRef} onLayout={(e) => {measureView(); setViewportWidth(e.nativeEvent.layout.width); console.log("neheheh")}}>
                <Animated.ScrollView  scrollEventThrottle={16} 
                                      onContentSizeChange={(w,h) => {setContentWidth(w); console.log("kkokot")}}
                                      onScroll={Animated.event(
                                        [{nativeEvent: {contentOffset: {x: scrollX}}}],
                                        {useNativeDriver: true}
                                      )}
                                      alwaysBounceHorizontal={false} 
                                      style={{overflow: "visible", maxHeight: "50%", marginTop: 25}}  
                                      contentContainerStyle={{zIndex: 10, gap: 10, marginHorizontal: 20}} 
                                      horizontal={true}>
                    {renderInventory()}
                </Animated.ScrollView>
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    grid: {
        marginTop: 25,
        marginLeft: 35,
        padding: 10,
        backgroundColor: "#42BFDD",
        borderRadius: 15,
        alignSelf: "flex-start",
    },
    dropZone: {
        display: "flex",
        width: 70,
        height: 70,
        margin: 5,
        backgroundColor: "white",
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 15
    },
    rowWrapper: {
        display: "flex",
        flexDirection: "row",
    },
    droppedImage: {
        width: 60,
        height: 60,
    },
    inventoryItemWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: 'center',
        padding: 25,
        position: "relative",
        overflow: "visible"
    },
    recipeBtnWrapper: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: 115,
        height: 90,
        backgroundColor: "#42BFDD",
        borderRadius: 15,
        marginTop: 10,
        marginLeft: 15,
        padding: 25
    },
    recipeBtnImageWrapper: {
        width: 65,
        height: 65,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#21277A",
        borderRadius: 15
    },
    recipeBtnImage: {
        width: 50,
        height: 50,
    },
    middleLayer: {
        marginTop: 15,
        marginBottom: 60,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    resultWrapper: {
        marginRight: 30,
        width: 120,
        height: 175,
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden"
    },
    resultTop: {
        width: 120,
        height: 40,
        backgroundColor: "#061C55",
        borderRadius: 15,
        boxShadow: "0px 10px 0px 0px #283557",
        zIndex: 5
    },
    resultMiddle: {
        width: 80,
        height: 100,
        backgroundColor: "#42BFDD",
        borderRadius: 15,
        zIndex: 3,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    resultBottom: {
        position: "absolute",
        bottom: 15,
        width: 120,
        height: 40,
        borderRadius: 15,
        backgroundColor: "#061C55",
        boxShadow: "0px 15px 0px 0px #283557",
    },
    matchedRecipeImage: {
        height: 48,
        width: 48
    },
    inventoryWrapper: {
        backgroundColor: "#8F3ADE",
        flex: 1,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        overflow: "visible"
    }
});