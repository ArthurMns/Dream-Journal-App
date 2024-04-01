import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Modal, Text, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayDream from "./DisplayDream";

export interface DreamData {
    dreamTitle: string;
    dreamText: string;
    isLucidDream: boolean;
}

interface HistoricProps {
    isModalOpen: boolean;
    closeModal: () => void;
}

export default function Historic({ isModalOpen, closeModal }: HistoricProps): JSX.Element {

    const [dataArray, setdataArray] = useState<DreamData[]>([]);
    const [selectedDream, setSelectedDream] = useState<DreamData | null>(null);

    const showModal = (dream: DreamData) => {
        setSelectedDream(dream);
        console.log(setSelectedDream(dream));
        console.log(dream);

        closeModal();

    };


    // Refresh la page au changement de page
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

    // Refresh si dataArray change
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
        <ScrollView>
            <View style={styles.container}>
                <Text>Liste rêves :</Text>
                {dataArray.map((dream, index) => (
                    <View style={styles.childContainer}>
                        <Button title={dream.dreamTitle ? dream.dreamTitle : "Pas de Titre ajouté"} onPress={() => showModal(dream)}>
                        </Button>

                        <Button title="Delete" onPress={() => deleteDream(index)}></Button>

                    </View>
                ))}
                <Modal visible={isModalOpen} onDismiss={closeModal} style={styles.modalContent}>
                    {selectedDream && (
                        <DisplayDream dream={selectedDream} />
                    )}
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
    },
    childContainer: {
        margin: 10
    }
});

