import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DreamData {
    dreamTitle: string;
    dreamText: string;
    isLucidDream: boolean;
    isNightmare: boolean;
    inputDate: any;
}

export async function getHistoric(): Promise<DreamData[]> {
    try {
        const tmp = await AsyncStorage.getItem('dreamFormDataArray');
        return tmp ? JSON.parse(tmp) : [];
    } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
        return [];
    }
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
