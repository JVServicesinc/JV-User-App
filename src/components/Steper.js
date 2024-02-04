import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import normalize from '../utils/helpers/normalize';
import StepIndicator from 'react-native-step-indicator';
import {Icons} from '../themes/Icons';
import {Fonts} from '../themes/Fonts';

const Steper = ({style, currentStep, data, color}) => {
  const onStepPress = position => {
    // setCurrentPage(position);
  };

  const renderStepIndicator = position => (
    // console.log('position,status -- ', position?.stepStatus);

    <Image
      source={Icons.tick}
      style={{
        height: normalize(11),
        width: normalize(11),
        resizeMode: 'contain',
        alignSelf: 'center',
        opacity:
          'finished' == position?.stepStatus ||
          'current' == position?.stepStatus
            ? 1
            : 0,
      }}
    />
  );

  const thirdIndicatorStyles = {
    stepIndicatorSize: normalize(20),
    currentStepIndicatorSize: normalize(22),
    separatorStrokeWidth: normalize(2),
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: color[currentStep],
    stepStrokeWidth: 2,
    stepStrokeUnFinishedColor: '#BFA2F7',
    stepStrokeFinishedColor: 'transparent',
    separatorFinishedColor: '#7eaec4',
    separatorUnFinishedColor: 'transparent',
    stepIndicatorUnFinishedColor: 'rgb(115,64,239)',
    stepIndicatorCurrentColor: color[currentStep],
    stepIndicatorLabelFontSize: 0,
    currentStepIndicatorLabelFontSize: 0,
    stepIndicatorLabelCurrentColor: 'transparent',
    stepIndicatorLabelFinishedColor: 'transparent',
    stepIndicatorLabelUnFinishedColor: 'transparent',
    labelColor: '#BFA2F7',
    labelSize: normalize(9),
    currentStepLabelColor: '#FFFFFF',
    labelFontFamily: Fonts.Poppins_Medium,
  };

  return (
    <View
      style={[
        {
          width: '100%',
        },
        style,
      ]}>
      <View
        style={{
          marginVertical: normalize(15),
        }}>
        <StepIndicator
          stepCount={3}
          customStyles={thirdIndicatorStyles}
          currentPosition={currentStep}
          renderStepIndicator={renderStepIndicator}
          onPress={onStepPress}
          labels={data}
        />
      </View>
    </View>
  );
};

export default Steper;
