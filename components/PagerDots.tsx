import React from 'react';
import { StyleSheet, View } from 'react-native';
import { primaryColor } from '../constants/Colors';

interface Props {
    count: number;
    currentPage: number;
}

export const PagerDots = ({ count, currentPage }: Props) => (
    <View style={styles.container}>
        {Array.apply(null, Array(count)).map((item, index) => (
            <View
                style={[
                    styles.dot,
                    {
                        backgroundColor:
                            index < currentPage ? primaryColor : 'white',
                    },
                ]}
            />
        ))}
    </View>
);

const styles = StyleSheet.create({
    container: {
        height: 50,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    dot: {
        height: 15,
        width: 15,
        borderRadius: 10,
        marginHorizontal: 10,
        borderWidth: 2,
        borderColor: primaryColor,
    },
});
