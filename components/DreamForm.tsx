import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';


const { width } = Dimensions.get("window");


export default function DreamForm() {

    const [dreamText, setDreamText] = useState("");
    const [isLucidDream, setIsLucidDream] = useState(false);

    const handleDreamSubmission = async () => {

        try {
            // Récupérer le tableau actuel depuis AsyncStorage
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];
            // Ajouter le nouveau formulaire au tableau
            formDataArray.push({ dreamText, isLucidDream });
            // Sauvegarder le tableau mis à jour dans AsyncStorage
            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));
            console.log(
                'AsyncStorage: ',
                existingData
            );
        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }

        setDreamText("");
        setIsLucidDream(false);
    };

    return (
        <View style={styles.container}>
            <TextInput
                label="Rêve"
                value={dreamText}
                onChangeText={(text) => setDreamText(text)}
                mode="outlined"
                multiline
                numberOfLines={6}
                style={[styles.input, { width: width * 0.8, alignSelf: "center" }]}
            />
            <View style={styles.checkboxContainer}>
                <Checkbox.Item
                    label="Rêve Lucide"
                    status={isLucidDream ? "checked" : "unchecked"}
                    onPress={() => setIsLucidDream(!isLucidDream)}
                />
            </View>
            <Button
                mode="contained"
                onPress={handleDreamSubmission}
                style={styles.button}>
                Soumettre
            </Button>
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
