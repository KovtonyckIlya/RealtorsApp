import { Ionicons, Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useEffect } from 'react';
import React from 'react'
import { textPrimary } from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ListingScreenMain from '../screens/Listing/MainScreen';
import ListingScreenDetail from '../screens/Listing/DetailScreen';
import ComingSoon from '../screens/ComingSoonScreen';
import { getTabBarVisibility, getHeaderVisibility } from './Helpers';

import {
    AuthParamList,
    BottomTabParamList,
    ListingScreenParamList,
    TabTwoParamList,
} from '../../types';
import LoginScreen from '../screens/Authorization/LoginScreen';
import PasswordResetScreen from '../screens/Authorization/PasswordResetScreen';
import SetProfileScreen from '../components/common/Authorization/SetProfileScreen';
import SignUpScreen from '../screens/Authorization/SignUpScreen';
import { FavoritesScreen } from '../screens/Listing/FavoritesScreen';
import { connect } from 'react-redux';
import LeadsScreen from '../screens/Leads/LeadsScreen';
import ListingsScreen from '../screens/Listings/ListingsScreen';
import ShowingsScreen from '../screens/Showings/ShowingsScreen';
import { getProfile } from '../actions/usersActions'
import { getFavoriteListings } from '@actions/favoritesActions';
import { pushNotificationRegistration } from '@components/common/Helpers';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

function BottomTabNavigator(props) {
    useEffect(() => {
        props.getProfile()
    }, [])

    useEffect(() => {
        pushNotificationRegistration()
    }, [props.user])

    const colorScheme = useColorScheme();
    const isAgent = props.user ? props.user.isAgent : false
    const isBuyer = props.user ? props.user.isBuyer : false

    return (
        <BottomTab.Navigator
            initialRouteName="Explore"
            tabBarOptions={{ activeTintColor: textPrimary }}
        >
            <BottomTab.Screen
                name="Explore"
                component={ListingNavigator}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-search" color={color} />
                    ),
                }}
            />
            {props.user && !isAgent && <BottomTab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <TabBarIcon name="ios-heart" color={color} />
                    ),
                }}
            />}

            {isAgent && <BottomTab.Screen
                name="Leads"
                component={LeadsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="calendar"
                            size={30}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />}

            {isAgent && <BottomTab.Screen
                name="Listings"
                component={ListingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="home"
                            size={30}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />}

            {props.user && <BottomTab.Screen
                name="Tours"
                component={ShowingsScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="check-square"
                            size={30}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />}
            <BottomTab.Screen
                name="Profile"
                component={AuthorizationNavigator}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate("Profile");
                    },
                })}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ color }) => (
                        <Feather
                            name="user"
                            size={30}
                            style={{ marginBottom: -3 }}
                            color={color}
                        />
                    ),
                }}
            />
        </BottomTab.Navigator>
    );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
    name: React.ComponentProps<typeof Ionicons>['name'];
    color: string;
}) {
    return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const ListingStack = createStackNavigator<ListingScreenParamList>();

function ListingNavigator({ navigation, route }) {
    React.useLayoutEffect(() => {
        navigation.setOptions({
            tabBarVisible: getTabBarVisibility(route),
        });
    }, [navigation, route]);
    return (
        <ListingStack.Navigator
            screenOptions={{ headerShown: getHeaderVisibility(route) }}
        >
            <ListingStack.Screen
                name="ListingMainScreen"
                component={ListingScreenMain}
                options={{ headerTitle: 'Main Listing' }}
            />
            <ListingStack.Screen
                name="ListingDetailScreen"
                component={ListingScreenDetail}
                options={{
                    headerTitle: 'Detail Listing',
                }}
            />
        </ListingStack.Navigator>
    );
}

const ComingSoonStack = createStackNavigator<TabTwoParamList>();

function ComingSoonNavigator() {
    return (
        <ComingSoonStack.Navigator>
            <ComingSoonStack.Screen
                name="ComingSoon"
                component={ComingSoon}
                options={{ headerTitle: 'Coming soon' }}
            />
        </ComingSoonStack.Navigator>
    );
}

const AuthorizationStack = createStackNavigator<AuthParamList>();
function AuthorizationNavigator() {
    return (
        <AuthorizationStack.Navigator>

            <AuthorizationStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <AuthorizationStack.Screen
                name="PasswordReset"
                component={PasswordResetScreen}
                options={{ headerShown: false }}
            />
            <AuthorizationStack.Screen
                name="SetProfile"
                component={SetProfileScreen}
                options={{ headerShown: false, gestureEnabled: false, }}
            />
            <AuthorizationStack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerShown: false }}
            />
            <AuthorizationStack.Screen
                name="Registration"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
        </AuthorizationStack.Navigator>
    );
}

const mapStateToProps = state => {
    return {
        user: state.users.user,
        showErr: state.error.show,
    }
}

export default connect(mapStateToProps, { getProfile, getFavoriteListings })(BottomTabNavigator)
