import React, { useState } from "react";
import { View, StyleSheet, Dimensions, ScrollView } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';
import { DatePickerInput } from "react-native-paper-dates";


const { width } = Dimensions.get("window");


export default function DreamForm() {

    const [dreamTitle, setDreamTitle] = useState("");
    const [dreamText, setDreamText] = useState("");
    const [isLucidDream, setIsLucidDream] = useState(false);
    const [isNightmare, setIsNightmare] = useState(false);
    let inputDate;

    const handleDreamSubmission = async () => {

        try {
            // Récupérer le tableau actuel depuis AsyncStorage
            const existingData = await AsyncStorage.getItem('dreamFormDataArray');
            const formDataArray = existingData ? JSON.parse(existingData) : [];
            // Ajouter le nouveau formulaire au tableau
            inputDate = new Date().toLocaleDateString();

            formDataArray.push({ dreamTitle, dreamText, isLucidDream, isNightmare, inputDate });
            // Sauvegarder le tableau mis à jour dans AsyncStorage
            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(formDataArray));

        } catch (error) {
            console.error('Erreur lors de la sauvegarde des données:', error);
        }

        setDreamTitle("");
        setDreamText("");
        setIsLucidDream(false);
        setIsNightmare(false);
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <TextInput
                    label="Titre"
                    value={dreamTitle}
                    onChangeText={(text) => setDreamTitle(text)}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                    style={[styles.input, styles.input2, { width: width * 0.8, alignSelf: "center" }]}
                />
                <TextInput
                    label="Rêve"
                    value={dreamText}
                    onChangeText={(text) => setDreamText(text)}
                    mode="outlined"
                    multiline
                    numberOfLines={6}
                    style={[styles.input, { width: width * 0.8, alignSelf: "center" }]}
                />
                <View style={styles.checkBoxContainer}>
                    <View style={styles.checkbox}>
                        <Checkbox.Item
                            label="Rêve Lucide"
                            status={isLucidDream ? "checked" : "unchecked"}
                            onPress={() => setIsLucidDream(!isLucidDream)}
                        />
                    </View>
                    <View style={styles.checkbox}>
                        <Checkbox.Item
                            label="Cauchemar"
                            status={isNightmare ? "checked" : "unchecked"}
                            onPress={() => setIsNightmare(!isNightmare)}
                        />
                    </View>
                </View>
                <Button
                    mode="contained"
                    onPress={handleDreamSubmission}
                    style={styles.button}>
                    Soumettre
                </Button>
            </View>
        </ScrollView>

    );
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    input: {
        marginBottom: 16,
    },
    input2: {
        height: 60,
    },
    button: {
        marginTop: 8,
    },
    checkbox: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,
    },
    checkBoxContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
});
