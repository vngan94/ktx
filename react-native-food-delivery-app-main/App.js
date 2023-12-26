import React, { useState, useCallback, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import * as Location from "expo-location";
import BottomTab from "./app/navigation/BottomTab";
import NotificationDetail from "./app/screens/Detail/NotificationDetail";
import ComplaintDetail from "./app/screens/Detail/ComplaintDetail";
import LoginPage from "./app/screens/LoginPage";
import ChatScreen from "./app/screens/ChatScreen";
import SignUp from "./app/screens/SignUp";
import CancelRegister from "./app/components/CancelRegister";
import RegulationDetail from "./app/screens/Detail/RegulationDetail";
import RegisterDetail from "./app/screens/Detail/RegisterDetail";
import ContractDetail from "./app/screens/Detail/ContractDetail";
import StudentViolationDetail from "./app/screens/Detail/StudentViolationDetail";
import InfoDetail from "./app/screens/Detail/InfoDetail";
import ChangePassword from "./app/screens/ChangePassword";
import ChooseRoom from "./app/screens/ChooseRoom";
import Violation from "./app/screens/List/Violation";

import SearchScreen from "./app/components/SearchScreen";
import { UserLocationContext } from "./app/context/UserLocationContext";
import { UserReversedGeoCode } from "./app/context/UserReversedGeoCode";
import FAQ from "./app/screens/List/FAQScreen";
import Notification from "./app/screens/List/NotificationScreen";
import Regulation from "./app/screens/List/RegulationScreen";
import ProfileTab from "./app/navigation/ProfileTab";
import ListViolationById from "./app/screens/List/ListViolationById";
import RegisterScreen from "./app/screens/RegisterScreen";
import TypeRoomDetail from "./app/screens/Detail/TypeRoomDetail";
import Success from "./app/screens/Success";
import Register from "./app/components/Register";
import InfoLiving from "./app/screens/Detail/InfoLiving";
import ContractDetailFinal from "./app/screens/Detail/ContractDetailFinal";
import AddComplaint from "./app/components/AddComplaint";
import MessageSearch from "./app/screens/MessageSearch";
import { TypeRoomDetailContext } from "./app/context/TypeRoomDetailContext";
const Stack = createNativeStackNavigator();
export default function App() {
  const defaultAddresss = {
    city: "Shanghai",
    country: "China",
    district: "Pudong",
    isoCountryCode: "CN",
    name: "33 East Nanjing Rd",
    postalCode: "94108",
    region: "SH",
    street: "Stockton St",
    streetNumber: "1",
    subregion: "San Francisco County",
    timezone: "America/Los_Angeles",
  };
  const [fontsLoaded] = useFonts({
    regular: require("./assets/fonts/Poppins-Regular.ttf"),
    light: require("./assets/fonts/Poppins-Light.ttf"),
    bold: require("./assets/fonts/Poppins-Bold.ttf"),
    medium: require("./assets/fonts/Poppins-Medium.ttf"),
    extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
  });
  const [address, setaddress] = useState(null);
  const [location, setlocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [typeRoomId, setTypeRoomId] = useState(null);
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    onLayoutRootView();
    let getAdrress = async () => {
      setaddress(defaultAddresss);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to ascess location ass deined");
        return;
      }

      let location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 5000,
      });
      setlocation(location);
    };
    getAdrress();
  }, []);
  if (!fontsLoaded) {
    // Return a loading indicator or splash screen while fonts are loading or app is initializing
    return;
  }

  return (
    <UserLocationContext.Provider value={{ location, setlocation }}>
      <UserReversedGeoCode.Provider value={{ address, setaddress }}>
        <TypeRoomDetailContext.Provider value={{ typeRoomId, setTypeRoomId }}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                name="bottom-navigation"
                component={BottomTab}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="NotificationDetail"
                component={NotificationDetail}
                options={({ route }) => ({
                  title: route.params.title,
                })}
              />
              <Stack.Screen
                name="RegulationDetail"
                component={RegulationDetail}
                options={({ route }) => ({
                  title: route.params.regulationName,
                })}
              />
              <Stack.Screen
                name="FAQ"
                component={FAQ}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Regulation"
                component={Regulation}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="SearchScreen"
                component={SearchScreen}
                options={({ route }) => ({
                  placeholder: route.params.placeholder,
                  type: route.params.type,
                })}
              />

              <Stack.Screen
                name="LoginPage"
                component={LoginPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="signUp"
                component={SignUp}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Chat"
                component={ChatScreen}
                options={({ route }) => ({
                  title: route.params.userName,
                  headerBackTitleVisible: false,
                })}
              />
              <Stack.Screen
                name="MessageSearch"
                component={MessageSearch}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ListViolationById"
                component={ListViolationById}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="StudentViolationDetail"
                component={StudentViolationDetail}
                options={({ route }) => ({
                  title: route.params.violationActionData.violationData.value,
                  // title: route.params.title,
                  headerBackTitleVisible: false,
                })}
              />
              <Stack.Screen
                name="TypeRoomDetail"
                component={TypeRoomDetail}
                options={({ route }) => ({
                  title: route.params.typeRoomName,
                  headerBackTitleVisible: false,
                })}
              />
              <Stack.Screen
                name="ComplaintDetail"
                component={ComplaintDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="AddComplaint"
                component={AddComplaint}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RegisterDetail"
                component={RegisterDetail}
                options={{ headerShown: false }}
              />

              <Stack.Screen
                name="InfoLiving"
                component={InfoLiving}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Success"
                component={Success}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ContractDetail"
                component={ContractDetail}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ContractDetailFinal"
                component={ContractDetailFinal}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="InfoDetail"
                component={ProfileTab}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="ChooseRoom"
                component={ChooseRoom}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="CancelRegister"
                component={CancelRegister}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Violation"
                component={Violation}
                options={{ headerShown: false }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </TypeRoomDetailContext.Provider>
      </UserReversedGeoCode.Provider>
    </UserLocationContext.Provider>
  );
}
