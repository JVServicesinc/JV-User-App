import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
const {width, height} = Dimensions.get('window');
import RenderHtml from 'react-native-render-html';

const AboutJeveux = () => {
  const source = {
    html: `
    <html>
    <body>
    
    <p><b>Lorem Ipsum is simply dummy text of the </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. Lorem Ipsum has been the 
    industry's standard dummy text ever since the 1500s,</p>

    <p><b>JEveux Lorem Ipsum is simply dummy text of 
    the Lorem Ipsum is simply </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. <b>Lorem Ipsum has been the</b> 
    industry's standard dummy text ever since the 1500s,</p>

    <p><b>Lorem Ipsum is simply dummy text of the  </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. Lorem Ipsum has been the 
    industry's standard dummy text ever since the 1500s,</p>

    <p><b>JEveux Lorem Ipsum is simply dummy text of 
    the Lorem Ipsum is simply </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. <b>Lorem Ipsum has been the</b> 
    industry's standard dummy text ever since the 1500s,</p>

    <p>&#x2022; Lorem Ipsum is simply dummy text of the </p>
    <p>&#x2022; Lorem Ipsum is simply dummy text of the printing 
    and typesetting industry. </p>
    <p>&#x2022; Lorem Ipsum is simply dummy text of the </p>
    <p>&#x2022; Lorem Ipsum is simply dummy text of the printing 
    and typesetting industry. </p>
    
    </body>
    </html>`,
  };

  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <Header title={'About JEveux'} />

        <ScrollView showsVerticalScrollIndicator={false}>
          <RenderHtml
            contentWidth={width}
            source={source}
            tagsStyles={{p: {color: 'black'}}}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AboutJeveux;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
});
