import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import normalize from '../utils/helpers/normalize';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation, useRoute} from '@react-navigation/native';
import {Icons} from '../themes/Icons';
import {Colors} from '../themes/Colors';
import {Fonts} from '../themes/Fonts';
import {useSelector} from 'react-redux';
import _ from 'lodash';
import {navigate} from '../utils/helpers/RootNavigation';

const Header = ({
  title,
  goBack = true,
  onPress,
  tintColor = Colors.black,
  textColor = Colors.black,
  isShowOrders = false,
  type = 'service',
  disableRightIcon = false,
  hideOrders = false,
}) => {
  const navigation = useNavigation();
  const ServiceReducer = useSelector(state => state.ServiceReducer);
  const ProductReducer = useSelector(state => state.ProductReducer);
  const {cartData} = useSelector(state => state.GlobalReducer);

  let data =
    type == 'service' ? ServiceReducer?.addCart : ProductReducer?.addProduct;

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: normalize(30),
        marginVertical: normalize(16),
      }}>
      <TouchableOpacity
        onPress={() => {
          if (goBack) {
            navigation.goBack();
          } else {
            onPress();
          }
        }}>
        <Image
          source={Icons.BackArrow}
          style={{
            height: normalize(normalize(14)),
            width: normalize(18),
            resizeMode: 'contain',
            tintColor: tintColor,
          }}
        />
      </TouchableOpacity>
      <Text
        style={{
          color: textColor,
          fontSize: 20,
          fontFamily: Fonts.Poppins_SemiBold,
          // top: normalize(2),
        }}>
        {title}
      </Text>

      <TouchableOpacity
        disabled={
          (!isShowOrders && !_.isEmpty(data)) || disableRightIcon || hideOrders
        }
        onPress={() => navigate('ServiceSummary')}
        style={{
          height: normalize(30),
          width: normalize(34),
          justifyContent: 'center',
          alignItems: 'center',
          // display: isShowOrders && !_.isEmpty(data) ? 'flex' : 'none',
        }}>
        {!hideOrders && (
          <>
            <Image
              // source={type == 'service' ? Icons.delivery_status : Icons.Order}
              source={Icons.Order}
              style={{
                height: normalize(20),
                width: normalize(20),
                alignSelf: 'center',
                resizeMode: 'contain',
                // display: isShowOrders && !_.isEmpty(data) ? 'flex' : 'none',
              }}
            />
            {cartData?.items?.length > 0 && (
              <View
                style={{
                  height: normalize(15),
                  width: normalize(15),
                  backgroundColor: Colors.black,
                  borderRadius: normalize(30),
                  position: 'absolute',
                  top: 0,
                  right: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  // display: isShowOrders && !_.isEmpty(data) ? 'flex' : 'none',
                }}>
                <Text
                  style={{
                    color: Colors.white,
                    fontSize: normalize(8),
                    fontFamily: Fonts.Poppins_Medium,
                  }}>
                  {cartData?.items?.length}
                </Text>
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
