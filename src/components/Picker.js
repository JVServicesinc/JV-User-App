import {View, Text} from 'react-native';
import React from 'react';
import Modal from 'react-native-modal';
import {Colors} from '../themes/Colors';
import normalize from '../utils/helpers/normalize';

const Picker = ({
  isVisible,
  setIsVisible,
  isTabLine,
  height = '30%',
  children,
  backdropOpacity = 0.3
}) => {
  return (
    <Modal
      animationIn={'slideInUp'}
      animationOut={'slideOutDown'}
      backdropTransitionOutTiming={0}
      avoidKeyboard={true}
      hideModalContentWhileAnimating={true}
      isVisible={isVisible}
      style={{
        width: '100%',
        alignSelf: 'center',
        margin: 0,
      }}
      animationInTiming={600}
      animationOutTiming={800}
      backdropOpacity={backdropOpacity}
      backdropColor={Colors.black}
      onBackButtonPress={() => setIsVisible(false)}
      onBackdropPress={() => setIsVisible(false)}>
      <View
        style={{
          backgroundColor: Colors.white,
          height: height,
          paddingVertical: 15,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 10,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        {isTabLine && (
          <View
            style={{
              height: normalize(5),
              width: normalize(35),
              backgroundColor: Colors.silver,
              alignSelf: 'center',
              borderRadius: normalize(20),
              marginVertical: normalize(2)
            }}
          />
        )}
        {children}
      </View>
    </Modal>
  );
};

export default Picker;
