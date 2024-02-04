import { Platform, ToastAndroid } from "react-native";
import Toast from "react-native-simple-toast";
import Snackbar from 'react-native-snackbar';

export default function showErrorAlert(message, isLong = false) {
  // if (Platform.OS == "android") {
  //   ToastAndroid.show(
  //     message,
  //     isLong == true ? ToastAndroid.LONG : ToastAndroid.SHORT,
  //     50
  //   );
  // } else {
  //   setTimeout(() => {
  //     Toast.showWithGravity(message, 1, Toast.BOTTOM);
  //   }, 5);
  // }
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
}

export const ShowToast = (message) => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_SHORT,
  });
}
