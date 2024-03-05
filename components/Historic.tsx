import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from "react";


// const { width } = Dimensions.get("window");


export default function Historic() {

    const [dataArray, setdataArray] = useState([]);

    useEffect(() => {
        // getHistoric()
        const getHistoric = async () => {
            try {
                // Récupérer le tableau actuel depuis AsyncStorage
                const tmp = await AsyncStorage.getItem('dreamFormDataArray');
                // const tmp2 = tmp ? JSON.parse(tmp) : undefined;
                setdataArray(tmp ? JSON.parse(tmp) : null);
    
            } catch (error) {
                console.error('Erreur lors de la sauvegarde des données:', error);
            }
        }
        getHistoric()

    }, [])

    const getHistoric = async () => {



    };

    
    return (
        <View style={styles.container}>
            <Text>Liste rêves</Text>
            {dataArray.map((dream, index) => {
                // console.log(dream);
                <Text key={index}>{dream}</Text>
            })}
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    checkboxContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    button: {
        marginTop: 8,
    },
});
