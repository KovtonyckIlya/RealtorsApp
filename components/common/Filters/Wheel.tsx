import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WheelPicker } from './AnimatedPicker/WheelPicker';

// HardCode data
import { WHEEL_PICKET_ITEMS } from './constants';

const Wheel = () => {
    const [index, setIndex] = useState(0);

    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    // const ref = useRef();
    // const HEIGHT = 34.6;
    // let TOTALHEIGHT = 0;

    return (
        <View style={styles.container}>
            <View pointerEvents="none" style={styles.viewWithLines}>
                <View style={[styles.lineUp, styles.line]}>
                    <Text style={styles.textTo}>to</Text>
                </View>
                {/*<View style={[styles.lineDown, styles.line]} />*/}
            </View>
            <WheelPicker
                getItem={setMinPrice}
                position="left"
                data={WHEEL_PICKET_ITEMS}
            />
            {/*<View style={styles.viewText}>*/}
            {/*    <Text style={styles.textTo}>to</Text>*/}
            {/*</View>*/}
            <WheelPicker
                getItem={setMaxPrice}
                position={'right'}
                data={WHEEL_PICKET_ITEMS}
            />
        </View>
    );
};
export default Wheel;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'space-between',
    },
    viewText: { justifyContent: 'center', height: '100%' },
    viewWithLines: {
        position: 'absolute',
        top: 0,
        height: '100%',
        width: '100%',
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 8888,
    },
    line: {
        // height: 1,
        // backgroundColor: '#8898a0',
        borderColor: '#8898a0',
        borderTopWidth: 1,
        borderBottomWidth: 1,
        width: '100%',
    },
    lineDown: {
        marginTop: 0,
    },
    lineUp: {
        marginBottom: 0,
    },
    rightPadding: {
        paddingRight: 50,
    },
    textTo: {
        // marginBottom: -5,
        // marginTop: -5,
        fontSize: 24,
        color: '#8898a0',
        textAlign: 'center',
    },
});
