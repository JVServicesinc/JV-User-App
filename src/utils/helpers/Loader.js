import React from 'react';
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {Colors} from '../../themes/Colors';
import {Modal, Portal} from 'react-native-paper';

const {height, width} = Dimensions.get('screen');
export default function Loader(props) {
  return (
    <Portal>
      <Modal visible={props.visible}>
        <View
          style={{
            backgroundColor: 'rgba(0,0,0,0.7)',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size="large" color={Colors.white} />
        </View>
      </Modal>
    </Portal>
  );
}

Loader.propTypes = {
  visible: PropTypes.bool,
};

Loader.defaultProps = {
  visible: true,
};
