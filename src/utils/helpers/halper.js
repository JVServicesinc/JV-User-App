import { Alert, PermissionsAndroid, Platform } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Geolocation from "react-native-geolocation-service";
import Geolocations from "@react-native-community/geolocation";
import _ from "lodash";
import Store from "../../redux/Store";
import { setShowLocationDisabledModal } from "../../redux/reducer/GlobalSlice";

export function getImageFromGallery(callback = () => {}) {
  ImagePicker.openPicker({
    width: 400,
    height: 400,
    cropping: true,
  })
    .then((image) => {
      const imageUri = Platform.OS === "ios" ? image.path : image.path;

      let imageObj = {
        name: image.filename ? image.filename : "upload_image",
        type: image.mime,
        uri: image.path,
      };
      callback({
        uri: imageUri,
        path: imageObj,
      });
    })
    .catch((err) => {
      callback({
        uri: "",
        path: "",
      });
      console.log(err);
    });
}

export function getImageFromCamera(isCrop, callback = () => {}, size) {
  ImagePicker.openCamera({
    width: size?.width ? size?.width : 400,
    height: size?.height ? size?.height : 400,
    cropping: isCrop,
  })
    .then((image) => {
      const imageUri = Platform.OS === "ios" ? image.path : image.path;

      let imageObj = {
        name: image.filename ? image.filename : "upload_image",
        type: image.mime,
        uri: image.path,
      };

      callback({
        uri: imageUri,
        path: imageObj,
      });
    })
    .catch((err) => {
      callback({
        uri: "",
        path: "",
      });
      console.log(err);
    });
}

// Get Current Location
export function getCurrentLocation(callback = () => {}) {
  if (Platform.OS == "ios") {
    getCurrentPosition((res) => callback(res));
  } else {
    requestPermission((res) => {
      if (res) {
        setTimeout(() => {
          getCurrentPosition((res) => callback(res));
        }, 2000);
      }
    });
  }
}

// Get Watch Current Location
export function getWatchLocation(callback = () => {}) {
  if (Platform.OS == "ios") {
    getWatchPosition((res) => callback(res));
  } else {
    requestPermission((res) => {
      if (res) {
        setTimeout(() => {
          getWatchPosition((res) => callback(res));
        }, 5000);
      }
    });
  }
}

// Check Permission
async function requestPermission(callback = () => {}) {
  const state = Store.getState();

  if (Platform.OS === "android") {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
        title: "JV Location Permission",
        message: "JV needs to access your location",
        //   buttonNeutral: "Ask Me Later",
        //   buttonNegative: "Cancel",
        buttonPositive: "OK",
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        callback(true);
      } else {
        callback(false);
        console.log("location permission denied");
        Store.dispatch(setShowLocationDisabledModal(true));
      }
    } catch (err) {
      callback(false);
      // console.warn(err);
    }
  }
}

// Get Location
function getCurrentPosition(callback = () => {}) {
  if (Platform.OS == "ios") {
    Geolocations.getCurrentPosition(
      (position) => {
        let obj = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(obj);
      },
      (error) => {
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      }
    );
  } else {
    // console.log('--->> ');
    Geolocation.getCurrentPosition(
      //Geolocation
      (position) => {
        // console.log('position -- ',position);
        let currentRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(currentRegion);
      },
      (error) => {
        console.log("error : ", error);
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        // enableHighAccuracy: false,
        // timeout: 200000,
        // maximumAge: 3600000,
        enableHighAccuracy: true,
        timeout: 3000,
        // maximumAge: 10000,
      }
    );
  }
}

// Watch Location
function getWatchPosition(callback = () => {}) {
  if (Platform.OS == "ios") {
    Geolocations.watchPosition(
      (position) => {
        let obj = {
          latitude: position?.coords?.latitude,
          longitude: position?.coords?.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(obj);
      },
      (error) => {
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      }
    );
  } else {
    Geolocation.watchPosition(
      (position) => {
        let currentRegion = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          heading: position?.coords.heading,
        };
        callback(currentRegion);
      },
      (error) => {
        console.log("error : ", error);
        callback({
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      },
      {
        enableHighAccuracy: false,
        timeout: 200000,
        maximumAge: 3600000,
      }
    );
  }
}

// convert from-data to object
export function fromToObj(data) {
  if (!_.isEmpty(data)) {
    let obj = {};
    for (let i = 0; i < data._parts.length; i++) {
      obj[data._parts[i]?.[0]] = data._parts[i]?.[1];
    }

    return obj;
  } else {
    return {};
  }
}

export const countryStates = [
  {
    country: "India",
    states: [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
      "Mizoram",
      "Nagaland",
      "Odisha",
      "Punjab",
      "Rajasthan",
      "Sikkim",
      "Tamil Nadu",
      "Telangana",
      "Tripura",
      "Uttar Pradesh",
      "Uttarakhand",
      "West Bengal",
      "Andaman and Nicobar Islands",
      "Chandigarh",
      "Dadra and Nagar Haveli and Daman and Diu",
      "Delhi",
      "Lakshadweep",
      "Puducherry",
    ],
  },
  {
    country: "Canada",
    states: [
      "Alberta",
      "British Columbia",
      "Manitoba",
      "New Brunswick",
      "Newfoundland and Labrador",
      "Northwest Territories",
      "Nova Scotia",
      "Nunavut",
      "Ontario",
      "Prince Edward Island",
      "Quebec",
      "Saskatchewan",
      "Yukon Territory",
    ],
  },
];

export function checkServiceExits(arr, id) {
  if (!_.isEmpty(arr)) {
    let data = [...arr];

    let item = data.filter((item) => item.service_id == id);

    if (!_.isEmpty(item)) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

export function getExitsServiceDetails(arr, id, callback = () => {}) {
  if (!_.isEmpty(arr)) {
    let data = [...arr];

    let item = data.filter((item) => item.service_id == id);

    if (!_.isEmpty(item)) {
      callback(item[0]);
    } else {
      callback({});
    }
  } else {
    return false;
  }
}

export function removeObjectWithId(arr, id) {
  if (!_.isEmpty(arr)) {
    return arr.filter((obj) => obj.id !== id);
  } else {
    return [];
  }
}
