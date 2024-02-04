import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
import Header from '../../../components/Header';
import {WebView} from 'react-native-webview';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import {t} from 'i18next';

export const DocumentsDetails = () => {
  const route = useRoute();
  const {title, data} = route.params as any;

  const ActivityIndicatorElement = () => {
    //making a view to show to while loading the webpage
    return (
      <ActivityIndicator
        color="black"
        size="large"
        style={styles.activityIndicatorStyle}
      />
    );
  };

  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          paddingHorizontal: normalize(18),
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
        <Header
          title={t(title)}
          hideOrders={true}
          onPress={() => {
            //
          }}
        />
        <WebView
          //Loading URL
          source={{
            uri: data.url,
          }}
          //Enable Javascript support
          javaScriptEnabled={true}
          //For the Cache
          domStorageEnabled={true}
          //View to show while loading the webpage
          renderLoading={ActivityIndicatorElement}
          //Want to show the view or not
          startInLoadingState={true}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
  activityIndicatorStyle: {
    height: '100%',
    justifyContent: 'center',
  },
});
