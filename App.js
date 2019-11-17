/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';

import {Header} from 'react-native-elements';
import MainSection from './components/MainSection/MainSection';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.MainViewContainer}>
        <Header
          centerComponent={{text: 'PDF VIEWER', style: {color: '#fff'}}}
        />
        <MainSection />
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  MainViewContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
});

export default App;
