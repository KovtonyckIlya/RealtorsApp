import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, Modal, TouchableOpacity, Image } from 'react-native';
import { View } from 'react-native';
import { primaryColor } from '../../constants/Colors';
import xIcon from '@icons/x.png';
import { useSelector } from 'react-redux';
import { FavoritesScreen } from '@screens/Listing/FavoritesScreen';
import { LightButtonFilled } from '../common/LightButton';

const FavoritesModal = (props) => {
    const user = useSelector((state) => state.users.user);
    const dismiss = () => {
        props.navigation.pop();
    };
    // useEffect(() => {
    //     console.log('user update', user);
    //     if (user && user.id) {
    //         console.log('dismiss');
    //         dismiss();
    //     }
    // }, [user]);
    return (
        <View style={styles.container}>
            <View style={[styles.header, styles.shadow]}>
                <View style={styles.topWrapper} />
                <Text style={styles.title}>
                    Favorites
                </Text>
                <TouchableOpacity style={styles.topWrapper} onPress={dismiss}>
                    <Image source={xIcon} style={styles.close} />
                </TouchableOpacity>
            </View>
            <FavoritesScreen />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        backgroundColor:'white'
    },
    header: {
        height: 40,
        marginTop: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    topWrapper: {
        width: '10%',
        // paddingHorizontal: 10,
        paddingBottom:20,
    },
    title: {
        paddingTop:5,
        fontSize: 25,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    close: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 25,
        width: 25,
        height: 25,
    },
    shadow: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
});

export default FavoritesModal;
