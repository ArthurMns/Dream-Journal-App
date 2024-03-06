import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';

interface DreamData {
    dreamText: string;
    isLucidDream: boolean;
}

export default function Historic(): JSX.Element {

    const [dataArray, setdataArray] = useState<DreamData[]>([]);

    useEffect(() => {
        const getHistoric = async () => {
            try {
                const tmp = await AsyncStorage.getItem('dreamFormDataArray');
                setdataArray(tmp ? JSON.parse(tmp) : []);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        }
        getHistoric();
    }, []);

    useEffect(() => {
        const updateComponent = async () => {
            try {
                const data = await AsyncStorage.getItem('dreamFormDataArray');
                const dreamFormDataArray: DreamData[] = data ? JSON.parse(data) : [];
                setdataArray(dreamFormDataArray);
            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }
        };
        updateComponent();
    }, [dataArray]);

    return (
        <View style={styles.container}>
            <Text>Liste rêves :</Text>
            {dataArray.map((dream, index) => (
                <Text key={index}>{dream.dreamText ? dream.dreamText : "Pas de description ajoutée"} : {dream.isLucidDream ? 'Lucide' : 'Non Lucide'}</Text>
            ))}
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
