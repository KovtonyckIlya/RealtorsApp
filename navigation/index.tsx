import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import NotFoundScreen from '../screens/NotFoundScreen';
import PasswordResetScreen from "../screens/Authorization/PasswordResetScreen"
import SignUpScreen from "../screens/Authorization/SignUpScreen"
import LoginScreen from "../screens/Authorization/LoginScreen"
import { RootStackParamList } from '../types';
import BottomTabNavigator from './BottomTabNavigator';
import LinkingConfiguration from './LinkingConfiguration';
import BerbixVerifyModal from '@components/Modals/BerbixVerifyModal';
import SavedSearchesModal from '@components/Modals/SavedSearchesModal';
import LoginModal from '@components/Modals/LoginModal';
import FavoritesModal from '../components/Modals/FavoritesModal';

// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
const RootStack = createStackNavigator<RootStackParamList>();

export default function Navigation() {
  const RootNavigator = () => {
    return (
      <RootStack.Navigator headerMode="none" mode="modal" screenOptions={{ animationEnabled: false, headerShown: false }}>
        <RootStack.Screen name="Root" component={BottomTabNavigator} />
        <RootStack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
        <RootStack.Screen name="BerbixModal" component={BerbixVerifyModal} options={{ animationEnabled: true }} />
        <RootStack.Screen name='SavedSearchesModal' component={SavedSearchesModal} options={{ animationEnabled: true }} />
        <RootStack.Screen name="LoginModal" component={LoginModal} options={{ animationEnabled: true }} />
        <RootStack.Screen
                name="PasswordReset"
                component={PasswordResetScreen}
                options={{ headerShown: false }}
            />
               <RootStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
               <RootStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: true }}
            />
        <RootStack.Screen name="FavoritesModal" component={FavoritesModal} options={{ animationEnabled: true }} />
      </RootStack.Navigator>
    );
  }
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
