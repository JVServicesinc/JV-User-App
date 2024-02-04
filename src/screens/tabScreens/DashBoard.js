import {
  Dimensions,
  FlatList,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Colors} from '../../themes/Colors';
import {Images} from '../../themes/Images';
import normalize from '../../utils/helpers/normalize';
import {Icons} from '../../themes/Icons';
import {StatusBar} from 'react-native';
import {useState} from 'react';
import {Fonts} from '../../themes/Fonts';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import FlatListSlider from '../../components/slider/FlatListSlider';
import Preview from '../../components/slider/Preview';
import Picker from '../../components/Picker';
import SelectALocation from '../all/SelectALocation';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {getAllServiceCateRequest} from '../../redux/reducer/ServiceReducer';
import showErrorAlert from '../../utils/helpers/Toast';
import isInternetConnected from '../../utils/helpers/NetInfo';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';

const DashBoard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const ServiceReducer = useSelector(state => state.ServiceReducer);
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(true);

  const Categories = [
    {icon: Icons.carpenters, title: 'Carpenters'},
    {icon: Icons.pestControl, title: `Pest Control`},
    {icon: Icons.ACService, title: 'AC Service'},
    {icon: Icons.Cleaning, title: 'Cleaning'},
    {icon: Icons.Electrician, title: `Electrician`},
    {icon: Icons.homePainting, title: 'Home painting'},
  ];

  const QuickHome = [
    {icon: Images.water_purifire_service, title: `water Purifier Service`},
    {icon: Images.washing_machine, title: 'Washing Machine'},
    {icon: Images.washing_machine, title: 'Washing Machine'},
  ];

  const MostBookedServices = [
    {
      icon: Images.img3,
      title: 'Drill & hang (wall decor)',
      rate: 4.73,
      total_rate: '427.9k',
      price: '58.00',
    },
    {
      icon: Images.img4,
      title: 'Tap repair \n',
      rate: 4.73,
      total_rate: '427.9k',
      price: '58.00',
    },
    {
      icon: Images.img4,
      title: 'Tap repair \n',
      rate: 4.73,
      total_rate: '427.9k',
      price: '58.00',
    },
  ];

  const Continuebrowsing = [
    {
      icon: Images.img1,
      title: 'Anti-rust deep clean AC service',
      rate: 4.73,
      total_rate: '427.9k',
      price: '58.00',
    },
    {
      icon: Images.img2,
      title: 'Deep clean AC service (split)',
      rate: 4.73,
      total_rate: '427.9k',
      price: '58.00',
    },
    {
      icon: Images.img2,
      title: 'Deep clean AC service (split)',
      rate: 4.73,
      total_rate: '427.9k',
      price: '58.00',
    },
  ];

  const CardItem = useCallback(({item, index, containerStyle}) => {
    return (
      <Animatable.View
        animation={'fadeInRight'}
        duration={800}
        delay={index * 300}
        style={containerStyle}>
        <TouchableOpacity style={styles.card}>
          <Image source={item?.icon} style={styles.card_icon} />
          <Text style={styles.card_text}>{item?.title}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, []);

  function CategoryList({title, data, style}) {
    return (
      <>
        <View
          style={[
            styles.titlecon,
            {marginTop: 0, paddingHorizontal: normalize(18)},
            style,
          ]}>
          <Text style={styles.roboto17}>{title}</Text>
          <TouchableOpacity>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: normalize(12),
            paddingHorizontal: normalize(18),
          }}
          numColumns={3}
          renderItem={({item, index}) => {
            return <CardItem item={item} index={index} />;
          }}
        />
      </>
    );
  }

  function SingleHRList({
    onPress,
    title,
    data,
    subtitle,
    style,
    titleBottom = false,
  }) {
    return (
      <>
        <View style={[styles.titlecon, style]}>
          <View>
            <Text style={styles.roboto17}>{title}</Text>
            {subtitle && <Text style={styles.roboto18}>{subtitle}</Text>}
          </View>
          <TouchableOpacity onPress={onPress}>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingStart: normalize(18)}}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                animation={'fadeInRight'}
                duration={800}
                delay={index * 300}>
                <TouchableOpacity style={styles.card1}>
                  {!titleBottom && (
                    <Text style={styles.card_text1}>{item.title}</Text>
                  )}
                  <Image
                    source={item?.icon}
                    style={{
                      height: normalize(80),
                      width: '100%',
                      marginTop: normalize(5),
                      borderRadius: normalize(6),
                      resizeMode: 'contain',
                    }}
                  />
                  {titleBottom && (
                    <Text
                      style={[
                        styles.card_text1,
                        {
                          textAlign: 'center',
                          marginTop: normalize(5),
                        },
                      ]}>
                      {item.title}
                    </Text>
                  )}
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
      </>
    );
  }

  function SingleHMList({title, subtitle, data, style}) {
    return (
      <>
        <View style={[styles.titlecon, style]}>
          <View>
            <Text style={styles.roboto17}>{title}</Text>
            {subtitle && <Text style={styles.roboto18}>{subtitle}</Text>}
          </View>
          <TouchableOpacity>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{paddingStart: normalize(18)}}
          renderItem={({item, index}) => {
            return (
              <Animatable.View
                animation={'fadeInRight'}
                duration={800}
                delay={index * 300}>
                <TouchableOpacity
                  style={[
                    styles.card1,
                    {
                      height: normalize(185),
                    },
                  ]}>
                  <Image
                    source={item?.icon}
                    style={{
                      height: normalize(80),
                      width: '100%',
                      marginTop: normalize(5),
                      borderRadius: normalize(6),
                      resizeMode: 'contain',
                    }}
                  />
                  <Text
                    style={[
                      styles.card_text1,
                      {
                        textAlign: 'center',
                        marginTop: normalize(5),
                      },
                    ]}>
                    {item.title}
                  </Text>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignSelf: 'center',
                      marginTop: normalize(3),
                    }}>
                    <Image
                      source={Icons.rate_star}
                      style={{
                        resizeMode: 'contain',
                        height: normalize(16),
                        width: normalize(16),
                      }}
                    />
                    <Text style={styles.card_text1}>
                      {' ' + item.rate + ' '}
                    </Text>
                    <Text
                      style={styles.card_text1}>{`(${item.total_rate})`}</Text>
                  </View>

                  <TouchableOpacity
                    style={{
                      backgroundColor: 'white',
                      height: normalize(26),
                      justifyContent: 'center',
                      borderRadius: normalize(10),
                      marginTop: normalize(5),
                    }}>
                    <Text
                      style={[
                        styles.card_text1,
                        {
                          textAlign: 'center',
                        },
                      ]}>
                      ${item.price}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              </Animatable.View>
            );
          }}
        />
      </>
    );
  }

  function LoadingSkeleton({num}) {
    return (
      <>
        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            alignSelf="center"
            flexDirection="row"
            alignItems="center"
            marginTop={normalize(8)}
            justifyContent="space-between">
            <SkeletonPlaceholder.Item width={200} height={20} />
            <SkeletonPlaceholder.Item width={30} height={20} />
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>

        <SkeletonPlaceholder.Item width={5} height={5} />

        <SkeletonPlaceholder borderRadius={4}>
          <SkeletonPlaceholder.Item
            width={'90%'}
            alignSelf="center"
            flexDirection="row"
            alignItems="center"
            marginTop={normalize(8)}
            justifyContent="space-between">
            <SkeletonPlaceholder.Item
              width={!num ? 105 : 170}
              height={!num ? 105 : 170}
              borderRadius={8}
            />
            <SkeletonPlaceholder.Item
              width={!num ? 105 : 170}
              height={!num ? 105 : 170}
              borderRadius={8}
            />
            {!num ? (
              <SkeletonPlaceholder.Item
                width={105}
                height={105}
                borderRadius={8}
              />
            ) : null}
          </SkeletonPlaceholder.Item>
        </SkeletonPlaceholder>
      </>
    );
  }

  // useEffect(() => {
  //   if (isFocused) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 2000);
  //   }
  // }, [isFocused]);

  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getAllServiceCateRequest());
      })
      .catch(err => {
        showErrorAlert('Please Connect To Internet');
      });
  }, []);

  // --------------------------------------------------------------------------------
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  function SHList({title, data, item, style}) {
    let serviceId = item?.id;

    return (
      <>
        <View style={[styles.titlecon, style]}>
          <Text style={styles.roboto17}>{title}</Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ViewAllServices', {
                title: title,
                item: item,
              })
            }>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={keyExtractor}
          contentContainerStyle={{
            paddingStart: normalize(18),
          }}
          renderItem={({item, index}) => {
            return (
              <CItem
                id={serviceId}
                item={item}
                index={index}
                containerStyle={{marginRight: normalize(14)}}
              />
            );
          }}
        />
      </>
    );
  }

  const CItem = useCallback(({id, item, index, containerStyle}) => {
    return (
      <Animatable.View
        animation={'fadeInRight'}
        duration={800}
        delay={index * 300}
        style={[containerStyle]}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => {
            global.selectedServiceCategory = item;
            navigation.navigate('ViewServiceCategory', {
              cateId: id,
              id: item?.id,
              title: item?.name,
            });
          }}>
          <Image source={{uri: item?.image_url}} style={styles.card_icon} />
          <Text style={styles.card_text}>{item?.name}</Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, []);

  // --------------------------------------------------------------------------------
  const renderItem = useCallback(({item, index}) => {
    return (
      <SHList
        title={`${item?.name} services`}
        data={item?.jv_service_categories}
        item={item}
        style={{
          paddingHorizontal: normalize(18),
        }}
      />
    );
  }, []);

  return (
    <SafeAreaView style={styles.primary}>
      <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />
      <FlatList
        contentContainerStyle={{
          paddingBottom: normalize(60),
        }}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
        ListHeaderComponent={
          <View
            style={{
              backgroundColor: 'white',
              paddingBottom: normalize(5),
              paddingHorizontal: normalize(18),
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: Platform.OS == 'android' ? normalize(12) : 0,
              }}>
              <Image
                source={Icons.home_store}
                style={{
                  resizeMode: 'contain',
                  height: normalize(20),
                  width: normalize(20),
                  marginRight: normalize(10),
                }}
              />

              <Text
                style={{
                  fontSize: normalize(14),
                  fontFamily: Fonts.Roboto_Medium,
                  color: '#202020',
                }}>
                Home{' '}
                {
                  <Text
                    style={{
                      color: '#BDBDBD',
                    }}>
                    Services
                  </Text>
                }
              </Text>
            </View>
            <View style={styles.scontainer}>
              <Image source={Icons.Search} style={styles.searchicon} />
              <TextInput
                style={styles.input}
                placeholder="Search for services"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            {ServiceReducer.status == 'Service/getAllServiceCateRequest' ? (
              <LoadingSkeleton />
            ) : (
              <>
                {!_.isEmpty(ServiceReducer?.getAllServiceCateRes) ? (
                  <FlatList
                    data={ServiceReducer?.getAllServiceCateRes?.filter(
                      item => item?.slug == 'home-care',
                    )}
                    keyExtractor={keyExtractor}
                    showsVerticalScrollIndicator={false}
                    renderItem={renderItem}
                  />
                ) : null}
              </>
            )}

            {/* {!isLoading ? (
              <LoadingSkeleton num={2} />
            ) : (
              <SingleHMList
                title={'Continue browsing for'}
                data={Continuebrowsing}
                style={{
                  marginTop: normalize(15),
                  paddingHorizontal: normalize(18),
                }}
              />
            )} */}

            {/* {!isLoading ? (
              <LoadingSkeleton num={2} />
            ) : (
              <SingleHRList
                title={'Appliance Repair & Service'}
                data={QuickHome}
                style={{paddingHorizontal: normalize(18)}}
                titleBottom={true}
              />
            )} */}

            {/* {!isLoading ? (
              <LoadingSkeleton num={2} />
            ) : (
              <SingleHMList
                title={'Quick home repairs'}
                data={MostBookedServices}
                style={{
                  marginTop: normalize(15),
                  paddingHorizontal: normalize(18),
                }}
              />
            )} */}
          </>
        }
      />
      <Picker
        children={
          <SelectALocation
            onPress={() => {
              setIsVisible(false);
              setTimeout(() => {
                navigation.navigate('Location');
              }, 600);
            }}
          />
        }
        isTabLine={true}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
        height="86%"
      />
    </SafeAreaView>
  );
};

export default DashBoard;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imgback: {
    backgroundColor: Colors.yellow,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(12),
  },
  img: {
    height: normalize(32),
    width: normalize(32),
    resizeMode: 'contain',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text14: {
    fontSize: normalize(14),
    fontFamily: Fonts.Poppins_Medium,
    color: Colors.black,
  },
  text11: {
    fontSize: normalize(11),
    fontFamily: Fonts.Poppins_Regular,
    color: Colors.black,
  },
  editback: {
    backgroundColor: Colors.gray,
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(14),
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
  },
  location: {
    height: normalize(14),
    width: normalize(14),
    resizeMode: 'contain',
    right: normalize(2),
  },
  input: {
    color: Colors.black,
    flex: 1,
  },
  searchicon: {
    height: normalize(20),
    width: normalize(20),
    resizeMode: 'contain',
    marginLeft: normalize(10),
  },
  scontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: normalize(12),
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: normalize(18),
    height: normalize(40),
  },
  roboto17: {
    fontSize: normalize(17),
    color: Colors.black,
    fontFamily: Fonts.Roboto_Medium,
  },
  roboto18: {
    fontSize: normalize(14),
    color: Colors.grey_cloud,
    fontFamily: Fonts.Roboto_Regular,
  },
  titlecon: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: normalize(16),
    marginBottom: normalize(12),
  },
  allicon: {
    height: normalize(9),
    width: normalize(20),
    resizeMode: 'contain',
  },
  card_icon: {
    height: normalize(40),
    width: normalize(40),
    resizeMode: 'contain',
  },
  card_text: {
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(8),
    color: Colors.card_text,
    marginTop: normalize(4),
  },
  card_text1: {
    fontFamily: Fonts.Roboto_Regular,
    fontSize: normalize(12),
    color: Colors.davy_grey,
  },
  card: {
    height: normalize(80),
    width: normalize(85),
    borderRadius: normalize(15),
    backgroundColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card1: {
    height: normalize(120),
    width: normalize(150),
    borderRadius: normalize(15),
    backgroundColor: Colors.gray,
    marginRight: normalize(12),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(6),
  },
  containerauto: {
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: normalize(20),
    marginHorizontal: normalize(18),
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'gray',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#161616',
    width: normalize(25),
  },
});
