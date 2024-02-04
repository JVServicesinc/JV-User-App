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
  FlatList,
  Dimensions,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../../themes/Colors';
import {Images} from '../../../themes/Images';
import {Icons} from '../../../themes/Icons';
import normalize from '../../../utils/helpers/normalize';
import {Fonts} from '../../../themes/Fonts';
import Modal from 'react-native-modal';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {SliderBox} from 'react-native-image-slider-box';
import ImageView from 'react-native-image-viewing';
import _ from 'lodash';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import showErrorAlert from '../../../utils/helpers/Toast';
import {
  addCartService,
  addToCartServiceRequest,
  getServiceDetailsRequest,
  removeCartItemsRequest,
} from '../../../redux/reducer/ServiceReducer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {
  checkServiceExits,
  getCurrentLocation,
  removeObjectWithId,
} from '../../../utils/helpers/halper';
import Loader from '../../../utils/helpers/Loader';
import {
  createCart,
  getCartData,
  removeCartItem,
  updateCart,
} from '../../../services/Endpoints';
import {setCartData, setCartId} from '../../../redux/reducer/GlobalSlice';

const DATA = [
  {
    image: Icons.Applogo,
    title: 'Manicure',
    price: '$499',
  },
  {
    image: Icons.Applogo,
    title: 'Pedicure',
    price: '$499',
  },
  {
    image: Icons.Applogo,
    title: 'Threading',
    price: '$49',
  },
  {
    image: Icons.Applogo,
    title: 'Threading',
    price: '$49',
  },
];

const ServiceDetails = ({navigation, route}) => {
  const deviceWidth = Dimensions.get('window').width;
  const deviceHeight = Dimensions.get('window').height;
  const {cartData} = useSelector(state => state.GlobalReducer);

  const {itemDetails} = route?.params;

  const status = cartData?.items?.some(
    itm => itm?.service_id === itemDetails?.id,
  );

  const fetchCartData = async cartId => {
    if (cartId) {
      try {
        const res = await getCartData(cartId);
        if (res.status === 200) {
          const cartData = res?.data?.data;
          if (cartData) {
            dispatch(setCartData(cartData));
            dispatch(setCartId(cartId));
          }
        }
      } catch (error) {
        console.log('Cart Fetch Error--->', error);
      }
    }
  };

  const createOrUpdateCart = async () => {
    if (cartData?.cart_id) {
      if (status) {
        const filteredItem = cartData?.items?.filter(
          item => item?.service_id === itemDetails?.id,
        )[0];
        const itemId = filteredItem?.id;
        try {
          const res = await removeCartItem(cartData?.cart_id, itemId);
          if (res?.data) {
            console.log(res?.data);
            ShowToast('Service succesfully removed!');
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        const updateCartData = new FormData();
        updateCartData.append('item_type', 'service');
        updateCartData.append('service_id', itemDetails?.id);
        updateCartData.append('qty', 1);
        updateCartData.append('unit_price', itemDetails?.price);
        try {
          const res = await updateCart(updateCartData, cartData?.cart_id);
          if (res?.data) {
            ShowToast('Service succesfully added!');
          }
        } catch (error) {
          console.log(error?.response?.data);
        }
      }
      await fetchCartData(cartData?.cart_id);
    } else {
      await getCurrentLocation(async res => {
        if (res?.longitude !== 0 && res?.latitude !== 0) {
          let fromdata = new FormData();
          fromdata.append(
            'customer_lng',
            '' + parseFloat(res?.longitude).toFixed(4),
          );
          fromdata.append(
            'customer_lat',
            '' + parseFloat(res?.latitude).toFixed(4),
          );
          fromdata.append('item_type', 'service');
          fromdata.append('service_id', itemDetails?.id);
          fromdata.append('qty', 1);
          fromdata.append('unit_price', itemDetails?.price);

          try {
            const response = await createCart(fromdata);
            console.log('Error!', response?.data);
            if (response?.data) {
              console.log(response?.data);
              cartId = response?.data?.cart_id;
              await fetchCartData(response?.data?.data?.cart_id);
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
    }
  };

  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ServiceReducer = useSelector(state => state.ServiceReducer);
  const [productDetails, setProductDetails] = useState([]);
  const [isAddProduct, setIsAddProduct] = useState(false);
  let category = global.selectedServiceCategory;
  const [selecedService, setSelectedService] = useState({});

  const [imagesFullscreenIndex, setImagesFullscreenIndex] = useState(0);
  const [imagesFullscreen, setImagesFullscreen] = useState(false);
  const [imagesVertical, setImagesVertical] = useState(false);
  // console.log('vv ', global.selectedServiceCategory);
  console.log("ProductDetails------>", productDetails?.image_urls)

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
        {[1].map((item, index) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              width={'95%'}
              alignSelf="center"
              marginTop={normalize(8)}
              justifyContent="space-between">
              <SkeletonPlaceholder.Item
                width={normalize(290)}
                height={170}
                borderRadius={8}
                alignSelf="center"
              />
              <SkeletonPlaceholder.Item
                width={normalize(290)}
                height={30}
                borderRadius={8}
                alignSelf="center"
                marginVertical={10}
              />
              <SkeletonPlaceholder.Item
                width={normalize(290)}
                height={170}
                borderRadius={8}
                alignSelf="center"
              />
              <SkeletonPlaceholder.Item
                flexDirection="row"
                marginVertical={normalize(16)}>
                <SkeletonPlaceholder.Item
                  width={normalize(100)}
                  height={normalize(158)}
                  borderRadius={normalize(12)}
                  marginLeft={normalize(12)}
                />
                <SkeletonPlaceholder.Item
                  width={normalize(100)}
                  height={normalize(158)}
                  borderRadius={normalize(12)}
                  marginLeft={normalize(12)}
                />
                <SkeletonPlaceholder.Item
                  width={normalize(100)}
                  height={normalize(158)}
                  borderRadius={normalize(12)}
                  marginLeft={normalize(12)}
                />
              </SkeletonPlaceholder.Item>
            </SkeletonPlaceholder.Item>
          );
        })}
      </SkeletonPlaceholder>
    );
  }

  // backgroundColor: '#F3F3F3',
  //                   height: normalize(158),
  //                   width: normalize(100),
  //                   marginLeft: normalize(12),
  //                   borderRadius: normalize(12),
  //                   padding: normalize(8),
  const bannerImages = images => {
    let arr = [];
    if (!_.isEmpty(images)) {
      for (var i = 0; i < images.length; i++) {
        arr.push({
          uri: images[i],
        });
      }
    } else {
      arr.push({
        uri: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
      });
    }
    return arr;
  };

  const ImageFooter = ({imageIndex, imagesCount}) => (
    <View
      style={{
        height: 50,
        backgroundColor: '#00000077',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontWeight: '700',
          marginBottom: normalize(10),
        }}>{`${imageIndex + 1} / ${imagesCount}`}</Text>
    </View>
  );

  async function addToCart(service) {
    let _ = getCurrentLocation(res => {
      if (res?.longitude !== 0 && res?.latitude !== 0) {
        let fromdata = new FormData();
        fromdata.append(
          'customer_lng',
          '' + parseFloat(res?.longitude).toFixed(4),
        );
        fromdata.append(
          'customer_lat',
          '' + parseFloat(res?.latitude).toFixed(4),
        );
        fromdata.append('item_type', 'service');
        fromdata.append('service_id', service?.id);
        fromdata.append('qty', 1);
        fromdata.append('unit_price', service?.price);

        isInternetConnected()
          .then(() => {
            dispatch(addToCartServiceRequest(fromdata));
          })
          .catch(err => {
            showErrorAlert('Please Connect To Internet');
          });
      }
    });
  }

  async function removeToCart(cartId, service) {
    await isInternetConnected()
      .then(() => {
        dispatch(
          removeCartItemsRequest({
            cart_id: cartId,
            service_id: service?.id,
          }),
        );
      })
      .catch(err => {
        showErrorAlert('Please Connect To Internet');
      });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
      }}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <Loader
        visible={
          ServiceReducer.status == 'Service/addToCartServiceRequest' ||
          ServiceReducer.status == 'Service/getCartItemsRequest' ||
          ServiceReducer.status == 'Service/removeCartItemsRequest'
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          flex: 1,
        }}>
        {!_.isEmpty(productDetails) ? (
          <View>
            <SliderBox
              images={bannerImages(productDetails?.image_urls)}
              sliderBoxHeight={300}
              imageLoadingColor={'rgba(0,0,0,0.2)'}
              ImageComponentStyle={{backgroundColor: 'white'}}
              paginationBoxVerticalPadding={0}
              dotStyle={{
                width: 20,
                height: 6,
                borderRadius: 5,
                marginHorizontal: -5,
                padding: 0,
                margin: 0,
              }}
              dotColor="black"
              inactiveDotColor="#90A4AE"
              onCurrentImagePressed={index => {
                setImagesFullscreenIndex(index);
                setImagesFullscreen(!imagesFullscreen);
              }}
            />

            <View
              style={{
                width: '90%',
                alignSelf: 'center',
                marginTop: normalize(15),
              }}>
              <Text
                style={{
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(15),
                  color: Colors.black,
                }}>
                {productDetails.name}
              </Text>

              <Text
                style={{
                  fontFamily: Fonts.Poppins_Regular,
                  fontSize: normalize(11),
                  color: Colors.davy_grey,
                }}>
                {productDetails.description}
              </Text>

              <View
                style={{
                  backgroundColor: 'green',
                  paddingHorizontal: normalize(5),
                  paddingVertical: normalize(2),
                  alignSelf: 'flex-start',
                  borderRadius: normalize(15),
                  marginVertical: normalize(2),
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(8),
                    fontFamily: Fonts.Poppins_Regular,
                  }}>
                  Category - {category?.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={Icons.timer}
                  style={{
                    height: normalize(10),
                    width: normalize(10),
                    resizeMode: 'contain',
                    marginRight: normalize(5),
                    top: normalize(1.5),
                  }}
                />
                <Text
                  style={{
                    fontSize: normalize(10),
                    color: '#757575',
                    fontFamily: Fonts.Poppins_Regular,
                    bottom: -2,
                  }}>
                  {`Duration - ${productDetails?.service_duration}`}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderBottomColor: 'rgba(0,0,0,0.2)',
                  paddingBottom: normalize(15),
                  borderBottomWidth: normalize(1),
                }}>
                <Text style={styles.price}>$ {productDetails?.price}</Text>

                <TouchableOpacity
                  onPress={createOrUpdateCart}
                  style={styles.touch}>
                  {!status && (
                    <Image style={styles.addImg} source={Icons.add} />
                  )}
                  <Text
                    style={[
                      styles.addTitle,
                      {
                        color: status ? 'black' : '#5E17EB',
                      },
                    ]}>
                    {status ? 'Remove' : 'Add To Cart'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={{marginTop: 50}}>{LoadingSkeleton()}</View>
        )}

        <ImageView
          images={bannerImages(productDetails?.image_urls)}
          imageIndex={imagesFullscreenIndex}
          visible={imagesFullscreen}
          onRequestClose={() => setImagesFullscreen(false)}
          doubleTapToZoomEnabled
          presentationStyle="overFullScreen"
          FooterComponent={({imageIndex}) => (
            <>
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: 'blue',
                    alignSelf: 'center',
                    marginBottom: -5,
                    backgroundColor: 'transparent',
                  },
                ]}
                onPress={() => {
                  setImagesFullscreen(false);
                  setImagesVertical(true);
                }}>
                <Image
                  source={Icons.iconVertical}
                  style={[styles.icon, {tintColor: 'white'}]}
                />
              </TouchableOpacity>

              <ImageFooter
                imageIndex={imageIndex}
                imagesCount={productDetails?.image_urls?.length}
              />
            </>
          )}
        />

        <Modal
          isVisible={imagesVertical}
          style={{padding: 0, margin: 0}}
          onBackdropPress={() => setImagesVertical(false)}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'black',
            }}>
            <FlatList
              data={bannerImages(productDetails?.image_urls)}
              style={{flex: 1}}
              contentContainerStyle={{
                paddingHorizontal: 3,
                paddingTop: normalize(65),
                paddingBottom: 80,
              }}
              renderItem={({item}) => {
                return (
                  <Image
                    source={{uri: item.uri}}
                    style={{
                      backgroundColor: 'rgba(0,0,0,0.1)',
                      width: '100%',
                      height: deviceWidth * (9 / 16),
                      marginBottom: 3,
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={{position: 'absolute', right: 15, top: normalize(30)}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  backgroundColor: 'rgba(0,0,0,0.6)',
                  borderRadius: normalize(30),
                },
              ]}
              onPress={() => {
                setImagesVertical(false);
              }}>
              <Image
                source={Icons.iconClose}
                style={{
                  tintColor: 'white',
                  height: normalize(17),
                  width: normalize(17),
                  resizeMode: 'contain',
                }}
              />
            </TouchableOpacity>
          </View>
          <View style={{position: 'absolute', bottom: 30, alignSelf: 'center'}}>
            <TouchableOpacity
              style={[
                styles.button,
                {
                  // backgroundColor: 'blue',
                  // alignSelf: 'center',
                  // marginBottom: -5,
                  backgroundColor: 'rgba(0,0,0,0.4)',
                },
              ]}
              onPress={() => {
                setImagesVertical(false);
                setTimeout(() => {
                  setImagesFullscreen(true);
                }, 500);
              }}>
              <Image
                source={Icons.icon_photo_swipe}
                style={[styles.icon, {tintColor: 'white'}]}
              />
            </TouchableOpacity>
          </View>
        </Modal>
        {/* Prithick */}
        {!_.isEmpty(productDetails) && (
          <View style={{width: '90%', alignSelf: 'center'}}>
            <Text
              style={{
                fontFamily: Fonts.Poppins_Regular,
                fontSize: 12,
                color: Colors.black,
              }}
              numberOfLines={8}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </Text>
          </View>
        )}

        <View
          style={
            {
              // height: normalize(200),
            }
          }>
          {!_.isEmpty(productDetails) && (
            <FlatList
              horizontal
              data={DATA}
              keyExtractor={(item, index) => index.toString()}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{
                paddingHorizontal: normalize(10),
                paddingVertical: normalize(20),
              }}
              renderItem={({item, index}) => {
                return (
                  <View
                    style={{
                      backgroundColor: '#F3F3F3',
                      height: normalize(158),
                      width: normalize(100),
                      marginLeft: normalize(12),
                      borderRadius: normalize(12),
                      padding: normalize(8),
                    }}>
                    <Image
                      style={{
                        height: normalize(65),
                        width: '100%',
                        borderRadius: normalize(6),
                      }}
                      source={item.image}
                    />
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: '#161616',
                        fontFamily: Fonts.Poppins_Medium,
                        marginTop: normalize(6),
                      }}>
                      {item.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: normalize(12),
                        color: '#161616',
                        fontFamily: Fonts.Poppins_Regular,
                      }}>
                      {item.price}
                    </Text>

                    <TouchableOpacity
                      style={{
                        width: '100%',
                        height: normalize(26),
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: Colors.black,
                        borderRadius: normalize(20),
                        justifyContent: 'center',
                        marginTop: normalize(6),
                      }}>
                      <Image
                        style={{
                          height: normalize(10),
                          width: normalize(10),
                          marginRight: normalize(5),
                          tintColor: 'white',
                        }}
                        source={Icons.add}
                      />
                      <Text
                        style={{
                          color: '#fff',
                          fontFamily: Fonts.Poppins_Medium,
                          fontSize: normalize(12),
                        }}>
                        {'Add'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            />
          )}
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backContainer}>
        <Image source={Icons.BackArrow} style={styles.backImg} />
      </TouchableOpacity>
      {/* {!_.isEmpty(selecedService) ? (
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
      ) : null} */}
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
    backgroundColor: Colors.white,
    borderRadius: normalize(30),
    top: '8%',
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
  button: {
    height: 40,
    width: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    // shadow styles
    shadowColor: 'blue',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 20,
  },
  icon: {
    tintColor: 'blue',
    width: normalize(20),
    height: normalize(20),
    resizeMode: 'contain',
  },
});
