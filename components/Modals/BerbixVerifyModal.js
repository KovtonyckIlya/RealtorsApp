import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
    setVerifyModalVisible,
    createTransaction,
} from '../../actions/berbixActions';
import { Modal, View, Button, Text, StyleSheet, Linking } from 'react-native';
import { LightButtonFilled } from '../common/LightButton';
import { useNavigation } from '@react-navigation/native';
import { cancelRed, primaryColor } from '../../constants/Colors';

const BerbixVerifyModal = (props) => {
    const navigation = useNavigation();
    const onContinue = async () => {
        const resp = await props.createTransaction();
        if (resp.message) {
            navigation.pop();
            alert(resp.message);
        } else if (resp.redirectURL) {
            Linking.openURL(resp.redirectURL);
            navigation.pop();
        } else {
            alert(
                `unexpected response creating transaction - ${JSON.stringify(
                    resp
                )}`
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Verify Your Identity</Text>
            <Text style={styles.body}>
                {
                    'In order to book a tour we will need to verify \nyour identity.'
                }
            </Text>
            <LightButtonFilled
                style={styles.button}
                styleText={styles.buttonText}
                onPress={onContinue}
                type="primary"
                title="Continue"
            />
            <LightButtonFilled
                style={[styles.button, styles.buttonRed]}
                styleText={styles.buttonText}
                onPress={() => navigation.pop()}
                type="primary"
                title="Cancel"
            />
        </View>
    );
};

export default connect(null, {
    createTransaction,
})(BerbixVerifyModal);

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    title: { fontSize: 25 },
    body: {
        paddingVertical: 10,
        textAlign: 'center',
    },
    button: {
        width: '80%',
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: primaryColor,
    },
    buttonRed: {
        backgroundColor: cancelRed,
        borderColor: cancelRed,
    },
    buttonText: {
        color: 'white',
    },
});
