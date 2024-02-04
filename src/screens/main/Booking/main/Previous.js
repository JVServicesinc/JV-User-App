import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, { useEffect } from 'react';
import {Colors} from '../../../../themes/Colors';
import normalize from '../../../../utils/helpers/normalize';
import * as Animatable from 'react-native-animatable';
import { useIsFocused } from '@react-navigation/native';
import { setCurrentTab } from '../../../../redux/reducer/AuthReducer';
import { useDispatch } from 'react-redux';

const Previous = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch()

  useEffect(() => {
    if (isFocused) {
      dispatch(setCurrentTab(false));
    }
  }, [isFocused]);

  return (
    <View style={styles.primary}>
      <Animatable.View
        animation={'fadeInLeft'}
        duration={800}
        delay={180}
        style={styles.card}>
        <View style={styles.container}>
          <Text
            style={{
              fontSize: normalize(16),
              color: Colors.black,
              fontWeight: '500',
            }}>
            24th{'\n'}Mar, Friday
          </Text>
          <Text
            style={{
              fontSize: normalize(12),
              color: Colors.black,
              fontWeight: '500',
            }}>
            AC service
          </Text>
        </View>
        <View style={{marginTop: normalize(5)}}>
          <Text
            style={{
              fontSize: normalize(12),
              color: Colors.subtext,
              fontWeight: '500',
            }}>
            • General service
          </Text>
        </View>
        <View style={{...styles.container, marginTop: normalize(5)}}>
          <TouchableOpacity
            style={{...styles.btn, backgroundColor: Colors.button_color}}>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: '500',
                color: Colors.white,
              }}>
              Share Feedback
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: '500',
                color: Colors.black,
              }}>
              View details
            </Text>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

export default Previous;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(18),
  },
  card: {
    backgroundColor: Colors.cardColor,
    padding: normalize(15),
    borderRadius: normalize(18),
    marginTop: normalize(15),
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  btn: {
    width: '48%',
    paddingVertical: normalize(12),
    borderRadius: normalize(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
});
