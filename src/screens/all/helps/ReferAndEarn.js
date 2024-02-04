import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ImageBackground,
} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import {Fonts} from '../../../themes/Fonts';
import normalize from '../../../utils/helpers/normalize';
import {Icons} from '../../../themes/Icons';
import {Images} from '../../../themes/Images';

const ReferAndEarn = () => {
  const DATA = [
    {
      icon: Icons.user16,
      title: 'User',
      subTitle: 'profile can explore & book\nservices in a min',
    },
    {
      icon: Icons.user16,
      title: 'Freelancer',
      subTitle: 'profile can explore & book\nservices in a min',
    },
    {
      icon: Icons.user16,
      title: 'Service Provider',
      subTitle: 'profile can explore & book\nservices in a min',
    },
    {
      icon: Icons.user16,
      title: 'Partner',
      subTitle: 'profile can explore & book\nservices in a min',
    },
  ];

  const DATA2 = [
    {
      icon: Icons.troffy,
      title:
        'Invite all friends even if they have tried us. You will get rewarded everytime!',
    },
    ,
    {
      icon: Icons.emailbox,
      title:
        'Upon inviting, we’ll give them rewards for the services they haven’t tried yet',
    },
    {
      icon: Icons.ruppy,
      title:
        'For every successful signup, you can win upto $500, and minimum $100',
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#F2EBFF',
      }}>
      <StatusBar backgroundColor={'#F2EBFF'} barStyle={'dark-content'} />
      <FlatList
        ListHeaderComponent={
          <View
            style={{
              width: '90%',
              alignSelf: 'center',
              backgroundColor: '#F2EBFF',
            }}>
            <Header title={'Refer & Earn'} />
          </View>
        }
        contentContainerStyle={{
          paddingBottom: normalize(30),
        }}
        stickyHeaderIndices={[0]}
        style={{
          flex: 1,
        }}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <View>
            <Image source={Images.gift} style={styles.gift} />
            <Text style={styles.des}>
              {
                'Invite your friends to Seek Me service. They get instant $100 off. You win upto $500 in rewards'
              }
            </Text>

            <ImageBackground
              source={Images.copy}
              resizeMode="contain"
              style={styles.refercode}>
              <View style={styles.inside}>
                <View style={styles.code}>
                  <Text style={styles.txt1}>Your referral code</Text>
                  <Text style={styles.txt2}>HSSMNW123</Text>
                </View>
                <TouchableOpacity>
                  <Text style={styles.txt3}>{'Copy\nCode'}</Text>
                </TouchableOpacity>
              </View>
            </ImageBackground>

            <ImageBackground
              source={Images.refer}
              resizeMode="contain"
              style={styles.refc}>
              <Text
                style={styles.reft}>
                Refer as
              </Text>
            </ImageBackground>

            {DATA.map((item, index) => {
              return (
                <TouchableOpacity style={styles.itc}>
                  <View style={styles.itpb}>
                    <Image source={item.icon} style={styles.itpi} />
                  </View>
                  <View>
                    <Text style={styles.itt}>{item.title}</Text>
                    <Text style={styles.itst}>{item.subTitle}</Text>
                  </View>
                  <Image source={Icons.arrowRight} style={styles.rightArrow} />
                </TouchableOpacity>
              );
            })}

            <View style={styles.v2}>
              {DATA2.map((item, index) => {
                return (
                  <TouchableOpacity disabled={true} style={styles.vcontainer}>
                    <View style={styles.circle}>
                      <Image source={item.icon} style={styles.vimg} />
                    </View>
                    <Text style={styles.vtitle}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default ReferAndEarn;

const styles = StyleSheet.create({
  gift: {
    height: normalize(130),
    width: normalize(130),
    resizeMode: 'contain',
    marginTop: normalize(5),
    alignSelf: 'center',
  },
  des: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#161616',
    fontSize: normalize(12),
    alignSelf: 'center',
    textAlign: 'center',
    width: '80%',
  },
  refercode: {
    height: normalize(60),
    width: normalize(180),
    alignSelf: 'center',
    marginTop: normalize(18),
  },
  inside: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    justifyContent: 'space-between',
  },
  code: {
    borderRightColor: '#F2EBFF',
    borderRightWidth: normalize(1),
    alignItems: 'center',
    width: normalize(110),
    marginRight: normalize(10),
  },
  txt1: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#F2EBFF',
    fontSize: normalize(10),
  },
  txt2: {
    fontFamily: Fonts.Poppins_Medium,
    color: '#FFF',
    fontSize: normalize(12),
    textAlign: 'center',
  },
  txt3: {
    fontFamily: Fonts.Poppins_Regular,
    color: '#F2EBFF',
    fontSize: normalize(10),
  },
  itc: {
    width: '90%',
    height: normalize(80),
    alignSelf: 'center',
    backgroundColor: 'white',
    marginBottom: normalize(10),
    borderRadius: normalize(8),
    flexDirection: 'row',
    padding: normalize(10),
    alignItems: 'center',
  },
  itpb: {
    backgroundColor: '#F5C443',
    width: normalize(70),
    height: '100%',
    borderRadius: normalize(6),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(10),
  },
  itpi: {
    resizeMode: 'contain',
    height: normalize(60),
    width: normalize(60),
  },
  itt: {
    fontFamily: Fonts.Poppins_SemiBold,
    color: '#161616',
    fontSize: normalize(14),
  },
  itst: {
    color: '#757575',
    fontFamily: Fonts.Poppins_Medium,
    fontSize: normalize(11),
  },
  rightArrow: {
    height: normalize(16),
    width: normalize(16),
    resizeMode: 'contain',
    position: 'absolute',
    right: normalize(15),
  },
  v2: {
    width: '100%',
    backgroundColor: 'white',
    paddingVertical: normalize(10),
  },
  vcontainer: {
    width: '90%',
    backgroundColor: 'white',
    height: normalize(65),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
  },
  circle: {
    borderColor: '#F3F3F3',
    borderWidth: normalize(5),
    height: normalize(55),
    width: normalize(55),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: normalize(60),
    marginRight: normalize(15),
  },
  vimg: {
    height: normalize(26),
    width: normalize(26),
    resizeMode: 'contain',
  },
  vtitle: {
    color: '#161616',
    fontFamily: Fonts.Poppins_Regular,
    fontSize: normalize(11),
    width: '75%',
  },
  refc: {
    height: normalize(40),
    width: '95%',
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: normalize(10)
  },
  reft: {
    backgroundColor: '#F2EBFF',
    fontFamily: Fonts.Poppins_Medium,
    color: '#161616',
    fontSize: normalize(11),
    width: '30%',
    textAlign: 'center',
    marginRight: normalize(15)
  }
});
