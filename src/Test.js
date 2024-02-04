import { View, Text } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import normalize from './utils/helpers/normalize';

const Test = () => {
  return (
    <View style={{
      flex: 1,
      backgroundColor: 'red'
    }}>
       <LottieView
          source={require('./assets/json/animation_ln2oyitm.json')}
          autoPlay
          loop
          style={{
            height: normalize(200),
            width: normalize(200),
            alignSelf: 'center',
          }}
        />
    </View>
  )
}

export default Test