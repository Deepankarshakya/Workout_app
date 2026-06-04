import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';
import Ionicons from '@expo/vector-icons/Ionicons';

import HomeScreen from "../screens/HomeScreen";
import PlannerScreen from "../screens/PlannerScreen";
import AccountScreen from "../screens/AccountScreen";
import WorkoutDetailScreen from "../screens/WorkOutDetailScreen";
import { defaultHeaderOptions } from "./styles";

import SignInScreen from "../screens/SignInScreen";
import SignUpScreen from "../screens/SignUpScreen";

import useAuth from "../hooks/useAuth";

export default function Navigation() {
    return (
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    )

}

const Stack = createNativeStackNavigator();
function AuthNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SignIn"
                component={SignInScreen}
            />

            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
            />
        </Stack.Navigator>
    );
}
function RootNavigator() {
    const { user, loading } = useAuth();

    if(loading){
        return null;
    }

    return (
        <Stack.Navigator>
            {user ? (<>
            <Stack.Screen
                name="Root"
                component={BottomTabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="WorkoutDetail"
                component={WorkoutDetailScreen}
                options={{ 
                    ...defaultHeaderOptions,
                    title: "" }}
            />
            </>
            ): (
                <Stack.Screen
                    name="Auth"
                    component={AuthNavigator}
                    options={{headerShown: false}}
                />
            )}
            
        </Stack.Navigator>
    )

}

const BottomTab = createBottomTabNavigator();
function BottomTabNavigator() {
    return (
        <BottomTab.Navigator
            screenOptions={defaultHeaderOptions}
            initialRouteName="Home">
            <BottomTab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ size, color }) =>
                        <AntDesign name="home" size={size} color={color} />
                }}
            />
            <BottomTab.Screen
                name="Planner"
                component={PlannerScreen}
                options={{
                    tabBarIcon: ({ size, color }) =>
                        <Entypo name="add-to-list" size={size} color={color} />
                }}
            />
            <BottomTab.Screen
                name="Settings"
                component={AccountScreen}
                options={{
                    tabBarIcon: ({ size, color }) =>
                        <Ionicons name="settings" size={size} color={color} />
                }}
            />
        </BottomTab.Navigator>
    )
}