import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Modal, Text, ScrollView, Pressable } from "react-native";
import DisplayDream from "./DisplayDream";
import { Searchbar } from 'react-native-paper';

import { deleteDream, DreamData } from '../controllers/dreamController';
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function Historic(): JSX.Element {

    const [dataArray, setdataArray] = useState<DreamData[]>([]);
    const [selectedDream, setSelectedDream] = useState<DreamData | null>(null);
    const [modalDreamVisible, setModalDreamVisible] = useState(false);
    const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [deleteIndex, setDeleteIndex] = useState<number | null>(null);

    const showModalDream = (dream: DreamData): void => {
        setSelectedDream(dream);
        setModalDreamVisible(true);
    };

    const showModalDelete = (index: number, dream: DreamData): void => {
        setDeleteIndex(index);
        setSelectedDream(dream);
        setModalDeleteVisible(true);
    };

    const handleDelete = async (): Promise<void> => {
        if (deleteIndex !== null) {
            await deleteDream(deleteIndex);
            setDeleteIndex(null);
            setModalDeleteVisible(false);
        }
    };

    const getHistoric = async (): Promise<void> => {
        try {
            const tmp = await AsyncStorage.getItem('dreamFormDataArray');
            setdataArray(tmp ? JSON.parse(tmp) : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des données get:', error);
        }
    }

    useEffect(() => {
        getHistoric();
    }, []);

    useEffect(() => {
        getHistoric();
    }, [dataArray]);


    const filteredDreams = dataArray.filter(dream =>
        dream.dreamTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <ScrollView style={styles.container}>
            <View>
                <Searchbar
                    style={styles.search}
                    placeholder="Search"
                    onChangeText={setSearchQuery}
                    value={searchQuery}
                />
                <Text style={styles.boldText}>Liste rêves :</Text>
                {filteredDreams.map((dream, index) => (
                    <View style={styles.childContainer} key={index}>

                        <Pressable style={styles.button} onPress={() => showModalDream(dream)}>
                            <Text>{dream.dreamTitle ? dream.dreamTitle : "Pas de Titre ajouté "}</Text>
                            <Text>{dream.inputDate}</Text>
                        </Pressable>

                        <Button title="Delete" onPress={() => showModalDelete(index, dream)} />

                        <Modal transparent visible={modalDeleteVisible} onRequestClose={() => setModalDeleteVisible(false)} animationType="fade">
                            <View style={styles.centeredView}>
                                <View style={styles.modalContentDelete}>
                                    <Text>Etes vous sur de vouloir supprimer le reve {selectedDream?.dreamTitle} ?</Text>

                                    <View style={styles.doublePressable}>

                                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalDeleteVisible(false)}>
                                            <Text >Annuler</Text>
                                        </Pressable>

                                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => handleDelete()}>
                                            <Text >Supprimer</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        </Modal>

                    </View>
                ))}

                <Modal visible={modalDreamVisible} onRequestClose={() => setModalDreamVisible(false)} animationType="slide">
                    <View style={styles.centeredView}>
                        <View style={styles.modalContent}>
                            {selectedDream && (<DisplayDream dream={selectedDream} />)}

                            <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalDreamVisible(false)}>
                                <Text >Close dream</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>

            </View>
        </ScrollView >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
        marginBottom: 110,
        width: '100%',
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
        padding: 10,
        backgroundColor: '#E6E6FA',
    },
    buttonClose: {
        backgroundColor: '#2196F3',
        marginTop: 15,
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
        marginLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    search: {
        marginLeft: 18,
        width: '90%',
    },
    modalContentDelete: {
        padding: 35,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    doublePressable: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
    }
});
