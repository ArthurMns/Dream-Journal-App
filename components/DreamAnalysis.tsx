import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { SelectList } from 'react-native-dropdown-select-list'

import { DreamData, ApiResponse } from '../controllers/dreamController';


export default function DreamAnalysis(): JSX.Element {

    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    const [dataArray, setdataArray] = useState<DreamData[]>([]);

    const [selected, setSelected] = React.useState("");

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


    const data = dataArray.map(dream => ({
        value: dream.dreamTitle,
    }));

    async function getDreamTextByTitle(title: string) {
        const dream = dataArray.find(dream => dream.dreamTitle === title);
        return dream ? dream.dreamText : "Dream not found";

    }

    const handleApiRequest = async (title: string): Promise<void> => {
        try {
            const apiUrl = 'https://api.meaningcloud.com/topics-2.0';
            const language = 'fr';
            const tmpDream = (await getDreamTextByTitle(title)).toString();

            const apiKey = "db4715c17b1e6fc19c1478bd8fde5c0d";
            // const apiKey = "Your api key" //
            const formdata = new FormData();

            formdata.append('key', apiKey);
            formdata.append('txt', tmpDream);
            formdata.append('lang', language);

            const requestOptions: RequestInit = {
                method: 'POST',
                body: formdata,
                redirect: 'follow',
            };

            const response = await fetch(apiUrl, requestOptions);
            const responseData: ApiResponse = await response.json();
            setApiResponse(responseData);
            console.log('Réponse de l\'API MeaningCloud :', responseData);
        } catch (error) {
            console.error('Erreur lors de la requête à l\'API MeaningCloud :', error);
        }
    };

    const renderTable = (): JSX.Element | null => {
        if (!apiResponse) {
            return null;
        }

        const conceptsList = apiResponse.concept_list;
        const entitiesList = apiResponse.entity_list;
        const entryList = [...conceptsList, ...entitiesList];

        return (
            <View>
                <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Tableau des données :</Text>
                <View style={{ flexDirection: 'row', marginBottom: 5 }}>
                    <Text style={styles.tableHeader}>Type d'Entrée</Text>
                    <Text style={styles.tableHeader}>Pertinence</Text>
                    <Text style={styles.tableHeader}>Terme</Text>
                    <Text style={styles.tableHeader}>Type Sémantique</Text>
                </View>
                {conceptsList.map((entry, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={styles.tableCell}>Concept</Text>
                        <Text style={styles.tableCell}>{entry.relevance}</Text>
                        <Text style={styles.tableCell}>{entry.form}</Text>
                        <Text style={styles.tableCell}>{entry.sementity.type}</Text>
                    </View>
                ))}
                {entitiesList.map((entry, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={styles.tableCell}>Entity</Text>
                        <Text style={styles.tableCell}>{entry.relevance}</Text>
                        <Text style={styles.tableCell}>{entry.form}</Text>
                        <Text style={styles.tableCell}>{entry.sementity.type}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            <SelectList
                boxStyles={styles.selectList}
                placeholder='Choisissez un rêve'
                data={data}
                setSelected={(val: React.SetStateAction<string>) => setSelected(val)}
            />
            <Button title="Lancer l'analyse de Rêve" onPress={() => handleApiRequest(selected)} />
            {apiResponse && (
                <View>
                    <Text>Réponse de l'API :</Text>
                    {renderTable()}
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '75%',
    },
    selectList: {
        marginBottom: 15,
    },
    tableHeader: {
        flex: 1,
        fontWeight: 'bold',
        marginRight: 5,
    },
    tableCell: {
        flex: 1,
        marginRight: 5,
    },
});
