import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Text, View } from '@/components/Themed';
import Historic from '@/components/Historic';

export default function TabTwoScreen() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Historique des rêves</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <View style={styles.content}>
        <Historic />
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  content: {
    width: windowWidth,
    height: windowHeight,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
