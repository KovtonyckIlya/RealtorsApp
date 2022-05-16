import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, SafeAreaView, Modal, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native';
import { primaryColor } from '../../constants/Colors';
import xIcon from '@icons/x.png';
import { useSelector } from 'react-redux';
import LoginView from '../common/LoginView';
import { LightButtonFilled } from '../common/LightButton';
import { useNavigation } from '@react-navigation/native';
const LoginModal = (props) => {
    const navigation = useNavigation();
    const user = useSelector((state) => state.users.user);
    const dismiss = () => {
        props.navigation.pop();
    };
    useEffect(() => {
        if (user && user.id) {
            console.log('dismiss');
            dismiss();
            navigation.goBack();
        }
    }, [user]);
    return (
        <SafeAreaView style={styles.container}>
          <TouchableOpacity style={styles.topWrapper} onPress={dismiss}>
              <Image source={xIcon} style={styles.close} />
          </TouchableOpacity>
          <LoginView
              subtitle={props.route.params.subtitle}
              onLogin={dismiss}
          />
          </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'center',
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 25,
        width: 25,
        height: 25,
    },
});

export default LoginModal;
