
package com.facebook.react;

import android.app.Application;
import android.content.Context;
import android.content.res.Resources;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainPackageConfig;
import com.facebook.react.shell.MainReactPackage;
import java.util.Arrays;
import java.util.ArrayList;

// @notifee/react-native
import io.invertase.notifee.NotifeePackage;
// @react-native-async-storage/async-storage
import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;
// @react-native-camera-roll/camera-roll
import com.reactnativecommunity.cameraroll.CameraRollPackage;
// @react-native-clipboard/clipboard
import com.reactnativecommunity.clipboard.ClipboardPackage;
// @react-native-community/geolocation
import com.reactnativecommunity.geolocation.GeolocationPackage;
// @react-native-community/netinfo
import com.reactnativecommunity.netinfo.NetInfoPackage;
// @react-native-firebase/app
import io.invertase.firebase.app.ReactNativeFirebaseAppPackage;
// @react-native-firebase/messaging
import io.invertase.firebase.messaging.ReactNativeFirebaseMessagingPackage;
// @react-native-masked-view/masked-view
import org.reactnative.maskedview.RNCMaskedViewPackage;
// @stream-io/flat-list-mvcp
import com.mvcpscrollviewmanager.MvcpScrollViewManagerPackage;
// @stream-io/react-native-webrtc
import com.oney.WebRTCModule.WebRTCModulePackage;
// @stream-io/video-react-native-sdk
import com.streamvideo.reactnative.StreamVideoReactNativePackage;
// @stripe/stripe-react-native
import com.reactnativestripesdk.StripeSdkPackage;
// lottie-react-native
import com.airbnb.android.react.lottie.LottiePackage;
// react-native-date-picker
import com.henninghall.date_picker.DatePickerPackage;
// react-native-document-picker
import com.reactnativedocumentpicker.RNDocumentPickerPackage;
// react-native-fs
import com.rnfs.RNFSPackage;
// react-native-geolocation-service
import com.agontuk.RNFusedLocation.RNFusedLocationPackage;
// react-native-gesture-handler
import com.swmansion.gesturehandler.RNGestureHandlerPackage;
// react-native-haptic-feedback
import com.mkuczera.RNReactNativeHapticFeedbackPackage;
// react-native-image-crop-picker
import com.reactnative.ivpusic.imagepicker.PickerPackage;
// react-native-image-resizer
import fr.bamlab.rnimageresizer.ImageResizerPackage;
// react-native-incall-manager
import com.zxcpoiu.incallmanager.InCallManagerPackage;
// react-native-linear-gradient
import com.BV.LinearGradient.LinearGradientPackage;
// react-native-localize
import com.zoontek.rnlocalize.RNLocalizePackage;
// react-native-maps
import com.rnmaps.maps.MapsPackage;
// react-native-pager-view
import com.reactnativepagerview.PagerViewPackage;
// react-native-reanimated
import com.swmansion.reanimated.ReanimatedPackage;
// react-native-safe-area-context
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
// react-native-screens
import com.swmansion.rnscreens.RNScreensPackage;
// react-native-share
import cl.json.RNSharePackage;
// react-native-snackbar
import com.azendoo.reactnativesnackbar.SnackbarPackage;
// react-native-svg
import com.horcrux.svg.SvgPackage;
// react-native-video
import com.brentvatne.react.ReactVideoPackage;
// react-native-webview
import com.reactnativecommunity.webview.RNCWebViewPackage;

public class PackageList {
  private Application application;
  private ReactNativeHost reactNativeHost;
  private MainPackageConfig mConfig;

  public PackageList(ReactNativeHost reactNativeHost) {
    this(reactNativeHost, null);
  }

  public PackageList(Application application) {
    this(application, null);
  }

  public PackageList(ReactNativeHost reactNativeHost, MainPackageConfig config) {
    this.reactNativeHost = reactNativeHost;
    mConfig = config;
  }

  public PackageList(Application application, MainPackageConfig config) {
    this.reactNativeHost = null;
    this.application = application;
    mConfig = config;
  }

  private ReactNativeHost getReactNativeHost() {
    return this.reactNativeHost;
  }

  private Resources getResources() {
    return this.getApplication().getResources();
  }

  private Application getApplication() {
    if (this.reactNativeHost == null) return this.application;
    return this.reactNativeHost.getApplication();
  }

  private Context getApplicationContext() {
    return this.getApplication().getApplicationContext();
  }

  public ArrayList<ReactPackage> getPackages() {
    return new ArrayList<>(Arrays.<ReactPackage>asList(
      new MainReactPackage(mConfig),
      new NotifeePackage(),
      new AsyncStoragePackage(),
      new CameraRollPackage(),
      new ClipboardPackage(),
      new GeolocationPackage(),
      new NetInfoPackage(),
      new ReactNativeFirebaseAppPackage(),
      new ReactNativeFirebaseMessagingPackage(),
      new RNCMaskedViewPackage(),
      new MvcpScrollViewManagerPackage(),
      new WebRTCModulePackage(),
      new StreamVideoReactNativePackage(),
      new StripeSdkPackage(),
      new LottiePackage(),
      new DatePickerPackage(),
      new RNDocumentPickerPackage(),
      new RNFSPackage(),
      new RNFusedLocationPackage(),
      new RNGestureHandlerPackage(),
      new RNReactNativeHapticFeedbackPackage(),
      new PickerPackage(),
      new ImageResizerPackage(),
      new InCallManagerPackage(),
      new LinearGradientPackage(),
      new RNLocalizePackage(),
      new MapsPackage(),
      new PagerViewPackage(),
      new ReanimatedPackage(),
      new SafeAreaContextPackage(),
      new RNScreensPackage(),
      new RNSharePackage(),
      new SnackbarPackage(),
      new SvgPackage(),
      new ReactVideoPackage(),
      new RNCWebViewPackage()
    ));
  }
}
