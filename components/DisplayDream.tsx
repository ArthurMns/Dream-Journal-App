import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { DreamData } from "../controllers/dreamController";

interface DisplayDreamProps {
    dream: DreamData;
}

const DisplayDream: React.FC<DisplayDreamProps> = ({ dream }) => {

    return (
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.textTitle}><Text style={styles.boldText}>Titre:</Text> {dream.dreamTitle}</Text>
                <Text style={styles.modalText}><Text style={styles.boldText}>Description:</Text> {dream.dreamText ? dream.dreamText : "Pas de description ajoutée"} :</Text>
                <Text><Text style={styles.boldText}>Caractéristiques:</Text> {dream.isNightmare ? 'Cauchemare' : 'Rêve'} {dream.isLucidDream ? 'Lucide' : 'Non Lucide'}</Text>
            </View>
        </View>
    );
};

export default DisplayDream;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    textTitle: {
        marginBottom: 10
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    }
});
