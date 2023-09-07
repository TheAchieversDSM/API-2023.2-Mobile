import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function Home() {
    return (
        <SafeAreaView style={styles.container}>
            <Calendar />
        </SafeAreaView>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
  });