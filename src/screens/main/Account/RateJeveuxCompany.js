import {
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/Header';
import {Colors} from '../../../themes/Colors';
import normalize from '../../../utils/helpers/normalize';
const {width, height} = Dimensions.get('window');
import RenderHtml from 'react-native-render-html';
import SelectionControl from '../../../components/SelectionControl';
import {LineChart} from 'react-native-gifted-charts';

const RateJeveuxCompany = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const daysOfWeekData = [
    {value: 20},
    {value: 40},
    {value: 90},
    {value: 80},
    {value: 75},
    {value: 95},
    {value: 70},
  ];
  const daysOfMonthData = [
    {value: 20},
    {value: 40},
    {value: 90},
    {value: 80},
    {value: 75},
    {value: 95},
    {value: 70},
    {value: 90},
    {value: 80},
    {value: 75},
    {value: 95},
    {value: 70},
  ];

  const daysOfWeekYear = [
    {value: 90},
    {value: 80},
    {value: 75},
    {value: 95},
    {value: 70},
    {value: 20},
    {value: 40},
  ];
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysOfYear = ['2017', '1018', '2019', '2020', '2021', '2022', '2023'];
  const daysOfMonth = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const source = {
    html: `
    <html>
    <body>
    
    <p><b>Lorem Ipsum is simply dummy text of the </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. Lorem Ipsum has been the 
    industry's standard dummy text ever since the 1500s,</p>

    <p><b>JEveux Lorem Ipsum is simply dummy text of 
    the Lorem Ipsum is simply </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. <b>Lorem Ipsum has been the</b> 
    industry's standard dummy text ever since the 1500s,</p>

    <p><b>Lorem Ipsum is simply dummy text of the  </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. Lorem Ipsum has been the 
    industry's standard dummy text ever since the 1500s,</p>

    <p><b>JEveux Lorem Ipsum is simply dummy text of 
    the Lorem Ipsum is simply </b></p>
    <p>Lorem Ipsum is simply dummy text of the printing and 
    typesetting industry. <b>Lorem Ipsum has been the</b> 
    industry's standard dummy text ever since the 1500s,</p>

    <p>&#x2022; Lorem Ipsum is simply dummy text of the </p>
    <p>&#x2022; Lorem Ipsum is simply dummy text of the printing 
    and typesetting industry. </p>
    <p>&#x2022; Lorem Ipsum is simply dummy text of the </p>
    <p>&#x2022; Lorem Ipsum is simply dummy text of the printing 
    and typesetting industry. </p>
    
    </body>
    </html>`,
  };

  let data = [daysOfWeekData, daysOfMonthData, daysOfWeekYear];
  let label = [daysOfWeek, daysOfMonth, daysOfYear];
  return (
    <SafeAreaView style={styles.primary}>
      <View
        style={{
          flex: 1,
        }}>
        <StatusBar backgroundColor={'#fff'} barStyle={'dark-content'} />

        <View
          style={{
            paddingHorizontal: normalize(18),
          }}>
          <Header title={'Rate Jeveux Company'} />
        </View>

        <FlatList
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
          ListHeaderComponent={
            <View
              style={{
                backgroundColor: 'white',
              }}>
              <SelectionControl
                tabs={['This Week', 'This Month', 'This Year']}
                currentIndex={tabIndex}
                onChange={index => setTabIndex(index)}
                segmentedControlBackgroundColor={'#000000'}
                activeSegmentBackgroundColor={'#FFFFFF'}
                activeTextColor="#000000"
                textColor="#FFFFFF"
                paddingVertical={10}
              />
            </View>
          }
          ListFooterComponent={
            <View
              style={{
                paddingHorizontal: normalize(18),
              }}>
              <LineChart
                data={data[tabIndex]}
                areaChart
                width={normalize(240)}
                //   noOfSections={10}
                stepValue={20}
                stepHeight={20}
                spacing={50}
                adjustToWidth={false}
                isAnimated={false}
                xAxisLabelTexts={label[tabIndex]}
                curved={true}
                hideDataPoints={true}
              />
              <RenderHtml contentWidth={width} source={source} />
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

export default RateJeveuxCompany;

const styles = StyleSheet.create({
  primary: {
    flex: 1,
    backgroundColor: Colors.white,
    // paddingHorizontal: normalize(18),
  },
});
