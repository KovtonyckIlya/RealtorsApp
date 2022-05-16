import { StyleSheet, Text, View } from 'react-native';
import { primaryColor } from '../../../constants/Colors';
import React from 'react';

export const QuestionIcon = () => {
    return (
        <View style={styles.viewQuestion}>
            <Text style={styles.textQuestion}>?</Text>
        </View>
    );
};

export const styles = StyleSheet.create({
    textQuestion: {
        fontSize: 15,
        fontFamily: 'CircularStd-Medium',
        color: primaryColor,
    },
    viewQuestion: {
        marginLeft: 7,
        backgroundColor: '#E6F5F2',
        borderRadius: 20,
        width: 25,
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
