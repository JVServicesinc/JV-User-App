import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getData, storeData} from '../../../redux/LocalStore';
import constants from '../../../utils/helpers/constants';
import i18n from '../../../utils/helpers/i18n.config';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import {Item} from 'react-native-paper/lib/typescript/components/Drawer/Drawer';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Icons} from '../../../themes/Icons';

interface LanguageModel {
  id: string;
  title: string;
  code: string;
}

const LanguageInfo: LanguageModel[] = [
  {
    id: '1',
    title: 'English',
    code: 'enUS',
  },
  {
    id: '2',
    title: 'French',
    code: 'frCA',
  },
];

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  subContainer: {
    width: '90%',
    height: '100%',
  },
  renderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  renderSubContainer: {
    width: '100%',
    height: '85%',
    justifyContent: 'center',
    borderColor: Colors.grey_cloud,
    borderWidth: normalize(1),
    borderRadius: normalize(5),
    backgroundColor: '#fff',
    elevation: 5,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
  languageTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: '5%',
  },
  languageTitle: {
    color: '#161616',
    fontFamily: Fonts.Poppins_SemiBold,
    fontSize: normalize(13),
  },
});

export const ChooseLanguage = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');

  const changeLanguage = (language: string) => {
    storeData(constants.LANGUAGE, language, () => {
      i18n.changeLanguage(language);
      setSelectedLanguage(language);
    });
  };

  useEffect(() => {
    getData(constants.LANGUAGE, value => {
      setSelectedLanguage(value);
    });
  }, []);

  const renderItem: ListRenderItem<LanguageModel> = ({item, index}) => (
    <View key={index} style={styles.renderContainer}>
      <View style={styles.renderSubContainer}>
        <TouchableOpacity
          style={styles.languageTouchable}
          onPress={() => {
            changeLanguage(item.code);
          }}>
          <Text style={[styles.languageTitle, {fontSize: normalize(13)}]}>
            {item.title}
          </Text>
          {/* {item.code === selectedLanguage && ( */}
          <Image
            style={{
              height: normalize(20),
              width: normalize(20),
              resizeMode: 'contain',
            }}
            source={
              item.code === selectedLanguage ? Icons.heart_fill : Icons.heart
            }
          />
          {/* )} */}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      {selectedLanguage !== '' && (
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: Colors.white,
          }}>
          <View style={styles.container}>
            <View style={styles.subContainer}>
              <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
              <Header
                title={'Choose Language'}
                onPress={() => {
                  //
                }}
              />
              <FlatList
                data={LanguageInfo}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </>
  );
};
