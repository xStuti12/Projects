import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { getStats } from "../../../Services/User.Service";

const PlayerStats = () => {

    const [stats, setStats] = useState<any>({});

    useEffect(() => {
        setStats(getStats());
    }, [])

    return(
        <View style={styles.wrapper}>
            <Text style={styles.title}>Štatistiky</Text>
            <View style={styles.contentWrapper}>
                <View style={styles.container}>
                    <Text style={styles.smallTitle}>Kamene</Text>
                    <Text style={styles.biggerText}>{stats.rockStats}</Text>
                </View>
                <View style={styles.container}>
                    <Text style={styles.smallTitle}>Prvky</Text>
                    <Text style={styles.biggerText}>{stats.resourcesCount}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex: 1,
        marginTop: 15,
        marginLeft: 25
    },
    title: {
        fontFamily: "Poppins-Bold",
        fontSize: 22
    },
    contentWrapper: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
    },
    container: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    smallTitle: {
        fontFamily: "Poppins-Regular",
        fontSize: 16
    },
    biggerText: {
        fontFamily: "Poppins-Bold",
        fontSize: 20
    }
})

export default PlayerStats;