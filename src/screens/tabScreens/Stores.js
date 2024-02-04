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
import normalize from '../../utils/helpers/normalize';
import {Icons} from '../../themes/Icons';
import {StatusBar} from 'react-native';
import {useState} from 'react';
import {Fonts} from '../../themes/Fonts';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import Picker from '../../components/Picker';
import SelectALocation from '../all/SelectALocation';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {useDispatch, useSelector} from 'react-redux';
import isInternetConnected from '../../utils/helpers/NetInfo';
import showErrorAlert from '../../utils/helpers/Toast';
import {
  getProductCategoryRequest,
  getTrendingProductRequest,
} from '../../redux/reducer/ProductReducer';
import _ from 'lodash';

const Stores = () => {
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [searchQuery, setSearchQuery] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const UserReducer = useSelector(state => state.UserReducer);
  const ProductReducer = useSelector(state => state.ProductReducer);

  useEffect(() => {
    isInternetConnected()
      .then(() => {
        dispatch(getProductCategoryRequest());
        dispatch(getTrendingProductRequest());
      })
      .catch(err => {
        showErrorAlert('Please Connect To Internet');
      });
  }, []);

  const Data = [
    {icon: Icons.door_lock, title: `Long handle with lock`},
    {icon: Icons.door2, title: 'Ideal SS open curtain'},
    {icon: Icons.door, title: 'Godrej Door closer'},
  ];

  const Data2 = [
    {icon: Icons.shower, title: `Shower head`},
    {icon: Icons.hunger2, title: 'Hangers & Mirrors'},
    {icon: Icons.hunger2, title: 'Hangers & Mirrors'},
  ];

  // function SingleHRList({
  //   onPress,
  //   title,
  //   data,
  //   subtitle,
  //   style,
  //   titleBottom = false,
  // }) {
  //   return (
  //     <>
  //       <View style={[styles.titlecon, style]}>
  //         <View>
  //           <Text style={styles.roboto17}>{title}</Text>
  //           {subtitle && <Text style={styles.roboto18}>{subtitle}</Text>}
  //         </View>
  //         <TouchableOpacity onPress={onPress}>
  //           <Image source={Icons.ViewAll} style={styles.allicon} />
  //         </TouchableOpacity>
  //       </View>

  //       <FlatList
  //         data={data}
  //         horizontal
  //         showsHorizontalScrollIndicator={false}
  //         keyExtractor={(item, index) => index.toString()}
  //         contentContainerStyle={{paddingStart: normalize(18)}}
  //         renderItem={({item, index}) => {
  //           return (
  //             <Animatable.View
  //               animation={'fadeInRight'}
  //               duration={800}
  //               delay={index * 300}>
  //               <TouchableOpacity style={styles.card1}>
  //                 <Image
  //                   source={item?.icon}
  //                   style={{
  //                     height: normalize(65),
  //                     width: '100%',
  //                     marginTop: normalize(5),
  //                     borderRadius: normalize(6),
  //                     resizeMode: 'contain',
  //                   }}
  //                 />
  //               </TouchableOpacity>
  //               {!titleBottom && (
  //                 <Text
  //                   style={[
  //                     styles.card_text1,
  //                     {
  //                       color: '#090909',
  //                     },
  //                   ]}>
  //                   {item.title}
  //                 </Text>
  //               )}

  //               {!titleBottom && (
  //                 <Text style={styles.card_text1}>
  //                   $58.00
  //                   {'   '}
  //                   {
  //                     <Text
  //                       style={{
  //                         color: '#CECECE',
  //                         textDecorationLine: 'line-through',
  //                       }}>
  //                       $158.00
  //                     </Text>
  //                   }
  //                 </Text>
  //               )}
  //             </Animatable.View>
  //           );
  //         }}
  //       />
  //     </>
  //   );
  // }

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

  // -----------------------------------------------
  const keyExtractor = useCallback((item, index) => index.toString(), []);

  const renderItem = useCallback(({item, index}) => {
    return <CardItem item={item} index={index} />;
  }, []);

  const CardItem = useCallback(({item, index, containerStyle}) => {
    return (
      <Animatable.View
        animation={'fadeInRight'}
        duration={800}
        delay={index * 300}
        style={containerStyle}>
        <TouchableOpacity
          onPress={() => {
            global.selectedStoreCategory = item;
            navigation.navigate('ViewAllProduct', {
              id: item?.id,
              title: item?.name,
            });
          }}
          style={styles.card}>
          <Image source={{uri: item?.image_url}} style={styles.card_icon} />
          <Text style={styles.card_text}>{item?.name}</Text>
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
          <TouchableOpacity
            onPress={() => navigation?.navigate('ViewAllProductCategory')}>
            <Image source={Icons.ViewAll} style={styles.allicon} />
          </TouchableOpacity>
        </View>

        <FlatList
          data={data.length > 3 ? data.slice(0, 3) : data}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginTop: normalize(12),
            paddingHorizontal: normalize(18),
          }}
          numColumns={3}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
        />
      </>
    );
  }

  // -----------------------------------------------
  const renderItem2 = useCallback(({item, index}) => {
    return (
      <Animatable.View
        animation={'fadeInRight'}
        duration={800}
        delay={index * 300}>
        <TouchableOpacity style={styles.card1}>
          <Image source={{uri: item?.image_url}} style={styles.img1} />
        </TouchableOpacity>
        <Text
          style={[
            styles.card_text1,
            {
              color: '#090909',
            },
          ]}>
          {item.name}
        </Text>

        <Text style={styles.card_text1}>
          ${item?.sale_price ? item?.sale_price : ' -'}
          {'   '}
          {
            <Text
              style={{
                color: '#CECECE',
                textDecorationLine: 'line-through',
              }}>
              ${item?.price}
            </Text>
          }
        </Text>
      </Animatable.View>
    );
  }, []);

  function SingleHRList({onPress, title, data, subtitle, style}) {
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
          keyExtractor={keyExtractor}
          contentContainerStyle={{paddingStart: normalize(18)}}
          renderItem={renderItem2}
        />
      </>
    );
  }

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
                    Store
                  </Text>
                }
              </Text>
            </View>

            <View style={styles.scontainer}>
              <Image source={Icons.Search} style={styles.searchicon} />
              <TextInput
                style={styles.input}
                placeholder="Search for products"
                placeholderTextColor="gray"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            </View>
          </View>
        }
        ListFooterComponent={
          <>
            {ProductReducer.status == 'Product/getProductCategoryRequest' ? (
              <LoadingSkeleton />
            ) : (
              <>
                {!_.isEmpty(ProductReducer?.productCategoryRes) ? (
                  <CategoryList
                    data={ProductReducer?.productCategoryRes}
                    title={'Categories'}
                    style={{
                      marginTop: normalize(10),
                    }}
                  />
                ) : null}
              </>
            )}

            {ProductReducer.status == 'Product/getTrendingProductRequest' ? (
              <LoadingSkeleton num={2} />
            ) : (
              <>
                {!_.isEmpty(ProductReducer?.trendingProductRes) ? (
                  <SingleHRList
                    // subtitle={'Door, windows & cabinet accessories'}
                    title={'Trending'}
                    data={ProductReducer?.trendingProductRes}
                    style={{paddingHorizontal: normalize(18)}}
                  />
                ) : null}
              </>
            )}

            {/* {!isLoading ? (
              <LoadingSkeleton num={2} />
            ) : (
              <SingleHRList
                subtitle={'Products that give you comtort & ease.'}
                title={'Bathroom makeover'}
                data={Data2}
                style={{paddingHorizontal: normalize(18)}}
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

export default Stores;

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
    marginTop: normalize(8),
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
    width: normalize(145),
    borderRadius: normalize(10),
    backgroundColor: Colors.gray,
    marginRight: normalize(12),
    paddingHorizontal: normalize(12),
    paddingVertical: normalize(10),
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
  img1: {
    height: normalize(65),
    width: '100%',
    marginTop: normalize(5),
    borderRadius: normalize(6),
    resizeMode: 'contain',
  },
});
