import React, { useEffect, useState } from "react";
import { View, StyleSheet, Button, Modal, Text, ScrollView, Pressable } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';
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

    const showModalDream = (dream: DreamData) => {
        setSelectedDream(dream);
        setModalDreamVisible(true);
    };

    const showModalDelete = (index: number) => {
        setModalDeleteVisible(true);
        console.log(index);
    };

    const getHistoric = async (): Promise<void> => {
        try {
            const tmp = await AsyncStorage.getItem('dreamFormDataArray');
            setdataArray(tmp ? JSON.parse(tmp) : []);
        } catch (error) {
            console.error('Erreur lors de la récupération des données get:', error);
        }
    }

    // Refresh la page au chargement
    useEffect(() => {
        getHistoric();
    }, []);

    // Refresh si dataArray change
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

                        {/* <Button title="Delete" onPress={async () => deleteDream(index)} /> */}

                        <Button title="Delete" onPress={() => showModalDelete(index)} />

                        <Modal transparent visible={modalDeleteVisible} onRequestClose={() => setModalDeleteVisible(false)} animationType="slide">
                            <View style={styles.centeredView}>
                                <View style={styles.modalContentDelete}>
                                    <Text>Etes vous sur de vouloir supprimer le reve ?</Text>

                                    <View style={styles.doublePressable}>

                                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalDeleteVisible(false)}>
                                            <Text >Annuler</Text>
                                        </Pressable>

                                        <Pressable style={[styles.button, styles.buttonClose]} onPress={() => console.log(index)}>
                                            <Text >Suppriper</Text>
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
        </ScrollView>
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
        flex: 1,
        padding: 35,
        backgroundColor: '#E6E6FA',
    },
    doublePressable: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around'
    }
});
