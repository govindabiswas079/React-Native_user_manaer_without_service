import React, { useState, Fragment } from 'react'
import { View, Text, TextInput, ScrollView, Pressable, ToastAndroid, TouchableOpacity, Modal, ActivityIndicator } from 'react-native'
import { FocusAwareStatusBar } from '../useFocusedStatusBar/FocusAwareStatusBar'
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthLoader } from '../store/reducerSlicer'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogInScreen = () => {
  const dispatch = useDispatch();
  const Navigate = useNavigation();
  const [value, setValue] = useState({ email: '', password: '' });
  const [loader, setLoader] = useState(false)


  const onSubmit = async () => {
    const data = await AsyncStorage.getItem('AppUser')
    const ParseData = JSON.parse(data)

    if (!ParseData?.find((item) => item?.email == value?.email)) {
      ToastAndroid.showWithGravity(
        'User not exit',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    if ((ParseData?.find((item) => item?.password == value?.password))) {
      setLoader(true)
      await AsyncStorage.setItem('isAuth', JSON.stringify({ isAuth: true, UserId: ParseData?.find((item) => item?.email == value?.email)?.id }))
        .then(() => {
          dispatch(setAuthLoader(true))
        })
        .catch(() => {

        })
    } else {
      ToastAndroid.showWithGravity(
        'Password missmatch',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }
  }



  return (
    <Fragment>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 15, paddingTop: 20, paddingBottom: 20 }}>
          <View>
            <Text style={{ color: '#000000', fontSize: 30, fontFamily: 'OpenSans-Bold' }}>Log In</Text>
            <View style={{ marginTop: 10 }}>
              <Text style={{ color: 'gray', fontSize: 16, fontFamily: 'OpenSans-SemiBold' }}>Enter your credentials to continue</Text>
            </View>
          </View>
          <LoginInput
            value={value} setValue={setValue}
          />

          <Button
            onPress={() => { onSubmit() }}
            disabled={!value?.email || !value?.password}
            mode={'contained'}
            buttonColor={'#8ab4f8'}
            textColor={'#FFFFFF'}
            uppercase={true}
            style={{ borderRadius: 8, height: 40, marginTop: 15, }}
            contentStyle={{}}
            labelStyle={{ fontFamily: 'OpenSans-Bold', fontSize: 14 }}
          >
            LogIn
          </Button>

        </ScrollView>
        <View style={{ height: 40, width: '100%', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, flexDirection: 'row' }}>
          <Text style={{ color: '#000000', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Not Register Yet? </Text>
          <TouchableOpacity onPress={() => { Navigate.navigate('RegisterScreen') }} style={{}}>
            <Text style={{ color: 'blue', fontFamily: 'OpenSans-Bold', fontSize: 14 }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>


      <Modal visible={loader} transparent>
        <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#00000075'} />
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#00000075' }}>
          <ActivityIndicator size={'large'} color={'#8ab4f8'} />
        </View>
      </Modal>
    </Fragment>
  )
}

export default LogInScreen

const LoginInput = ({ value, setValue }) => {
  const [show, setShow] = useState(false);

  return (
    <Fragment>
      <View style={{ marginTop: 15, width: '100%', height: 40, borderWidth: 1, borderColor: '#7474F5', borderRadius: 8, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <FontAwesome name='user' color={'#252F40'} size={22} />
        <TextInput value={value?.email} autoCorrect={false} autoCapitalize={'none'} textContentType={'username'} onChangeText={(Text) => setValue({ ...value, email: Text })} placeholderTextColor={'gray'} placeholder={'Username'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
      </View>
      <View style={{ marginTop: 15, width: '100%', height: 40, borderWidth: 1, borderColor: '#7474F5', borderRadius: 8, paddingHorizontal: 10, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name='lock-closed' color={'#252F40'} size={22} />
        <TextInput secureTextEntry={!show} autoCorrect={false} autoCapitalize={'none'} textContentType={'password'} value={value?.password} onChangeText={(Text) => setValue({ ...value, password: Text })} placeholderTextColor={'gray'} placeholder={'Password'} style={{ flex: 1, paddingHorizontal: 12, fontSize: 14, fontFamily: 'OpenSans-Regular', color: '#252F40' }} />
        <Pressable onPress={() => setShow(state => !state)}>
          <Ionicons name={show ? 'eye-off' : 'eye'} color={'#252F40'} size={22} />
        </Pressable>
      </View>
    </Fragment>
  )
}