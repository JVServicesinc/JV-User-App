import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import normalize from '../../../../utils/helpers/normalize';

const SlotSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius={4}>
      <SkeletonPlaceholder.Item flexDirection="row">
        {[1, 2].map((item, index) => {
          return (
            <SkeletonPlaceholder.Item
              key={index}
              width={normalize(58)}
              height={normalize(24)}
              marginRight={normalize(10)}
            />
          );
        })}
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default SlotSkeleton;

const styles = StyleSheet.create({});
