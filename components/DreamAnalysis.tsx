import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface ApiResponse {
    concept_list: ApiEntry[];
    entity_list: ApiEntry[];
}

interface ApiEntry {
    relevance: number;
    form: string;
    sementity: {
        type: string;
    };
}

export default function DreamAnalysis(): JSX.Element {

    const [apiResponse, setApiResponse] = useState<ApiResponse | null>(null);

    const handleApiRequest = async (): Promise<void> => {
        try {
            const apiUrl = 'https://api.meaningcloud.com/topics-2.0';
            const language = 'fr';
            const tmpDream = "Maitre yoda à manger de empanadas";
            const apiKey = "db4715c17b1e6fc19c1478bd8fde5c0d";
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
                {entryList.map((entry, index) => (
                    <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
                        <Text style={styles.tableCell}>{entryList.indexOf(entry) < conceptsList.length ? 'Concept' : 'Entity'}</Text>
                        <Text style={styles.tableCell}>{entry.relevance}</Text>
                        <Text style={styles.tableCell}>{entry.form}</Text>
                        <Text style={styles.tableCell}>{entry.sementity.type}</Text>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <View>
            <Button title="Effectuer la requête à MeaningCloud" onPress={handleApiRequest} />
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
