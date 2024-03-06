import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import {
  Call,
  CallContent,
  CallControls,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  ThemeProvider,
  User,
} from "@stream-io/video-react-native-sdk";
import constants from "../../../utils/helpers/constants";
import { OverlayProvider } from "stream-chat-react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const apiKey = constants.GETSTREAM_API_KEY;
const userId = "446";
// const callId = "434";

const user: User = {
  id: userId,
  type: "guest",
};

type RootStackParamList = {
  Home: {};
};

type ProfileScreenRouteProp = RouteProp<RootStackParamList, "Home">;
type ProfileScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

type Props = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};

const StreamCallScreen: React.FC<Props> = ({ navigation, route }) => {
  const { userInfo } = useSelector((state: any) => state.UserReducer);
  const [client, setClient] = useState<StreamVideoClient>();
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    const createCall = async () => {
      const client = new StreamVideoClient({ apiKey, user });
      const call = client.call("default", userInfo?.id?.toString());
      setCall(call);
      setClient(client);
      await call.join({
        create: true,
        data: {
          members: [{ user_id: userId }],
        },
      });
    };

    createCall();
    return () => {
      call && call.leave();
    };
  }, []);

  const goToHome = () => {
    navigation.navigate("Home", {});
  };

  if (!call || !client) {
    return <Text>Joining call...</Text>;
  }

  return (
    <OverlayProvider>
      <ThemeProvider>
        <StreamVideo client={client}>
          <StreamCall call={call}>
            <View style={{ width: "100%", height: "100%" }}>
              <CallContent onHangupCallHandler={goToHome} />
            </View>
          </StreamCall>
        </StreamVideo>
      </ThemeProvider>
    </OverlayProvider>
  );
};

export default StreamCallScreen;
