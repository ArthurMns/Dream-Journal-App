import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Modal, Text, ScrollView, Pressable } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DisplayDream from "./DisplayDream";

export interface DreamData {
    dreamTitle: string;
    dreamText: string;
    isLucidDream: boolean;
    isNightmare: boolean;
    inputDate: any;
}

export default function Historic(): JSX.Element {

    const [dataArray, setdataArray] = useState<DreamData[]>([]);
    const [selectedDream, setSelectedDream] = useState<DreamData | null>(null);

    const [modalVisible, setModalVisible] = useState(false);

    const showModal = (dream: DreamData) => {
        setSelectedDream(dream);
        setModalVisible(true)

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
        const getHistoric2 = async () => {
            try {
                const data = await AsyncStorage.getItem('dreamFormDataArray');
                setdataArray(data ? JSON.parse(data) : []);

            } catch (error) {
                console.error('Erreur lors de la mise à jour des données:', error);
            }
        };
        getHistoric2();
    }, [dataArray]);

    const deleteDream = async (index: number) => {
        try {
            const data = await AsyncStorage.getItem('dreamFormDataArray');
            const dreamFormDataArray: DreamData[] = data ? JSON.parse(data) : [];
            dreamFormDataArray.splice(index, 1);

            await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(dreamFormDataArray));

        }
        catch (error) {
            console.error("Error deleting dream" + error);
        }
    }

    return (
        <ScrollView style={styles.container}>
            <View>
                <Text style={styles.boldText}>Liste rêves :</Text>
                {dataArray.map((dream, index) => (
                    <View style={styles.childContainer} key={index}>
                        <Pressable style={[styles.button]} onPress={() => showModal(dream)}>
                            <Text>{dream.dreamTitle ? dream.dreamTitle : "Pas de Titre ajouté "}</Text>
                            <Text>{dream.inputDate}</Text>
                        </Pressable>

                        <Button title="Delete" onPress={() => deleteDream(index)} ></Button>

                    </View>
                ))}
                <Modal visible={modalVisible} onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
                    animationType="slide"
                    // transparent={true}
                    style={[styles.centeredView]}>
                    <View style={styles.modalContent}>
                        {selectedDream && (<DisplayDream dream={selectedDream} />)}

                        <Pressable style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text >Close dream</Text>
                        </Pressable>
                    </View>
                </Modal>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        marginBottom: 110,
        width: '100 %',

    },
    modalContent: {
        flex: 1,
        backgroundColor: 'white',
        padding: 35,
    },
    childContainer: {
        margin: 10,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    button: {
        borderRadius: 10,
        width: '100 %',
        padding: 10,
        backgroundColor: '#E6E6FA',
    },

    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    boldText: {
        fontWeight: 'bold',
    }
});

