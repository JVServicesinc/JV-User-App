import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../components/Header';
import {Colors} from '../../themes/Colors';
import normalize from '../../utils/helpers/normalize';
import {Icons} from '../../themes/Icons';
import {Fonts} from '../../themes/Fonts';
import GoogleAutoCompleteAddress from '../../components/GoogleAutoCompleteAddress';

const Location = () => {
  const [search, setSearch] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Header title={'Location'} />
      </View>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.main}>
          <Image source={Icons.carbon_location} style={styles.locationImg} />
          <Text style={styles.title}>Hello, nice to meet you!</Text>
          <Text style={styles.title2}>See services around</Text>

          <GoogleAutoCompleteAddress
            value={search}
            onChangeText={txt => {
              setSearch(txt);
            }}
            placeholder={'Other location search'}
            placeholderTextColor={Colors.grey_cloud}
            onSubmit={adr => {
              console.log('---->>> ', adr);
            }}
            style={{
              width: '90%',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default Location;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerContainer: {
    paddingHorizontal: normalize(15),
  },
  main: {
    flex: 1,
    alignItems: 'center',
    // paddingTop: Platform.OS == 'ios' ? normalize(120) : normalize(125),
  },
  locationImg: {
    resizeMode: 'contain',
    height: normalize(65),
    width: normalize(65),
  },
  title: {
    fontFamily: Fonts.Roboto_Regular,
    color: Colors.grey_cloud,
    fontSize: normalize(14),
    marginTop: normalize(20),
  },
  title2: {
    fontFamily: Fonts.Roboto_Medium,
    color: Colors.zeus,
    fontSize: normalize(20),
    marginTop: normalize(5),
  },
});
