import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Text, Button, Modal, Provider } from "react-native-paper";

import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayDream from "./DisplayDream";

export interface DreamData {
    dreamTitle: string;
    dreamText: string;
    isLucidDream: boolean;
}

export default function Historic(): JSX.Element {

    const [dataArray, setdataArray] = useState<DreamData[]>([]);
    const [visible, setVisible] = useState(false);
    const [selectedDreamIndex, setSelectedDreamIndex] = useState<number | null>(null);

    const showModal = (index: number) => {
        setSelectedDreamIndex(index);
        setVisible(true);
    };

    const hideModal = () => setVisible(false);

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

    const deleteDream = async (index: number) => {
        try {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamFormDataArray: DreamData[] = data ? JSON.parse(data) : [];
            dreamFormDataArray.splice(index, 1);

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(dreamFormDataArray));


        }
        catch (error) {
            console.log("Error deleting dream" + error);

        }
    }

    return (
        <Provider>
            <View style={styles.container}>
                <Text>Liste rêves :</Text>
                {dataArray.map((dream, index) => (
                    <View>
                        <Button key={index} onPress={() => showModal(index)}>
                            {dream.dreamTitle ? dream.dreamTitle : "Pas de Titre ajouté"}
                        </Button>
                        <Button onPress={() => deleteDream(index)}>Delete</Button>
                    </View>
                ))}
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modalContent}>
                    {selectedDreamIndex !== null && (
                        <DisplayDream dream={dataArray[selectedDreamIndex]} hideModal={hideModal} />
                    )}
                </Modal>
            </View>
        </Provider>
    );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        padding: 5,
    },
    modalContent: {
        width: width * 0.7, // Largeur de la modal à 90% de la largeur de l'écran
        backgroundColor: 'white',
        padding: 20,
    },
});
