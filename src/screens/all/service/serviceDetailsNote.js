import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    StatusBar,
    ImageBackground,
    ScrollView,
    SafeAreaView,
    Platform,
  } from 'react-native';
  import React, {useEffect, useState} from 'react';
  import {Colors} from '../../../themes/Colors';
  import {Images} from '../../../themes/Images';
  import {Icons} from '../../../themes/Icons';
  import normalize from '../../../utils/helpers/normalize';
  import {Fonts} from '../../../themes/Fonts';
  import {useIsFocused} from '@react-navigation/native';
  import {useDispatch, useSelector} from 'react-redux';
  import _ from 'lodash';
  import isInternetConnected from '../../../utils/helpers/NetInfo';
  import showErrorAlert from '../../../utils/helpers/Toast';
  import {getServiceDetailsRequest} from '../../../redux/reducer/ServiceReducer';
  import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
  
  const ServiceDetails = ({navigation, route}) => {
    const {itemDetails} = route?.params;
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const ServiceReducer = useSelector(state => state.ServiceReducer);
    const [productDetails, setProductDetails] = useState([]);
    let category = global.selectedServiceCategory;
    const [selecedService, setSelectedService] = useState({});
  
    useEffect(() => {
      if (isFocused && !_.isEmpty(itemDetails)) {
        isInternetConnected()
          .then(() => {
            dispatch(getServiceDetailsRequest(itemDetails?.id));
          })
          .catch(err => {
            showErrorAlert('Please Connect To Internet');
          });
      }
    }, [isFocused, itemDetails]);
  
    useEffect(() => {
      if (
        isFocused &&
        ServiceReducer.status == 'Service/getServiceDetailsSuccess'
      ) {
        setProductDetails(ServiceReducer?.getServiceDetails);
      }
    }, [isFocused, ServiceReducer]);
  
    const RelatedData = [
      {
        image: Images.image23,
        name: 'Facial Name 2',
        rate: '4.8 (23k)',
        price: '$499',
        mrp: '$599',
        time: '45 mins',
        details: 'For all skin types. Pinacolada mask.',
        process: '6-step process. Includes 10-min massage',
      },
      {
        image: Icons.w7,
        name: 'Facial Name 3',
        rate: '4.8 (23k)',
        price: '$499',
        mrp: '$599',
        time: '45 mins',
        details: 'For all skin types. Pinacolada mask.',
        process: '6-step process. Includes 10-min massage',
      },
    ];
  
    function LoadingSkeleton() {
      return (
        <SkeletonPlaceholder borderRadius={4}>
          {[1, 2, 3].map((item, index) => {
            return (
              <SkeletonPlaceholder.Item
                key={index}
                width={'90%'}
                alignSelf="center"
                marginTop={normalize(8)}
                justifyContent="space-between">
                <SkeletonPlaceholder.Item
                  width={350}
                  height={170}
                  borderRadius={8}
                  alignSelf="center"
                />
                <SkeletonPlaceholder.Item
                  width={350}
                  height={30}
                  borderRadius={8}
                  alignSelf="center"
                  marginVertical={10}
                />
              </SkeletonPlaceholder.Item>
            );
          })}
        </SkeletonPlaceholder>
      );
    }
  
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.white,
        }}>
        <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
  
        <View
          style={{
            flex: 1,
          }}>
          {!_.isEmpty(productDetails) ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                paddingBottom: normalize(30),
              }}
              style={{
                flex: 1,
              }}>
              <Image
                source={{uri: category?.image_url}}
                style={{
                  width: '100%',
                  height: normalize(200),
                }}
              />
  
              <View
                style={{
                  width: '100%',
                  paddingHorizontal: normalize(15),
                }}>
                <Text style={styles.name}>{category?.name}</Text>
                {/* <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Icons.star}
                  style={{
                    height: normalize(10),
                    width: normalize(10),
                    resizeMode: 'contain',
                    marginRight: normalize(5),
                  }}
                />
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#757575',
                    fontFamily: Fonts.Poppins_Regular,
                    bottom: -2,
                  }}>
                  4.8 (23k)
                </Text>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View
                  style={{
                    backgroundColor: '#757575',
                    height: normalize(10),
                    width: normalize(10),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: normalize(5),
                  }}>
                  <Image
                    source={Icons.tick}
                    style={{
                      height: normalize(7),
                      width: normalize(7),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
  
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#757575',
                    fontFamily: Fonts.Poppins_Regular,
                    bottom: -2,
                  }}>
                  354 jobs completed
                </Text>
              </View> */}
  
                {_.isEmpty(selecedService) ? (
                  <View style={styles.viewMain}>
                    <Image
                      source={{uri: productDetails?.image_urls[0]}}
                      style={styles.img1}
                    />
                    <View
                      style={{
                        width: '52%',
                        paddingLeft: normalize(10),
                        borderLeftColor: 'rgba(0,0,0,0.2)',
                        borderLeftWidth: normalize(1),
                      }}>
                      <Text style={styles.name1}>{productDetails?.name}</Text>
                      <Text style={styles.price}>${productDetails?.price}</Text>
  
                      <Text style={styles.des1}>• 45 mins</Text>
                      <Text style={styles.des1}>
                        • For all skin types. Pinacolada mask.
                      </Text>
                      <Text style={styles.des1}>
                        • 6-step process. Includes 10-min massage
                      </Text>
                      <TouchableOpacity
                        onPress={() => setSelectedService(productDetails)}
                        style={styles.touch}>
                        <Image style={styles.addImg} source={Icons.add} />
                        <Text style={styles.addTitle}>{'Add To Cart'}</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                ) : (
                  <View style={styles.v}>
                    <Text style={styles.title}>Selected Services</Text>
  
                    <View style={styles.v2}>
                      <Image
                        source={{uri: productDetails?.image_urls[0]}}
                        style={styles.img2}
                      />
                      <View>
                        <Text style={styles.name1}>{productDetails?.name}</Text>
                        <Text style={styles.price}>${productDetails?.price}</Text>
                      </View>
                    </View>
  
                    <Text style={styles.des}>• 45 mins</Text>
                    <Text style={styles.des}>
                      • For all skin types. Pinacolada mask.
                    </Text>
                    <Text style={styles.des}>
                      • 6-step process. Includes 10-min massage
                    </Text>
                  </View>
                )}
  
                {/* <Text
                style={{
                  color: '#161616',
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(20),
                  marginTop: normalize(15),
                }}>
                Related Services
              </Text> */}
              </View>
  
              {/* {RelatedData.map((item, index) => {
              console.log('item -- ', item);
              return (
                <View
                  style={{
                    marginVertical: normalize(15),
                    marginHorizontal: normalize(15),
                  }}>
                  <Image
                    style={{
                      height: normalize(145),
                      width: '100%',
                      borderRadius: normalize(15),
                    }}
                    source={item.image}
                  />
  
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: normalize(12),
                    }}>
                    <Text
                      style={{
                        color: '#161616',
                        fontFamily: Fonts.Poppins_Medium,
                        fontSize: normalize(16),
                      }}>
                      {item.name}
                    </Text>
  
                    <TouchableOpacity
                      style={{
                        width: normalize(65),
                        height: normalize(27),
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Colors.white,
                        shadowColor:
                          Platform.OS == 'android'
                            ? Colors.black
                            : 'rgba(0,0,0,0.3)',
                        shadowOffset: {
                          height: 0,
                          width: 4,
                        },
                        shadowOpacity: 1,
                        shadowRadius: 8,
                        elevation: 8,
                        borderRadius: normalize(4),
                        justifyContent: 'center',
                      }}>
                      <Image
                        style={{
                          height: normalize(10),
                          width: normalize(10),
                          marginRight: normalize(5),
                        }}
                        source={Icons.add}
                      />
                      <Text
                        style={{
                          color: '#5E17EB',
                          fontFamily: Fonts.Poppins_Medium,
                          fontSize: normalize(12),
                        }}>
                        {'Add'}
                      </Text>
                    </TouchableOpacity>
                  </View>
  
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                      source={Icons.star}
                      style={{
                        height: normalize(10),
                        width: normalize(10),
                        resizeMode: 'contain',
                        marginRight: normalize(5),
                        tintColor: '#F5C443',
                      }}
                    />
                    <Text
                      style={{
                        fontSize: normalize(10),
                        color: '#161616',
                        fontFamily: Fonts.Poppins_Medium,
                        bottom: -2,
                      }}>
                      4.8 (23k)
                    </Text>
                  </View>
                  <View
                    style={{flexDirection: 'row', marginBottom: normalize(5)}}>
                    <Text
                      style={{
                        color: '#5E17EB',
                        fontFamily: Fonts.Poppins_Medium,
                        fontSize: normalize(12),
                      }}>
                      {item.price}
                    </Text>
                    <Text
                      style={{
                        color: '#757575',
                        fontFamily: Fonts.Poppins_Medium,
                        fontSize: normalize(12),
                        marginLeft: normalize(10),
                        textDecorationLine: 'line-through',
                      }}>
                      {item.mrp}
                    </Text>
                  </View>
  
                  <Text
                    style={{
                      color: '#757575',
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(12),
                    }}>
                    • {item.time}.
                  </Text>
                  <Text
                    style={{
                      color: '#757575',
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(12),
                    }}>
                    • {item.details}
                  </Text>
                  <Text
                    style={{
                      color: '#757575',
                      fontFamily: Fonts.Poppins_Regular,
                      fontSize: normalize(12),
                    }}>
                    • {item.process}
                  </Text>
                </View>
              );
            })} */}
            </ScrollView>
          ) : (
            LoadingSkeleton()
          )}
  
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backContainer}>
            <Image source={Icons.BackArrow} style={styles.backImg} />
          </TouchableOpacity>
        </View>
        {!_.isEmpty(selecedService) ? (
          <View
            style={{
              paddingVertical: normalize(10),
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Summary')}
              style={styles.touch2}>
              <Text style={styles.title1}>View summary</Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  };
  
  export default ServiceDetails;
  
  const styles = StyleSheet.create({
    backContainer: {
      height: normalize(30),
      width: normalize(30),
      justifyContent: 'center',
      alignItems: 'center',
      margin: normalize(10),
      position: 'absolute',
    },
    backImg: {
      width: normalize(16),
      height: normalize(16),
      resizeMode: 'contain',
    },
    name: {
      color: '#161616',
      fontFamily: Fonts.Poppins_Medium,
      fontSize: normalize(20),
      marginTop: normalize(15),
    },
    viewMain: {
      borderTopColor: 'rgba(0,0,0,0.2)',
      borderTopWidth: normalize(1),
      flexDirection: 'row',
      paddingTop: normalize(8),
      marginTop: normalize(5),
    },
    img1: {
      height: normalize(130),
      width: normalize(130),
      borderRadius: normalize(6),
      marginRight: normalize(10),
      resizeMode: 'cover',
    },
    name1: {
      color: '#161616',
      fontFamily: Fonts.Poppins_Medium,
      fontSize: normalize(12),
    },
    price: {
      color: '#5E17EB',
      fontFamily: Fonts.Poppins_Medium,
      fontSize: normalize(12),
    },
    v: {
      backgroundColor: '#F2ECFD',
      width: '100%',
      borderRadius: normalize(16),
      padding: normalize(12),
      marginTop: normalize(10),
    },
    title: {
      color: '#161616',
      fontFamily: Fonts.Poppins_Medium,
      fontSize: normalize(14),
      textDecorationLine: 'underline',
      marginBottom: normalize(5),
    },
    v2: {
      flexDirection: 'row',
      marginBottom: normalize(10),
      alignItems: 'center',
    },
    img2: {
      height: normalize(50),
      width: normalize(50),
      borderRadius: normalize(6),
      marginRight: normalize(10),
    },
    des: {
      color: '#757575',
      fontFamily: Fonts.Poppins_Regular,
      fontSize: normalize(12),
    },
    touch: {
      width: normalize(100),
      height: normalize(27),
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: Colors.white,
      shadowColor: Platform.OS == 'android' ? Colors.black : 'rgba(0,0,0,0.3)',
      shadowOffset: {
        height: 0,
        width: 4,
      },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
      borderRadius: normalize(4),
      justifyContent: 'center',
      position: 'absolute',
      bottom: 0,
      left: normalize(10),
    },
    addImg: {
      height: normalize(10),
      width: normalize(10),
      marginRight: normalize(5),
    },
    addTitle: {
      color: '#5E17EB',
      fontFamily: Fonts.Poppins_Medium,
      fontSize: normalize(12),
    },
    touch2: {
      backgroundColor: Colors.black,
      height: normalize(42),
      justifyContent: 'center',
      marginHorizontal: normalize(15),
      alignItems: 'center',
      borderRadius: normalize(10),
    },
    title1: {
      color: Colors.white,
      fontSize: normalize(14),
      fontFamily: Fonts.Poppins_Medium,
    },
    des1: {
      color: '#757575',
      fontFamily: Fonts.Poppins_Regular,
      fontSize: normalize(9),
    },
  });
  