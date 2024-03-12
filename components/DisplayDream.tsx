import React from "react";
import { Text, View } from "react-native";
import { DreamData } from "./Historic";

interface DisplayDreamProps {
    dream: DreamData;
}


const DisplayDream: React.FC<DisplayDreamProps> = ({ dream }) => {

    return (
        <View style={{ backgroundColor: 'white', padding: 20 }}>
            <Text>{dream.dreamText ? dream.dreamText : "Pas de description ajoutée"} : {dream.isLucidDream ? 'Lucide' : 'Non Lucide'}</Text>
        </View>
    );
};

export default DisplayDream;

// useEffect(() => {
//     const updateComponent = async () => {
//         try {
//             const data = await AsyncStorage.getItem('dreamFormDataArray');
//             const dreamFormDataArray: DreamData[] = data ? JSON.parse(data) : [];
//             setdataArray(dreamFormDataArray);

//         } catch (error) {
//             console.error('Erreur lors de la mise à jour des données:', error);
//         }
//     };
//     updateComponent();
// }, [dataArray]);

// const deleteDream = async (index: number) => {
//     try {
//         const data = await AsyncStorage.getItem('dreamFormDataArray');
//         const dreamFormDataArray: DreamData[] = data ? JSON.parse(data) : [];
//         dreamFormDataArray.splice(index, 1);

//         await AsyncStorage.setItem('dreamFormDataArray', JSON.stringify(dreamFormDataArray));


//     }
//     catch (error) {
//         console.log("Error deleting dream" + error);

//     }
// }