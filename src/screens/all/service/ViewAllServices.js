import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
import Header from '../../../components/Header';
import {Fonts} from '../../../themes/Fonts';
import * as Animatable from 'react-native-animatable';
import {useDispatch, useSelector} from 'react-redux';
import {useIsFocused} from '@react-navigation/native';
import showErrorAlert from '../../../utils/helpers/Toast';
import isInternetConnected from '../../../utils/helpers/NetInfo';
import _ from 'lodash';
import {getServiceCategoryRequest} from '../../../redux/reducer/ServiceReducer';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import LottieView from 'lottie-react-native';

const ViewAllServices = ({navigation, route}) => {
  const {title, item} = route?.params;
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const ServiceReducer = useSelector(state => state.ServiceReducer);

  useEffect(() => {
    if (isFocused && !_.isEmpty(item)) {
      isInternetConnected()
        .then(() => {
          dispatch(getServiceCategoryRequest(item?.id));
        })
        .catch(err => {
          showErrorAlert('Please Connect To Internet');
        });
    }
  }, [isFocused, item]);

  const keyExtractor = useCallback((item, index) => index.toString(), []);

  let CateId = item?.id;

  const renderItem = useCallback(({item, index}) => {
    return (
      <Animatable.View
        animation={'fadeInUp'}
        duration={800}
        delay={index * 300}>
        <TouchableOpacity
          onPress={() => {
            global.selectedServiceCategory = item;
            navigation.navigate('ViewServiceCategory', {
              cateId: CateId,
              id: item?.id,
              title: item?.name,
            });
          }}
          style={{
            height: normalize(175),
            width: normalize(137),
            borderColor: Colors.border,
            borderWidth: normalize(1),
            borderRadius: normalize(15),
            padding: normalize(5),
          }}>
          <Image
            source={{uri: item?.image_url}}
            style={{
              width: '100%',
              height: normalize(115),
              resizeMode: 'cover',
              borderRadius: normalize(10),
            }}
          />

          <Text
            numberOfLines={2}
            style={{
              fontSize: normalize(14),
              color: '#161616',
              fontFamily: Fonts.Poppins_Regular,
              marginTop: normalize(10),
              marginLeft: normalize(5),
            }}>
            {item.name}
          </Text>
        </TouchableOpacity>
      </Animatable.View>
    );
  }, []);

  function LoadingSkeleton() {
    return (
      <SkeletonPlaceholder borderRadius={4}>
        {[1, 2, 3].map((item, index) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              width={'90%'}
              alignSelf="center"
              flexDirection="row"
              alignItems="center"
              marginTop={normalize(8)}
              justifyContent="space-between">
              <SkeletonPlaceholder.Item
                width={normalize(138)}
                height={normalize(138)}
                borderRadius={8}
              />
              <SkeletonPlaceholder.Item
                width={normalize(138)}
                height={normalize(138)}
                borderRadius={8}
              />
            </SkeletonPlaceholder.Item>
          );
        })}
      </SkeletonPlaceholder>
    );
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.white} />
      <View
        style={{
          width: '100%',
          paddingHorizontal: normalize(15),
        }}>
        <Header title={title}  isShowOrders={true} type={'service'}/>
      </View>
      {ServiceReducer.status == 'Service/getServiceCategoryRequest' ? (
        <LoadingSkeleton />
      ) : (
        <FlatList
          data={ServiceReducer?.getServiceCategoryRes?.data}
          keyExtractor={keyExtractor}
          numColumns={2}
          renderItem={renderItem}
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            paddingBottom: normalize(50),
          }}
          showsVerticalScrollIndicator={false}
          columnWrapperStyle={{
            justifyContent: 'space-between',
            marginHorizontal: normalize(15),
            marginVertical: normalize(7),
          }}
          ListEmptyComponent={
            <View
              style={{
                marginTop: normalize(130),
              }}>
              <LottieView
                source={require('../../../assets/json/empty_service.json')}
                autoPlay
                loop
                style={{
                  height: normalize(200),
                  width: normalize(200),
                  alignSelf: 'center',
                }}
              />
              <Text
                style={{
                  color: '#068a8a',
                  fontFamily: Fonts.Poppins_Medium,
                  fontSize: normalize(14),
                  alignSelf: 'center',
                }}>
                Service Not Availble
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default ViewAllServices;
