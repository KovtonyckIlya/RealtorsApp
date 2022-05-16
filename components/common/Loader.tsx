import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { primaryColor } from '@constants/Colors';

const Loader = () => (
    <View style={[styles.container]}>
        <ActivityIndicator size="large" color={primaryColor} />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
});

export default Loader;
