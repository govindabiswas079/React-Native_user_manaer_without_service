import React from 'react'
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider, } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { store } from './store'
import CombineRoute from './CombineRoute'
import deepLinking from './deepLinking'

const App = () => {

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer onReady={() => { SplashScreen.hide() }} linking={deepLinking} fallback={
          <View style={{ flex: 1, backgroundColor: '#FFFFFF', justifyContent: 'center', alignItems: 'center' }}>
            <StatusBar barStyle='dark-content' backgroundColor={'#FFFFFF'} />
            <ActivityIndicator size={'large'} color={'#F25555'} />
          </View>
        }>
          <CombineRoute />
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  )
}

export default App