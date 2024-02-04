import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import normalize from '../../../../utils/helpers/normalize';

const BookingItemSkeleton = () => {
  return (
    <SkeletonPlaceholder borderRadius= {normalize(18)} height={normalize(100)}>
      <SkeletonPlaceholder.Item
        height={normalize(100)}
        flexDirection="row"
        alignSelf="center"
        >
        <SkeletonPlaceholder.Item
          alignSelf="center"
          width="80%"
          height={normalize(100)}
        />
      </SkeletonPlaceholder.Item>
    </SkeletonPlaceholder>
  );
};

export default BookingItemSkeleton;

const styles = StyleSheet.create({});
