import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../src/themes/Colors';
import {
  CardField,
  StripeProvider,
  useStripe,
} from '@stripe/stripe-react-native';

const PaymentGateway = () => {
  const {initPaymentSheet, presentPaymentSheet} = useStripe();

  let publishableKey = "pk_test_51OMwKgSBfw15vaaOtoKUNqEs4Jaaa3oPhG8rGe52nuSobnXXVzHNMEfFT4Ahq7U7YkiuqamIp6mRc0EMGJS1aU9h00z7mPPPbJ"

  const createOrder = async () => {
    const initResponse = await initPaymentSheet({
      merchantDisplayName: 'JV',
      paymentIntentClientSecret:
        'pi_3OMxGcSBfw15vaaO0MJtjXaR_secret_Ba496Two9Stz9gKNGZkXI0ouL',
    });

    if (initResponse.error) {
      Alert.alert('Something went wrong!');
      return;
    }

    await presentPaymentSheet();
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.white,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <StripeProvider publishableKey={publishableKey}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.black,
            width: '50%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={createOrder}>
          <Text style={{color: Colors.white}}>Pay</Text>
        </TouchableOpacity>
      </StripeProvider>
    </SafeAreaView>
  );
};

export default PaymentGateway;

const styles = StyleSheet.create({});
