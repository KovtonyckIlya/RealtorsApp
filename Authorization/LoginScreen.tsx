import * as React from 'react';
import {
    StyleSheet,
} from 'react-native';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { OrUseGoogleFacebook } from '../../components/common/Authorization/OrUseGoogleFacebook';
import { useNavigation } from '@react-navigation/native';
import LoginView from '@components/common/LoginView'

export default function LoginScreen() {
    const navigation = useNavigation();
    const user = useSelector((state) => state.users.user);
    useEffect(() => {
        if (user) {
            console.log('navigate to profile')
            navigation.navigate('SetProfile');
        }
    }, [user])

    return (
        <LoginView />
    );
}

