import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { Text, Button, PaperProvider, Portal, Modal } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';

interface DreamData {
    dreamTitle: string;
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

    const fonction = (index: number) => {

        const [visible, setVisible] = React.useState(false);

        // const showModal = () => setVisible(true);
        const hideModal = () => setVisible(false);
        const containerStyle = { backgroundColor: 'white', padding: 20 };


        return (
            // <PaperProvider>
                // <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                        <Text>{dataArray[index].dreamText ? dataArray[index].dreamText : "Pas de description ajoutée"} : {dataArray[index].isLucidDream ? 'Lucide' : 'Non Lucide'}</Text>
                    </Modal>
                // </Portal>
            // </PaperProvider >
        )
}

return (
    <View style={styles.container}>
        <Text>Liste rêves :</Text>
        {dataArray.map((dream, index) => (
            <Button key={index} onPress={() => fonction(index)}>
                {dream.dreamTitle ? dream.dreamTitle : "Pas de Titre ajouté"}
                {/* {dream.dreamText ? dream.dreamText : "Pas de description ajoutée"} : {dream.isLucidDream ? 'Lucide' : 'Non Lucide'} */}
            </Button>
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
