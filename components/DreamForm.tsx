import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { TextInput, Button, Checkbox } from "react-native-paper";


const { width } = Dimensions.get("window");


export default function DreamForm() {

    const [dreamText, setDreamText] = useState("");
    const [isLucidDream, setIsLucidDream] = useState(false);
    const handleDreamSubmission = () => {
        // Logique de traitement de la soumission du rêve
        console.log("Rêve soumis:", dreamText, "Lucide:", isLucidDream);
        // Réinitialisation du formulaire
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
