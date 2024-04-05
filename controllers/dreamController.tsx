import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';

export interface DreamData {
    dreamTitle: string;
    dreamText: string;
    isLucidDream: boolean;
    isNightmare: boolean;
    inputDate: any;
}

export interface ApiResponse {
    concept_list: ApiEntry[];
    entity_list: ApiEntry[];
}

export interface ApiEntry {
    relevance: number;
    form: string;
    sementity: {
        type: string;
    };
}

export interface DisplayDreamProps {
    dream: DreamData;
}

export async function deleteDream(index: number): Promise<void> {
    try {
        const data = await AsyncStorage.getItem('dreamFormDataArray');
        const dreamFormDataArray: DreamData[] = data ? JSON.parse(data) : [];
        dreamFormDataArray.splice(index, 1);

        await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(dreamFormDataArray));
    } catch (error) {
        console.error("Error deleting dream" + error);
    }
}
