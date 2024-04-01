import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { DreamData } from "./Historic";

interface DisplayDreamProps {
    dream: DreamData;
}


const DisplayDream: React.FC<DisplayDreamProps> = ({ dream }) => {

    return (
        <View style={styles.modalView}>
            <Text style={styles.modalText}>{dream.dreamText ? dream.dreamText : "Pas de description ajoutée"} : {dream.isLucidDream ? 'Lucide' : 'Non Lucide'}</Text>
        </View>
    );
};

export default DisplayDream;

const styles = StyleSheet.create({
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});

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