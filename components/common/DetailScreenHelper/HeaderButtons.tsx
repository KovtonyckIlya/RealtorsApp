import {
    GestureResponderEvent,
    Image,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import React from 'react';
import chevronLeft from '@icons/chevron_left.png';
import OrangeButton from '@components/common/OrangeButton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type headerButtons = {
    onPressLeft?: (event: GestureResponderEvent) => void;
    onPressRight?: (event: GestureResponderEvent) => void;
    listing?: Object;
};

export const HeaderButtons = ({ onPressLeft, onPressRight, listing }: headerButtons) => {
    const insets = useSafeAreaInsets();


    return (
        <View style={[styles.sliderTopWrapper, { paddingTop: insets.top }]}>
            <TouchableOpacity
                style={[styles.sliderGoBackButton, styles.shadow]}
                onPress={onPressLeft}
            >
                <Image source={chevronLeft} style={styles.sliderGoBackImg} />
            </TouchableOpacity>


            {listing && (
                listing.officeId === 48147 ||
                listing.officeId === 56986 ||
                listing.officeId === 63727 ||
                listing.officeId === 68519
            ) && <OrangeButton title="FEATURED" />}

        </View>
    );
};

export const styles = StyleSheet.create({
    sliderTopWrapper: {
        position: 'absolute',
        top: 0,
        paddingTop: 10,
        width: '100%',
        zIndex: 5000,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    sliderGoBackButton: {
        paddingTop: 10
        // padding: 10,
    },
    sliderGoBackImg: {
        height: 30,
        width: 30,
    },
    shadow: {
        elevation: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.99,
        shadowRadius: 5,
    },
});
