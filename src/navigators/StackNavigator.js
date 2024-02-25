import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Splash from "../screens/auth/Splash";
import Login from "../screens/auth/Login";
import Signup from "../screens/auth/Signup";
import BottomTab from "./BottomTab";
import Notification from "../screens/main/Notification/Notification";
import EditProfile from "../screens/main/Account/EditProfile";
import UpcomingBookingDetails from "../screens/main/Booking/UpcomingBookingDetails";
import { useSelector } from "react-redux";
import { navigationRef } from "../utils/helpers/RootNavigation";
import CancelBooking from "../screens/main/Booking/CancelBooking";
import RescheduleBooking from "../screens/main/Booking/RescheduleBooking";
import Verification from "../screens/auth/Verification";
import Location from "../screens/all/Location";
import ServiceSummary from "../screens/all/service/ServiceSummary";
import PaymentOption from "../screens/all/SummaryOptions/PaymentOption";
import PaymentSuccessfull from "../screens/all/SummaryOptions/PaymentSuccessfull";
import BookingSuccessfull from "../screens/all/SummaryOptions/BookingSuccessfull";
import ManageAddress from "../screens/main/Address/ManageAddress";
import SupportChat from "../screens/all/helps/SupportChat";
import Support from "../screens/all/helps/Support";
import BookingTopTab from "./BookingTopTab";
import ServiceDayInside from "../screens/all/service/ServiceDayInside.js";
import Employee from "../screens/all/Employee";
import ServiceCompleted from "../screens/all/service/ServiceCompleted";
import ServiceRating from "../screens/all/service/ServiceRating";
import ReferAndEarn from "../screens/all/helps/ReferAndEarn";
import AddNewAddress from "../screens/main/Address/AddNewAddress";
import AboutJeveux from "../screens/main/Account/AboutJeveux";
import RateJeveuxCompany from "../screens/main/Account/RateJeveuxCompany";
import MyOrders from "../screens/main/Account/MyOrders";
import ForgotPassword from "../screens/auth/ForgotPassword";
import ChangePassword from "../screens/auth/ChangePassword";
import ViewAllServices from "../screens/all/service/ViewAllServices";
import ViewServiceCategory from "../screens/all/service/ViewServiceCategory";
import ViewServiceType from "../screens/all/service/ViewServiceType";
import ViewAllProductCategory from "../screens/all/product/ViewAllProductCategory";
import ViewAllProduct from "../screens/all/product/ViewAllProduct";
import OnBoarding from "../screens/auth/OnBoarding";
import ProductDetails from "../screens/all/product/ProductDetails";
import ServiceDetails from "../screens/all/service/ServiceDetails";
import Loader from "../utils/helpers/Loader";
import Message from "../screens/main/Message/Message";
import { Tracking } from "../screens/all/tracking";
import { LanguageSelector } from "../screens/auth/LanguageSelector";
import { ChooseLanguage } from "../screens/main/Account/ChooseLanguage";
import { DocumentsDetails } from "../screens/main/Account/DocumentsDetails";
import { SearchingProvider } from "../screens/all/SummaryOptions/SearchingProvider";

const StackNavigator = (props) => {
  const Stack = createStackNavigator();
  const AuthReducer = useSelector((state) => state.AuthReducer);
  const LanguageReducer = useSelector((state) => state.LanguageReducer);

  const { isFetching } = useSelector((state) => state.GlobalReducer);

  const OnBoard = {
    OnBoarding: OnBoarding,
  };

  const Language = {
    LanguageSelector: LanguageSelector,
  };

  const Auth = {
    Login: Login,
    Signup: Signup,
    Verification: Verification,
    ForgotPassword: ForgotPassword,
    ChangePassword: ChangePassword,
  };

  const Main = {
    BottomTab: BottomTab,
    BookingTopTab: BookingTopTab,
    ViewAllServices: ViewAllServices,
    ViewServiceCategory: ViewServiceCategory,
    ViewServiceType: ViewServiceType,
    ViewAllProductCategory: ViewAllProductCategory,
    ViewAllProduct: ViewAllProduct,
    ProductDetails: ProductDetails,
    Notification: Notification,
    EditProfile: EditProfile,
    UpcomingBookingDetails: UpcomingBookingDetails,
    CancelBooking: CancelBooking,
    RescheduleBooking: RescheduleBooking,
    Location: Location,
    Employee: Employee,
    ServiceDetails: ServiceDetails,
    ServiceSummary: ServiceSummary,
    PaymentOption: PaymentOption,
    PaymentSuccessfull: PaymentSuccessfull,
    BookingSuccessfull: BookingSuccessfull,
    SearchingProvider: SearchingProvider,
    ManageAddress: ManageAddress,
    Support: Support,
    SupportChat: SupportChat,
    ServiceDayInside: ServiceDayInside,
    Message: Message,
    ServiceCompleted: ServiceCompleted,
    ServiceRating: ServiceRating,
    ReferAndEarn: ReferAndEarn,
    AddNewAddress: AddNewAddress,
    AboutJeveux: AboutJeveux,
    ChooseLanguage: ChooseLanguage,
    RateJeveuxCompany: RateJeveuxCompany,
    MyOrders: MyOrders,
    Tracking: Tracking,
    DocumentsDetails: DocumentsDetails,
  };

  console.log("Stack Navigator --- ", AuthReducer?.isStart, LanguageReducer?.isLanguageSelected);

  const Screens =
    AuthReducer?.isStart == null
      ? OnBoard
      : LanguageReducer?.isLanguageSelected == null
      ? Language
      : AuthReducer?.token == null
      ? Auth
      : Main;

  if (AuthReducer.isLoading) {
    return <Splash />;
  } else {
    return (
      <>
        <NavigationContainer ref={navigationRef}>
          <Stack.Navigator screenOptions={{ headerShown: false, gestureEnabled: false }}>
            {Object.entries({
              ...Screens,
            }).map(([name, component], index) => {
              return <Stack.Screen key={index} name={name} component={component} />;
            })}
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
};

export default StackNavigator;
